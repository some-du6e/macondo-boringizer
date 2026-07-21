import type { Information, Project } from "./types"
import { renderProjects, resetProjectsRenderCache } from "./projects"

export type DashboardProjectSyncState = {
    activeProjectPopupId: string | null
    activeProjectPopupSnapshot: string | null
    pendingDeleteProjectId: string | null
    isWaitingForNewProjectClose: boolean
    didSeeNewProjectPopup: boolean
}

type DashboardProjectSyncOptions = {
    information: Information
    state: DashboardProjectSyncState
    getDidLoadProjects: () => boolean
    resetLinkedFarmAreasKey: () => void
    linkFarmAreasToProjects: () => Promise<void>
    loadInfo: () => void
}

export function installDashboardProjectSync(options: DashboardProjectSyncOptions) {
    function removeProjectFromDashboard(projectId: string | number | null | undefined) {
        let normalizedProjectId = String(projectId)
        let oldProjects = options.information.projects || []
        let newProjects = oldProjects.filter(function(project) {
            return String(project.id) !== normalizedProjectId
        })

        if (newProjects.length === oldProjects.length) { return }

        options.information.projects = newProjects
        resetProjectsRenderCache()
        options.resetLinkedFarmAreasKey()
        renderProjects(options.information, options.getDidLoadProjects())
        options.linkFarmAreasToProjects().catch(function(error) {
            console.warn("macondo: farm area linking failed after project removal", error)
        })
    }

    function updateProjectInDashboard(projectData: Project) {
        if (!projectData || projectData.id == null) { return }

        let normalizedProjectId = String(projectData.id)
        let oldProjects = options.information.projects || []
        let didFindProject = false

        options.information.projects = oldProjects.map(function(project) {
            if (String(project.id) !== normalizedProjectId) { return project }
            didFindProject = true
            return Object.assign({}, project, projectData)
        })

        if (!didFindProject) { return }

        resetProjectsRenderCache()
        renderProjects(options.information, options.getDidLoadProjects())
    }

    function syncActiveProjectFromPopupDom() {
        if (!options.state.activeProjectPopupId) { return }

        let popup = document.querySelector(".modal-frame")
        if (!popup) { return }

        let updatedProject: Project = {
            id: options.state.activeProjectPopupId
        }
        let didFindChange = false

        let title = popup.querySelector('[data-tour="project-title"] h1')
        let titleText = title?.textContent?.trim()
        if (titleText) {
            updatedProject.name = titleText
            didFindChange = true
        }

        let description = popup.querySelector('[data-tour="project-description"] .prose-desc')
        let descriptionText = description?.textContent?.trim()
        if (descriptionText) {
            updatedProject.description = descriptionText
            didFindChange = true
        }

        if (!didFindChange) { return }

        let snapshot = JSON.stringify(updatedProject)
        if (!options.state.activeProjectPopupSnapshot) {
            options.state.activeProjectPopupSnapshot = snapshot
            return
        }

        if (snapshot === options.state.activeProjectPopupSnapshot) { return }

        options.state.activeProjectPopupSnapshot = snapshot
        updateProjectInDashboard(updatedProject)
    }

    function isDeleteConfirmDialog(element: Element | null) {
        let dialog = element && element.closest ? element.closest('[role="dialog"]') : null
        if (!dialog) { return false }

        let heading = dialog.querySelector("h2")
        return !!heading && heading.textContent?.trim() === "Delete Project"
    }

    function watchProjectDeleteClick(event: MouseEvent) {
        let target = event.target instanceof Element ? event.target : null
        let button = target ? target.closest("button") : null
        if (!button || button.textContent?.trim() !== "Delete Project") { return }
        if (!options.state.activeProjectPopupId && !options.state.pendingDeleteProjectId) { return }

        if (!isDeleteConfirmDialog(button)) {
            options.state.pendingDeleteProjectId = options.state.activeProjectPopupId
            return
        }

        if (!button.classList.contains("ds-btn-danger")) { return }

        let deletedProjectId = options.state.pendingDeleteProjectId || options.state.activeProjectPopupId
        setTimeout(function() {
            removeProjectFromDashboard(deletedProjectId)
            if (options.state.activeProjectPopupId === deletedProjectId) {
                options.state.activeProjectPopupId = null
                options.state.activeProjectPopupSnapshot = null
            }
            if (options.state.pendingDeleteProjectId === deletedProjectId) {
                options.state.pendingDeleteProjectId = null
            }
        }, 0)
    }

    function isNewProjectPopupOpen() {
        return Array.from(document.querySelectorAll('[role="dialog"]')).some(function(dialog) {
            let heading = dialog.querySelector("h2")
            return heading?.textContent?.trim() === "New Project"
        })
    }

    function syncNewProjectClose() {
        if (!options.state.isWaitingForNewProjectClose) { return }

        if (isNewProjectPopupOpen()) {
            options.state.didSeeNewProjectPopup = true
            return
        }

        if (!options.state.didSeeNewProjectPopup) { return }

        options.state.isWaitingForNewProjectClose = false
        options.state.didSeeNewProjectPopup = false
        options.loadInfo()
    }

    document.addEventListener("click", watchProjectDeleteClick, true)

    return {
        syncActiveProjectFromPopupDom: syncActiveProjectFromPopupDom,
        syncNewProjectClose: syncNewProjectClose
    }
}
