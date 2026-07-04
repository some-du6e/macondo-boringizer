import type { GameWorldState } from "./types"

function isShopModalOpen() {
    return !!document.querySelector(".modal-frame")
}

function findShopOpener() {
    return Array.from(document.querySelectorAll("button")).find(function (button) {
        return button.textContent.trim() === "Open the shop"
    })
}
export function shoppopup(e?: MouseEvent) {
    if (e && (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) {
        return
    }

    if (e) {
        e.preventDefault()
    }

    console.log("macondo: opening shop popup")
    if (isShopModalOpen()) {
        return
    }

    let gameWorld = document.querySelector<HTMLElement>(".game-world")
    let oldGameWorldState: GameWorldState | null = null
    if (gameWorld) {
        oldGameWorldState = {
            hidden: Boolean(gameWorld.hidden),
            opacity: gameWorld.style.opacity,
            pointerEvents: gameWorld.style.pointerEvents,
        }
        gameWorld.hidden = false
        gameWorld.style.opacity = "0"
        gameWorld.style.pointerEvents = "none"
    }

    let opener = findShopOpener()
    if (!opener) {
        restoreGameWorldAfterFailure()
        console.warn("macondo: shop opener not found")
        return
    }

    function restoreGameWorldForModal() {
        if (!gameWorld || !oldGameWorldState) {
            return
        }
        gameWorld.style.opacity = oldGameWorldState.opacity
        gameWorld.style.pointerEvents = oldGameWorldState.pointerEvents
    }

    function restoreGameWorldAfterFailure() {
        if (!gameWorld || !oldGameWorldState) {
            return
        }
        gameWorld.hidden = oldGameWorldState.hidden
        gameWorld.style.opacity = oldGameWorldState.opacity
        gameWorld.style.pointerEvents = oldGameWorldState.pointerEvents
    }

    opener.click()
    setTimeout(function () {
        if (isShopModalOpen()) {
            restoreGameWorldForModal()
            return
        }

        restoreGameWorldAfterFailure()
        console.warn("macondo: shop popup did not open")
    }, 400)
}

function isProfileModalOpen() {
    return !!document.querySelector(".modal-frame")
}

function findProfileOpener() {
    return Array.from(document.querySelectorAll("button")).find(function (button) {
        return button.textContent.trim() === "Open your profile"
    })
}

export function openProfilePopup(event?: MouseEvent) {
    if (
        event &&
        (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
    ) {
        return
    }

    if (event) {
        event.preventDefault()
    }

    console.log("macondo: opening profile popup")
    if (isProfileModalOpen()) {
        return
    }

    let gameWorld = document.querySelector<HTMLElement>(".game-world")
    let oldGameWorldState: GameWorldState | null = null
    if (gameWorld) {
        oldGameWorldState = {
            hidden: Boolean(gameWorld.hidden),
            opacity: gameWorld.style.opacity,
            pointerEvents: gameWorld.style.pointerEvents,
        }
        gameWorld.hidden = false
        gameWorld.style.opacity = "0"
        gameWorld.style.pointerEvents = "none"
    }

    let opener = findProfileOpener()
    if (!opener) {
        restoreGameWorldAfterFailure()
        console.warn("macondo: profile opener not found")
        return
    }

    function restoreGameWorldForModal() {
        if (!gameWorld || !oldGameWorldState) {
            return
        }
        gameWorld.style.opacity = oldGameWorldState.opacity
        gameWorld.style.pointerEvents = oldGameWorldState.pointerEvents
    }

    function restoreGameWorldAfterFailure() {
        if (!gameWorld || !oldGameWorldState) {
            return
        }
        gameWorld.hidden = oldGameWorldState.hidden
        gameWorld.style.opacity = oldGameWorldState.opacity
        gameWorld.style.pointerEvents = oldGameWorldState.pointerEvents
    }

    opener.click()
    setTimeout(function () {
        if (isProfileModalOpen()) {
            restoreGameWorldForModal()
            return
        }

        restoreGameWorldAfterFailure()

        console.warn("macondo: profile popup did not open")
    }, 400)
}
