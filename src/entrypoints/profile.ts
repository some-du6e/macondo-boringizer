import { applyToSettingsDiv } from "../components/settings"

function doProfileStuff() {
    let settingsDiv = document.getElementsByClassName("relative z-10 max-w-4xl mx-auto px-4 pb-12 pt-6 flex flex-col gap-6")[0]

    applyToSettingsDiv(settingsDiv)

    if (window.location.hash === "#mb_settings") {
        let boringizerSettings = document.getElementById("boringizer-settings")
        if (boringizerSettings) {
            boringizerSettings.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }
}

let profileSyncTimeout: ReturnType<typeof setTimeout> | undefined
new MutationObserver(function() {
    clearTimeout(profileSyncTimeout)
    profileSyncTimeout = setTimeout(doProfileStuff, 50)
}).observe(document.body, {
    childList: true,
    subtree: true
})

setTimeout(doProfileStuff, 250)

window.addEventListener("hashchange", function() {
    doProfileStuff()
})
