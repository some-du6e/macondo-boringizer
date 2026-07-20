function addCheekyLink() {
    if (document.getElementById("mb-cheeky-settings-link")) { return }

    console.log("adding cheeky link")
    let settingsPanel = document.getElementsByClassName("mu-label-settings-panel")[0]
    if (!settingsPanel) { console.log("i eat poo");return }
    console.log("settings panel found")

    let cheekyButton = document.createElement("a")
    cheekyButton.className = "ds-btn-primary text-xs tm-4 bm-4"
    cheekyButton.id = "mb-cheeky-settings-link"
    cheekyButton.href = "/profile#mb_settings"
    cheekyButton.target = "_blank"
    cheekyButton.textContent = "Macondo Boringizer Settings"

    settingsPanel.prepend(cheekyButton)
}




export function fixMUSettings(topbar: Element) {
    let MUsettings = document.getElementById("macondo-utils-project-label-settings")
    if (!MUsettings) { return }

    let docsLink = topbar.querySelector<HTMLAnchorElement>('a[href="/docs"]')
    if (!docsLink?.parentElement) { return }

    let settingsButton = MUsettings.querySelector<HTMLButtonElement>(".mu-label-settings-btn")
    if (settingsButton) {
        settingsButton.className = `${docsLink.className} mu-label-settings-btn`
        let docsStyle = getComputedStyle(docsLink)
        settingsButton.style.backgroundColor = docsStyle.backgroundColor
        settingsButton.style.color = docsStyle.color
        settingsButton.style.borderColor = docsStyle.borderColor
        for (let filledPart of settingsButton.querySelectorAll<SVGElement>("[fill]")) {
            if (filledPart.getAttribute("fill") !== "none") {
                filledPart.setAttribute("fill", "currentColor")
            }
        }
    }

    let mount = document.getElementById("macondo-utils-settings-fallback-mount") || MUsettings
    mount.style.position = "relative"
    mount.style.inset = "auto"
    mount.style.zIndex = "auto"
    mount.style.pointerEvents = "auto"
    if (docsLink.nextElementSibling !== mount) {
        docsLink.parentElement.insertBefore(mount, docsLink.nextElementSibling)
    }

    addCheekyLink()
}
