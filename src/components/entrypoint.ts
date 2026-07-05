import { syncHomepageDashboard } from "./homepage"

function syncDashboard() {
    if (location.pathname !== "/dashboard") { return }
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
