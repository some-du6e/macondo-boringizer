import type { GameWorldState } from "./types"

type ProjectPopupHooks = {
    isLinkingFarmAreas: () => boolean
    resetLinkedFarmAreasKey: () => void
    linkFarmAreasToProjects: () => Promise<void>
    rightclickandextractfarmtile: (tile: Element | null, justrightclick?: boolean, x?: number | null, y?: number | null) => Promise<string | null>
    setNewProjectCloseWait: (isWaiting: boolean, didSeePopup: boolean) => void
    setActiveProjectPopup: (projectId: string | null, snapshot: string | null) => void
}

let projectPopupHooks: ProjectPopupHooks | null = null
let linkingFarmAreasPromise: Promise<void> | null = null

export function setProjectPopupHooks(hooks: ProjectPopupHooks) {
    projectPopupHooks = hooks
}

function getProjectPopupHooks() {
    if (!projectPopupHooks) {
        console.warn("macondo: project popup hooks not ready")
        return null
    }

    return projectPopupHooks
}

function findShopOpener() {
    return Array.from(document.querySelectorAll("button")).find(function (button) {
        return button.textContent?.trim() === "Open the shop"
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
    if (document.querySelector(".modal-frame")) {
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
        gameWorld.hidden = oldGameWorldState.hidden
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
        if (document.querySelector(".modal-frame")) {
            restoreGameWorldForModal()
            return
        }

        restoreGameWorldAfterFailure()
        console.warn("macondo: shop popup did not open")
    }, 400)
}

function findProfileOpener() {
    return Array.from(document.querySelectorAll("button")).find(function (button) {
        return button.textContent?.trim() === "Open your profile"
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
    if (document.querySelector(".modal-frame")) {
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
        gameWorld.hidden = oldGameWorldState.hidden
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
        if (document.querySelector(".modal-frame")) {
            restoreGameWorldForModal()
            return
        }

        restoreGameWorldAfterFailure()

        console.warn("macondo: profile popup did not open")
    }, 400)
}



function findProjectFarmTile(projectId: string | number | null | undefined) {
        let normalizedProjectId = String(projectId)
        let escapedProjectId = window.CSS && CSS.escape ? CSS.escape(normalizedProjectId) : normalizedProjectId.replace(/"/g, '\\"')
        let projecttiles = document.querySelectorAll(`[data-macondo-project-id="${escapedProjectId}"]`)

        for (let tile of projecttiles) {
            if (tile.getAttribute("data-macondo-project-id") === normalizedProjectId) {
                return tile
            }
        }

        return null
    }

    export async function getProjectFarmTile(projectId: string | number | null | undefined) {
        let hooks = getProjectPopupHooks()
        if (!hooks) { return null }

        let target = findProjectFarmTile(projectId)
        if (target) { return target }

        if (hooks.isLinkingFarmAreas() && linkingFarmAreasPromise) {
            await linkingFarmAreasPromise
            return findProjectFarmTile(projectId)
        }

        hooks.resetLinkedFarmAreasKey()
        linkingFarmAreasPromise = hooks.linkFarmAreasToProjects()
        try {
            await linkingFarmAreasPromise
        } finally {
            linkingFarmAreasPromise = null
        }
        return findProjectFarmTile(projectId)
    }

    export async function projectcontextmenu(projectId: string | number | null | undefined, e: MouseEvent) {
        e.preventDefault()

        let hooks = getProjectPopupHooks()
        if (!hooks) { return }

        let target = await getProjectFarmTile(projectId)
        try {
            await hooks.rightclickandextractfarmtile(target, true, e.clientX, e.clientY)
        } catch (error) {
            console.warn("macondo: project context menu failed", error)
        }
    }

    export function newprojectpopup(e: MouseEvent) {
        let target = document.getElementsByClassName("farm-tile-iso farm-tile-add")[0]

        e.preventDefault()
        if (!target) {
            console.warn("macondo: new project tile not found for popup")
            return
        }

        let hooks = getProjectPopupHooks()
        if (!hooks) { return }

        hooks.setNewProjectCloseWait(true, false)

        target.dispatchEvent(new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            button: 0,
            buttons: 1,
            clientX: e.clientX,
            clientY: e.clientY,
        }));
    }

    export async function projectpopup(projectId: string | number | null | undefined, e: MouseEvent) {
        let normalizedProjectId = String(projectId)

        e.preventDefault()
        let hooks = getProjectPopupHooks()
        if (!hooks) { return }

        let target = await getProjectFarmTile(projectId)
        if (!target) {
            console.warn("macondo: project tile not found for popup", normalizedProjectId)
            return
        }

        hooks.setActiveProjectPopup(normalizedProjectId, null)

        target.dispatchEvent(new MouseEvent('click', {  
            bubbles: true,
            cancelable: true,
            button: 0,
            buttons: 1,
            clientX: e.clientX,
            clientY: e.clientY,
        }));
    }

    // DONT DELETE
        // for later use
        function closePopup() {
            console.log("macondo: closing popup")
    
            let popup = document.getElementsByClassName("relative pl-5 pt-4 pr-6 pb-6 flex flex-col modal-frame relative w-full max-w-6xl mx-4 pointer-events-auto max-h-[90vh]")[0]
            if (!popup) {
                console.warn("macondo: popup not found; cannot close")
                return
            }
    
            let close_button = popup.getElementsByClassName("text-sm text-ds-brown flex items-center gap-1 hover:opacity-70 transition-opacity")[0] as HTMLElement | undefined
            if (!close_button) {
                console.warn("macondo: popup close button not found")
                return
            }
    
            close_button.click()
        }
