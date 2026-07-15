import { doTopbarstuff } from "./topbar"
import type { Information } from "./types"
import { defaultProfilePfp } from "./consts.ts" // TODO: temp
import { renderProjects, prepareDashboard, refreshProjectCardTints, resetProjectsRenderCache } from "./projects"
import { getInfo } from "./info"
import { setProjectPopupHooks } from "./popups"
import { installDashboardProjectSync, type DashboardProjectSyncState } from "./dashboard-projects"
import { createFarmAreaLinker } from "./farm-context-menu"
import { preload } from "./preload.ts"
import { applyGrayscale } from "./grayscale"
import { interceptTour } from "./compat/macondoutils/tour-intercept"

let dashboardSync: (() => void) | null = null

interceptTour()

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
    let farmAreaLinker = createFarmAreaLinker(information, refreshProjectCardTints)

    async function linkFarmAreasAndRefreshCards() {
        await farmAreaLinker.linkFarmAreasToProjects()
        refreshProjectCardTints()
    }

    setProjectPopupHooks({
        isLinkingFarmAreas: farmAreaLinker.isLinkingFarmAreas,
        resetLinkedFarmAreasKey: farmAreaLinker.resetLinkedFarmAreasKey,
        linkFarmAreasToProjects: linkFarmAreasAndRefreshCards,
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
            linkFarmAreasAndRefreshCards().catch(function(error) {
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
        linkFarmAreasToProjects: linkFarmAreasAndRefreshCards,
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
            preload()
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


window.addEventListener("boringizer-update-grayscale", applyGrayscale);

if (!window.macondo.grayscaleObserver) {
    window.macondo.grayscaleObserver = new MutationObserver(function() {
        setTimeout(applyGrayscale, 50)
    })
    window.macondo.grayscaleObserver.observe(document.body, {
        childList: true,
        subtree: true
    })
}
