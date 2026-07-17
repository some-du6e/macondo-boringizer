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
}
