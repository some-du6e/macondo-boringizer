import type { Information } from "./types"

function wait(ms: number) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms)
    })
}

function getFarmContextMenu() {
    return document.getElementsByClassName("fixed bg-parchment border-[3px] border-ds-brown shadow-xl w-52 py-1")[0] || null
}

function hideNextFarmContextMenu() {
    let observer = new MutationObserver(function() {
        let contextMenu = getFarmContextMenu()
        if (!contextMenu) { return }

        contextMenu.classList.add("opacity-0")
        observer.disconnect()
    })

    observer.observe(document.body, {
        childList: true,
        subtree: true
    })

    return observer
}

async function closeFarmContextMenu() {
    let contextMenu = getFarmContextMenu()
    if (!contextMenu) { return }

    document.dispatchEvent(new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        key: "Escape",
        code: "Escape"
    }))
    await wait(20)

    let contextmenu2 = getFarmContextMenu()
    if (!contextmenu2) { return }

    let menuRect = contextMenu.getBoundingClientRect()
    let clickX = menuRect.right + 20
    let clickY = menuRect.top + 20
    if (clickX >= window.innerWidth) {
        clickX = Math.max(1, menuRect.left - 20)
    }
    if (clickY >= window.innerHeight) {
        clickY = Math.max(1, menuRect.top - 20)
    }

    let clickTarget = document.elementFromPoint(clickX, clickY) || document.body
    clickTarget.dispatchEvent(new PointerEvent("pointerdown", {
        bubbles: true,
        cancelable: true,
        pointerId: 1,
        pointerType: "mouse",
        isPrimary: true,
        button: 0,
        buttons: 1,
        clientX: clickX,
        clientY: clickY
    }))
    clickTarget.dispatchEvent(new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        button: 0,
        buttons: 1,
        clientX: clickX,
        clientY: clickY
    }))
    clickTarget.dispatchEvent(new PointerEvent("pointerup", {
        bubbles: true,
        cancelable: true,
        pointerId: 1,
        pointerType: "mouse",
        isPrimary: true,
        button: 0,
        clientX: clickX,
        clientY: clickY
    }))
    clickTarget.dispatchEvent(new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: true,
        button: 0,
        clientX: clickX,
        clientY: clickY
    }))
    clickTarget.dispatchEvent(new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        button: 0,
        clientX: clickX,
        clientY: clickY
    }))
    await wait(20)
}

async function rightclickandextractfarmtile(tile: Element | null, justrightclick = false, x: number | null = null, y: number | null = null): Promise<string | null> {
    if (!tile) {
        console.warn("macondo: farm tile not found for project context menu")
        return null
    }

    if (justrightclick) {
        tile.dispatchEvent(new MouseEvent("contextmenu", {
            bubbles: true,
            cancelable: true,
            button: 2,
            buttons: 2,
            clientX: x ?? 0,
            clientY: y ?? 0,
        }))
        return null
    }

    await closeFarmContextMenu()

    let hideContextMenuObserver = hideNextFarmContextMenu()
    let rect = tile.getBoundingClientRect()
    tile.dispatchEvent(new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
        button: 2,
        buttons: 2,
        clientX: x == null ? rect.left + rect.width / 2 : x,
        clientY: y == null ? rect.top + rect.height / 2 : y,
    }))

    await wait(50)
    hideContextMenuObserver.disconnect()

    let contextMenu = getFarmContextMenu()
    if (!contextMenu) { return null }

    contextMenu.classList.add("opacity-0")

    let nameElement = contextMenu.getElementsByClassName("px-3 py-1.5 text-xs font-bold text-ds-brown/60 truncate")[0]
    let projectName = nameElement ? nameElement.textContent?.trim() : null

    await closeFarmContextMenu()

    return projectName || null
}

export function createFarmAreaLinker(information: Information) {
    let linkedFarmAreasKey = ""
    let isLinkingFarmAreas = false

    function getFarmAreasKey(areas: HTMLCollectionOf<HTMLElement>) {
        let projectList = information.projects || []
        return Array.from(areas).map(function(area) {
            return [
                area.style.left,
                area.style.top,
                area.getAttribute("data-macondo-project-id") || ""
            ].join(",")
        }).join("|") + "::" + projectList.map(function(project) {
            return project.id || project.name || ""
        }).join("|")
    }

    async function linkFarmAreasToProjects() {
        if (isLinkingFarmAreas) { return }

        let areas = document.getElementsByClassName("farm-tile-project") as HTMLCollectionOf<HTMLElement>
        let projectList = information.projects || []
        let linkKey = getFarmAreasKey(areas)

        if (linkKey === linkedFarmAreasKey) { return }

        isLinkingFarmAreas = true

        try {
            for (let i = 0; i < areas.length; i++) {
                let area = areas[i]
                let fallbackProject = projectList[i] || null
                let projectName = await rightclickandextractfarmtile(area) || (fallbackProject ? fallbackProject.name : null)
                if (!projectName) {
                    area.removeAttribute("data-macondo-project-name")
                    area.removeAttribute("data-macondo-project-id")
                    continue
                }

                let colorThing = area.getElementsByClassName("absolute top-1 right-1 w-3 h-3 border-2 border-white/80 z-[5] pointer-events-none")[0] as HTMLElement | undefined
                if (colorThing) {
                    console.log(colorThing)
                    let colorThingColor = colorThing.style.backgroundColor
                    area.setAttribute("data-macondo-project-color", colorThingColor)
                }


                area.setAttribute("data-macondo-project-name", projectName)
                area.removeAttribute("data-macondo-project-id")

                for (let project of projectList) {
                    if (project.name === projectName) {
                        area.setAttribute("data-macondo-project-id", String(project.id))
                        break
                    }
                }
            }

            linkedFarmAreasKey = getFarmAreasKey(areas)
        } finally {
            await closeFarmContextMenu()
            isLinkingFarmAreas = false
        }
    }

    return {
        isLinkingFarmAreas: function() {
            return isLinkingFarmAreas
        },
        resetLinkedFarmAreasKey: function() {
            linkedFarmAreasKey = ""
        },
        linkFarmAreasToProjects: linkFarmAreasToProjects,
        rightclickandextractfarmtile: rightclickandextractfarmtile
    }
}
