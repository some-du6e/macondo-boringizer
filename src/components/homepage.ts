import { doTopbarstuff } from "./topbar"
import type { Information, GameWorldState } from "./types"
import { defaultProfilePfp } from "./consts.ts" // TODO: temp
import { renderProjects, prepareDashboard, resetProjectsRenderCache } from "./projects"
import { getInfo } from "./info"
import { setProjectPopupHooks } from "./popups"
import { installDashboardProjectSync, type DashboardProjectSyncState } from "./dashboard-projects"

let dashboardSync: (() => void) | null = null

export function syncHomepageDashboard() {
    setupHomepageDashboard()
    if (dashboardSync) {
        dashboardSync()
    }
}

function setupHomepageDashboard() {
    window.macondo = window.macondo || {}
    if (location.pathname !== "/dashboard") { return }
    if (dashboardSync) { return }
    console.log("macondo+: homepagething running")
    // if (!window.macondo.datapage) {
    //     console.error("macondo: datapage not found! ID:1s9f8g")
    //     return
    // }



    // shi to skid
    // https://github.com/SabioOfficial/MacondoPlus
    // utils

    
    let information: Information = {
        "user": {
            "name": "not found",
            "pfp": defaultProfilePfp
        },
        "projects": []
    }
    
    let didTryGetInfo = false
    let didLoadProjects = false
    let linkedFarmAreasKey = ""
    let isLinkingFarmAreas = false
    let projectSyncState: DashboardProjectSyncState = {
        activeProjectPopupId: null,
        activeProjectPopupSnapshot: null,
        pendingDeleteProjectId: null,
        isWaitingForNewProjectClose: false,
        didSeeNewProjectPopup: false
    }
    // TODO: show a small loading spinner while farm links are being resolved.
    // It can be considered done when isLinkingFarmAreas is false and
    // linkedFarmAreasKey matches the current farm tile/project key.

    setProjectPopupHooks({
        isLinkingFarmAreas: function() {
            return isLinkingFarmAreas
        },
        resetLinkedFarmAreasKey: function() {
            linkedFarmAreasKey = ""
        },
        linkFarmAreasToProjects: function() {
            return linkFarmAreasToProjects()
        },
        rightclickandextractfarmtile: rightclickandextractfarmtile,
        setNewProjectCloseWait: function(isWaiting, didSeePopup) {
            projectSyncState.isWaitingForNewProjectClose = isWaiting
            projectSyncState.didSeeNewProjectPopup = didSeePopup
        },
        setActiveProjectPopup: function(projectId, snapshot) {
            projectSyncState.activeProjectPopupId = projectId
            projectSyncState.activeProjectPopupSnapshot = snapshot
        }
    })


    function wait(ms: number) {
        return new Promise(function(resolve) {
            setTimeout(resolve, ms)
        })
    }

    function getFarmContextMenu() {
        return document.getElementsByClassName("fixed bg-parchment border-[3px] border-ds-brown shadow-xl w-52 py-1")[0] || null
    }

    function hideNextFarmContextMenu() {
        let observer = new MutationObserver(function() {
            let contextMenu = getFarmContextMenu()
            if (!contextMenu) { return }

            contextMenu.classList.add("opacity-0")
            observer.disconnect()
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true
        })

        return observer
    }


    async function closeFarmContextMenu() {
        let contextMenu = getFarmContextMenu()
        if (!contextMenu) { return }

        document.dispatchEvent(new KeyboardEvent("keydown", {
            bubbles: true,
            cancelable: true,
            key: "Escape",
            code: "Escape"
        }))
        await wait(20)

        let contextmenu2 = getFarmContextMenu()
        if (!contextmenu2) { return }

        let menuRect = contextMenu.getBoundingClientRect()
        let clickX = menuRect.right + 20
        let clickY = menuRect.top + 20
        if (clickX >= window.innerWidth) {
            clickX = Math.max(1, menuRect.left - 20)
        }
        if (clickY >= window.innerHeight) {
            clickY = Math.max(1, menuRect.top - 20)
        }

        let clickTarget = document.elementFromPoint(clickX, clickY) || document.body
        clickTarget.dispatchEvent(new PointerEvent("pointerdown", {
            bubbles: true,
            cancelable: true,
            pointerId: 1,
            pointerType: "mouse",
            isPrimary: true,
            button: 0,
            buttons: 1,
            clientX: clickX,
            clientY: clickY
        }))
        clickTarget.dispatchEvent(new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            button: 0,
            buttons: 1,
            clientX: clickX,
            clientY: clickY
        }))
        clickTarget.dispatchEvent(new PointerEvent("pointerup", {
            bubbles: true,
            cancelable: true,
            pointerId: 1,
            pointerType: "mouse",
            isPrimary: true,
            button: 0,
            clientX: clickX,
            clientY: clickY
        }))
        clickTarget.dispatchEvent(new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            button: 0,
            clientX: clickX,
            clientY: clickY
        }))
        clickTarget.dispatchEvent(new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            button: 0,
            clientX: clickX,
            clientY: clickY
        }))
        await wait(20)
    }

    async function rightclickandextractfarmtile(tile: Element | null, justrightclick = false, x: number | null = null, y: number | null = null): Promise<string | null> {
        if (!tile) {
            console.warn("macondo: farm tile not found for project context menu")
            return null
        }

        if (justrightclick) {
            tile.dispatchEvent(new MouseEvent('contextmenu', {
                bubbles: true,
                cancelable: true,
                button: 2,
                buttons: 2,
                clientX: x ?? 0,
                clientY: y ?? 0,
            }));
            return null
        }

        await closeFarmContextMenu()

        let hideContextMenuObserver = hideNextFarmContextMenu()
        let rect = tile.getBoundingClientRect()
        tile.dispatchEvent(new MouseEvent('contextmenu', {
            bubbles: true,
            cancelable: true,
            button: 2,
            buttons: 2,
            clientX: x == null ? rect.left + rect.width / 2 : x,
            clientY: y == null ? rect.top + rect.height / 2 : y,
        }));

        await wait(50)
        hideContextMenuObserver.disconnect()

        let contextMenu = getFarmContextMenu()
        if (!contextMenu) { return null }

        contextMenu.classList.add("opacity-0")

        let nameElement = contextMenu.getElementsByClassName("px-3 py-1.5 text-xs font-bold text-ds-brown/60 truncate")[0]
        let projectName = nameElement ? nameElement.textContent?.trim() : null

        await closeFarmContextMenu()

        return projectName || null
    }


    




    


    async function linkFarmAreasToProjects() {
        if (isLinkingFarmAreas) { return }

        let areas = document.getElementsByClassName("farm-tile-project") as HTMLCollectionOf<HTMLElement>
        let projectList = information.projects || []
        let linkKey = Array.from(areas).map(function(area) {
            return [
                area.style.left,
                area.style.top,
                area.getAttribute("data-macondo-project-id") || ""
            ].join(",")
        }).join("|") + "::" + projectList.map(function(project) {
            return project.id || project.name || ""
        }).join("|")

        if (linkKey === linkedFarmAreasKey) { return }

        isLinkingFarmAreas = true

        try {
            for (let i = 0; i < areas.length; i++) {
                let area = areas[i]
                let fallbackProject = projectList[i] || null
                let projectName = await rightclickandextractfarmtile(area) || (fallbackProject ? fallbackProject.name : null)
                if (!projectName) {
                    area.removeAttribute("data-macondo-project-name")
                    area.removeAttribute("data-macondo-project-id")
                    continue
                }

                area.setAttribute("data-macondo-project-name", projectName)
                area.removeAttribute("data-macondo-project-id")
                
                for (let project in projectList) {
                    if (projectList[project].name === projectName) {
                        area.setAttribute("data-macondo-project-id", String(projectList[project].id))
                        break
                    }
                }
            }

            linkedFarmAreasKey = Array.from(areas).map(function(area) {
                return [
                    area.style.left,
                    area.style.top,
                    area.getAttribute("data-macondo-project-id") || ""
                ].join(",")
            }).join("|") + "::" + projectList.map(function(project) {
                return project.id || project.name || ""
            }).join("|")
        } finally {
            await closeFarmContextMenu()
            isLinkingFarmAreas = false
        }
    }

    function loadInfo() {
        getInfo(didTryGetInfo, information, didLoadProjects, function() {
            didLoadProjects = true
            resetProjectsRenderCache()
            renderProjects(information, didLoadProjects)
            linkFarmAreasToProjects()
        })
    }

    let dashboardProjectSync = installDashboardProjectSync({
        information: information,
        state: projectSyncState,
        getDidLoadProjects: function() {
            return didLoadProjects
        },
        resetLinkedFarmAreasKey: function() {
            linkedFarmAreasKey = ""
        },
        linkFarmAreasToProjects: linkFarmAreasToProjects,
        loadInfo: loadInfo
    })

    function syncDashboard() {
        if (location.pathname !== "/dashboard") { return }
        prepareDashboard()
        if (!didTryGetInfo) {
            didTryGetInfo = true
            loadInfo()
        }
        dashboardProjectSync.syncNewProjectClose()
        dashboardProjectSync.syncActiveProjectFromPopupDom()
        renderProjects(information, didLoadProjects)
        doTopbarstuff(information)

    }

    
    

    

    

    

    

    dashboardSync = syncDashboard
}
