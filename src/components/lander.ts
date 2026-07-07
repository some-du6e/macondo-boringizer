function buildchildren() {
    let nobullshitbutton = document.createElement("a")
    nobullshitbutton.id = "macondo-boringizer-lander-dashboard-button"
    nobullshitbutton.className =
        "group flex w-full items-center justify-center gap-2 shadow-xl border-[3px] border-ds-brown bg-ds-brown text-ds-cream font-bold text-lg sm:text-xl h-12 px-6 hover:bg-ds-brown/90 transition-colors font-satoro"
    nobullshitbutton.href = "/dashboard"
    nobullshitbutton.innerHTML = `
    <span data-v-8db04a72="">Just let me go to the dashboard</span>
    <svg data-v-8db04a72="" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide shrink-0 transition-transform group-hover:translate-x-1 lucide-arrow-right-icon lucide-arrow-right shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`

    return nobullshitbutton
}

function eliminateChildren(element: Element) {
    element.replaceChildren()
}

function makeTheLanderFuckingWork() {
    let probablyloggedin = localStorage.getItem("boringizer-probably-logged-in")
    if (!probablyloggedin) {
        return
    }
    let thebuttonsdiv = document.getElementsByClassName(
        "absolute inset-0 z-[16] flex flex-col items-center justify-end pb-16 px-6",
    )[0]
    if (!thebuttonsdiv) {
        console.warn("macondo: lander dashboard button container not found")
        return
    }

    if (document.getElementById("macondo-boringizer-lander-dashboard-button")) {
        return
    }

    eliminateChildren(thebuttonsdiv)
    thebuttonsdiv.appendChild(buildchildren())
}

makeTheLanderFuckingWork()

window.macondo = window.macondo || {}
if (!window.macondo.landerObserver) {
    window.macondo.landerObserver = new MutationObserver(makeTheLanderFuckingWork)
    window.macondo.landerObserver.observe(document.body, {
        childList: true,
        subtree: true,
    })
}
