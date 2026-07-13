const grayscaleOverlayId = "macondo-boringizer-grayscale-overlay"

export function applyGrayscale() {
    const grayscaleStatus = localStorage.getItem("boringizer-grayscale") === "true"

    // Never filter a Macondo ancestor: that changes the containing block of its
    // fixed children and can collapse an entire route to 0x0.
    document.body.style.filter = ""
    document.getElementById("__nuxt")?.style.removeProperty("filter")

    let overlay = document.getElementById(grayscaleOverlayId)
    if (!grayscaleStatus) {
        overlay?.remove()
        return
    }

    if (overlay) { return }

    overlay = document.createElement("div")
    overlay.id = grayscaleOverlayId
    overlay.setAttribute("aria-hidden", "true")
    overlay.style.position = "fixed"
    overlay.style.inset = "0"
    overlay.style.zIndex = "2147483647"
    overlay.style.pointerEvents = "none"
    overlay.style.backdropFilter = "grayscale(100%)"
    overlay.style.setProperty("-webkit-backdrop-filter", "grayscale(100%)")
    document.body.appendChild(overlay)
}
