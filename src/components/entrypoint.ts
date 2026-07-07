import { doTopbarstuff } from "./topbar"
import type { Information } from "./types"
import { defaultProfilePfp } from "./consts.ts" // TODO: temp
import { renderProjects, prepareDashboard, resetProjectsRenderCache } from "./projects"
import { getInfo } from "./info"
import { setProjectPopupHooks } from "./popups"
import { installDashboardProjectSync, type DashboardProjectSyncState } from "./dashboard-projects"
import { createFarmAreaLinker } from "./farm-context-menu"

let dashboardSync: (() => void) | null = null

function syncHomepageDashboard() {
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

    let information: Information = {
        "user": {
            "name": "not found",
            "pfp": defaultProfilePfp
        },
        "projects": []
    }

    let didTryGetInfo = false
    let didLoadProjects = false
    let projectSyncState: DashboardProjectSyncState = {
        activeProjectPopupId: null,
        activeProjectPopupSnapshot: null,
        pendingDeleteProjectId: null,
        isWaitingForNewProjectClose: false,
        didSeeNewProjectPopup: false
    }
    let farmAreaLinker = createFarmAreaLinker(information)

    setProjectPopupHooks({
        isLinkingFarmAreas: farmAreaLinker.isLinkingFarmAreas,
        resetLinkedFarmAreasKey: farmAreaLinker.resetLinkedFarmAreasKey,
        linkFarmAreasToProjects: farmAreaLinker.linkFarmAreasToProjects,
        rightclickandextractfarmtile: farmAreaLinker.rightclickandextractfarmtile,
        setNewProjectCloseWait: function(isWaiting, didSeePopup) {
            projectSyncState.isWaitingForNewProjectClose = isWaiting
            projectSyncState.didSeeNewProjectPopup = didSeePopup
        },
        setActiveProjectPopup: function(projectId, snapshot) {
            projectSyncState.activeProjectPopupId = projectId
            projectSyncState.activeProjectPopupSnapshot = snapshot
        }
    })

    function loadInfo() {
        getInfo(information, function() {
            didLoadProjects = true
            resetProjectsRenderCache()
            renderProjects(information, didLoadProjects)
            farmAreaLinker.linkFarmAreasToProjects().catch(function(error) {
                console.warn("macondo: farm area linking failed after loading projects", error)
            })
        })
    }

    let dashboardProjectSync = installDashboardProjectSync({
        information: information,
        state: projectSyncState,
        getDidLoadProjects: function() {
            return didLoadProjects
        },
        resetLinkedFarmAreasKey: farmAreaLinker.resetLinkedFarmAreasKey,
        linkFarmAreasToProjects: farmAreaLinker.linkFarmAreasToProjects,
        loadInfo: loadInfo
    })

    function syncDashboardState() {
        if (location.pathname !== "/dashboard") {
            didTryGetInfo = false
            return
        }
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

    dashboardSync = syncDashboardState
}

function syncDashboard() {
    syncHomepageDashboard()
}

window.addEventListener("pageChange", function() {
    setTimeout(syncDashboard, 200)
})

setTimeout(syncDashboard, 200)

let syncTimeout: ReturnType<typeof setTimeout> | undefined
window.macondo = window.macondo || {}
if (!window.macondo.homepagethingObserver) {
    window.macondo.homepagethingObserver = new MutationObserver(function() {
        clearTimeout(syncTimeout)
        syncTimeout = setTimeout(syncDashboard, 50)
    })
    window.macondo.homepagethingObserver.observe(document.body, {
        childList: true,
        subtree: true
    })
}
