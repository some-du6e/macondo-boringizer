import { shoppopup, openProfilePopup } from "./popups"
import type { Information } from "./types"
import { defaultProfilePfp } from "./consts.ts"
function makepfp(information: Information) {
    let pfpUrl = information.user && information.user.pfp ? information.user.pfp : defaultProfilePfp
    let existingPfp = document.getElementById("macondo-boringizer-pfp") as HTMLAnchorElement | null
    if (existingPfp) {
        if (existingPfp.dataset.macondoProfileLinkReady !== "true") {
            let cleanPfp = existingPfp.cloneNode(true) as HTMLAnchorElement
            existingPfp.replaceWith(cleanPfp)
            existingPfp = cleanPfp
        }
    }

    if (existingPfp) {
        existingPfp.href = "/profile"
        existingPfp.dataset.macondoProfileLinkReady = "true"
        existingPfp.addEventListener("click", openProfilePopup)
        existingPfp.style.order = "-1"
        let existingImage = existingPfp.querySelector("img")
        if (existingImage && existingImage.src !== pfpUrl) {
            existingImage.src = pfpUrl
        }
        return existingPfp
    }

    let pfp = document.createElement("a")
    pfp.id = "macondo-boringizer-pfp"
    pfp.className = "w-10 h-10 rounded-full overflow-hidden border-2 border-ds-brown/40 shrink-0"
    pfp.href = "/profile"
    pfp.dataset.macondoProfileLinkReady = "true"
    pfp.addEventListener("click", openProfilePopup)
    pfp.style.order = "-1"

    let img = document.createElement("img")
    img.src = pfpUrl
    img.alt = "Profile"
    img.className = "w-full h-full object-cover"

    pfp.appendChild(img)
    return pfp
}

function hideThemeToggle(topbar: HTMLElement) {
    let themeToggle = topbar.querySelector<HTMLElement>(
        '[role="group"][aria-label="Day and night mode"]',
    )
    if (!themeToggle) {
        return
    }
    themeToggle.style.display = "none"
    themeToggle.setAttribute("aria-hidden", "true")
}

function addShopButton(topbar: HTMLElement) {
    if (document.getElementById("macondo-boringizer-shop-button")) {
        return
    }

    let docsLink = topbar.querySelector<HTMLAnchorElement>('a[href="/docs"]')
    let notificationsButton = topbar.querySelector('button[aria-label="Notifications"]')
    if (
        !docsLink ||
        !notificationsButton ||
        !notificationsButton.parentElement ||
        !notificationsButton.parentElement.parentElement
    ) {
        return
    }

    let shopButton = document.createElement("button")
    shopButton.id = "macondo-boringizer-shop-button"
    shopButton.type = "button"
    shopButton.className = docsLink.className
    shopButton.setAttribute("aria-label", "Shop")
    shopButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 md:w-5 md:h-5 lucide lucide-store-icon lucide-store" aria-hidden="true"><path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/><path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"/><path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"/></svg><span class="hidden md:inline">Shop</span>`
    shopButton.addEventListener("click", function (e) {
        shoppopup(e)
    })
    notificationsButton.parentElement.parentElement.insertBefore(
        shopButton,
        notificationsButton.parentElement,
    )
}

function addExploreButton(topbar: HTMLElement) {
    if (document.getElementById("macondo-boringizer-explore-button")) {
        return
    }

    let docsLink = topbar.querySelector<HTMLAnchorElement>('a[href="/docs"]')
    let notificationsButton = topbar.querySelector('button[aria-label="Notifications"]')
    if (
        !docsLink ||
        !notificationsButton ||
        !notificationsButton.parentElement ||
        !notificationsButton.parentElement.parentElement
    ) {
        return
    }

    let exploreButton = document.createElement("a")
    exploreButton.id = "macondo-boringizer-explore-button"
    exploreButton.className = docsLink.className
    exploreButton.setAttribute("aria-label", "Explore")
    exploreButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 md:w-5 md:h-5 lucide lucide-compass-icon lucide-compass" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-1.8 5.39a2 2 0 0 1-1.26 1.26l-5.42 1.83 1.8-5.39a2 2 0 0 1 1.26-1.26z"/></svg><span class="hidden md:inline">Explore</span>`
    exploreButton.href = "/explore"
    notificationsButton.parentElement.parentElement.insertBefore(
        exploreButton,
        notificationsButton.parentElement,
    )
}

export function doTopbarstuff(information: Information) {
    let topbar =
        document.getElementById("macondo-boringizer-topbar") ||
        (document.getElementsByClassName(
            "absolute top-0 left-0 right-0 z-[100] pointer-events-none",
        )[0] as HTMLElement | undefined)
    if (!topbar) {
        console.error("boring: topbar not found! ID:1s9f8g")
        return
    }

    topbar.id = "macondo-boringizer-topbar"

    topbar.classList.remove("absolute")
    topbar.classList.remove("pointer-events-none")

    topbar.classList.add("sticky")
    // topbar.classList.add("sticky")

    hideThemeToggle(topbar)
    addShopButton(topbar)
    addExploreButton(topbar)

    let leftside = topbar.children[0]?.children[0] as HTMLElement | undefined
    if (!leftside) {
        return
    }
    leftside.id = "macondo-boringizer-leftside"

    let pfp = makepfp(information)
    if (pfp.parentElement !== leftside) {
        leftside.appendChild(pfp)
    }

    let possiblemoneydivs = document.getElementsByClassName(
        "flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-parchment/90 backdrop-blur-sm border-[3px] border-ds-brown transition-transform duration-200",
    ) as HTMLCollectionOf<HTMLElement>
    let moneydiv: HTMLElement | null = null
    for (let possibility of possiblemoneydivs) {
        let img = possibility.children[0] as HTMLImageElement | undefined
        if (!img) {
            continue
        }
        if (img.src.endsWith("money.webp")) {
            moneydiv = possibility
            break
        }
    }

    // maybe remove this after when u got the correct commit and not retrased
    if (moneydiv) {
        if (moneydiv.tagName === "A") {
            // we have alr done it
            console.log("macondo: money div is already GAYYY")
            moneydiv = null
        }
    }

    if (moneydiv) {
        console.log("macondo: found money div", moneydiv)

        let newmoneydiv = document.createElement("a")
        newmoneydiv.className = moneydiv.className
        newmoneydiv.innerHTML = moneydiv.innerHTML
        newmoneydiv.href = "/currency"
        moneydiv.replaceWith(newmoneydiv)

        moneydiv = newmoneydiv
    }
}
