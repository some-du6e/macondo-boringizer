import type { Project, Information } from "./types"
import { projectcontextmenu, projectpopup, newprojectpopup } from "./popups"
import { customProjectsId } from "./consts.ts"

let renderedProjectsKey = ""
const projectCardIdAttribute = "data-macondo-project-card-id"
const projectCardTintAttribute = "data-macondo-project-card-tint"

export function resetProjectsRenderCache() {
    renderedProjectsKey = ""
}

function newProjectCard() {
        let card = document.createElement("button")
        card.type = "button"
        card.className = "group flex flex-col bg-parchment border-[3px] border-ds-brown/20 hover:border-ds-brown/60 cursor-pointer transition-colors h-full"
        card.setAttribute("aria-label", "New project")
        card.innerHTML = `
        <div class="flex flex-1 flex-col items-center justify-center p-3">
            <span class="font-bold text-ds-brown leading-tight text-6xl">+</span>
        </div>
        `

        card.addEventListener("click", function (e) {
            newprojectpopup(e)
        })
        return card
    }

function loadingProjectsCard() {
    let card = document.createElement("div")
    card.className = "flex h-full w-full flex-col items-center justify-center gap-4 bg-parchment p-6 text-ds-brown"
    card.setAttribute("role", "status")
    card.setAttribute("aria-live", "polite")
    card.innerHTML = `
        <style>
            @keyframes macondo-project-loader-bob {
                0%, 100% { transform: translate(-50%, 0); }
                50% { transform: translate(-50%, -8px); }
            }
            @keyframes macondo-project-loader-dot {
                0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
                30% { opacity: 1; transform: translateY(-3px); }
            }
            @media (prefers-reduced-motion: reduce) {
                .macondo-project-loader-fruit,
                .macondo-project-loader-dot { animation: none !important; }
            }
        </style>
        <div class="relative h-28 w-32" aria-hidden="true">
            <img src="/images/tierra/ground_tile.webp" alt="" class="absolute bottom-0 left-1/2 w-32 -translate-x-1/2 object-contain">
            <img src="/images/fruits/papaya/etapa_1.webp" alt="" class="macondo-project-loader-fruit absolute bottom-7 left-1/2 h-20 w-20 object-contain" style="animation: macondo-project-loader-bob 1.4s ease-in-out infinite">
        </div>
        <div class="text-center">
            <div class="font-bold uppercase tracking-wider">Loading projects</div>
            <div class="mt-2 flex justify-center gap-1" aria-hidden="true">
                <span class="macondo-project-loader-dot h-2 w-2 bg-ds-brown" style="animation: macondo-project-loader-dot 1.2s ease-in-out infinite"></span>
                <span class="macondo-project-loader-dot h-2 w-2 bg-ds-brown" style="animation: macondo-project-loader-dot 1.2s ease-in-out 0.15s infinite"></span>
                <span class="macondo-project-loader-dot h-2 w-2 bg-ds-brown" style="animation: macondo-project-loader-dot 1.2s ease-in-out 0.3s infinite"></span>
            </div>
        </div>
    `
    return card
}

function convertfruittoshit(fruit: string) {
    // Software
    if (fruit == "Mango") {
        return "mango/icon.webp"
    } // l1
    if (fruit == "Pineapple") {
        return "pineapple/icon.webp"
    } // l2
    if (fruit == "Papaya") {
        return "papaya/icon_interior.webp"
    } // l3
    if (fruit == "Cocoa") {
        return "cocoa/icon_interior.webp"
    } // l4

    // Hardware
    if (fruit == "Guava") {
        return "guava/icon_interior.webp"
    } // l1
    if (fruit == "Coconut") {
        return "coco/icon_interior.webp"
    } // l2
    if (fruit == "Watermelon") {
        return "watermelon/icon_interior.webp"
    } // l3
    if (fruit == "Avocado") {
        return "avocado/icon_interior.webp"
    } // l4

    return "papaya/icon_interior.webp"
}

const fruitStageFolders: Record<string, string> = {
    Mango: "mango",
    Pineapple: "pineapple",
    Papaya: "papaya",
    Cocoa: "cocoa",
    Guava: "guava",
    Coconut: "coco",
    Watermelon: "watermelon",
    Avocado: "avocado",
}

function convertFruitStageToImage(fruit: string, stage: string | number) {
    let folder = fruitStageFolders[fruit] || "papaya"
    let stageNumber = Number(stage)
    let safeStage = Number.isInteger(stageNumber) && stageNumber > 0 ? stageNumber : 1
    return `${folder}/etapa_${safeStage}.webp`
}

function escapeHtml(value: unknown) {
    return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
}

function setProjectCardTint(card: HTMLElement, color: string | null) {
    let cardDetails = card.children[1]
    if (!(cardDetails instanceof HTMLElement)) { return }

    let existingTint = cardDetails.querySelector<HTMLElement>(`[${projectCardTintAttribute}]`)
    if (!color) {
        existingTint?.remove()
        return
    }

    let tint = existingTint || document.createElement("div")
    tint.setAttribute(projectCardTintAttribute, "")
    tint.className = "absolute inset-0 pointer-events-none"
    tint.style.backgroundColor = color
    tint.style.opacity = "0.14"
    tint.style.zIndex = "1"
    tint.setAttribute("aria-hidden", "true")

    if (!existingTint) {
        cardDetails.appendChild(tint)
    }
}

export function refreshProjectCardTints() {
    let projectColors = new Map<string, string>()
    let farmTiles = document.querySelectorAll<HTMLElement>("[data-macondo-project-id][data-macondo-project-color]")

    for (let farmTile of farmTiles) {
        let projectId = farmTile.getAttribute("data-macondo-project-id")
        let color = farmTile.getAttribute("data-macondo-project-color")
        if (projectId && color) {
            projectColors.set(projectId, color)
        }
    }

    let cards = document.querySelectorAll<HTMLElement>(`[${projectCardIdAttribute}]`)
    for (let card of cards) {
        let projectId = card.getAttribute(projectCardIdAttribute)
        setProjectCardTint(card, projectId ? projectColors.get(projectId) || null : null)
    }
}

function projectCard(project: Project) {
    project = project || {}
    let projectName = project.name || "Untitled project"
    let projectDescription = project.description || "No description yet."
    let projectStatus =
        project.has_shipped == null ? project.status || "In Progress" : project.has_shipped ? "Shipped" : "In Progress"
    let projectStatusColor = projectStatus == "In Progress" ? "bg-ds-warning text-ds-brown" : ""
    let projectType = project.type || "software"
    let projectLevel = project.level || "1"
    let projectImage = project.thumbnail_url || project.image || null
    let projectFruit = project.fruit || "Papaya"
    let fruitSlug = convertfruittoshit(String(projectFruit))
    let fruitStageImage = convertFruitStageToImage(String(projectFruit), project.stage || 1)
    let projectStreak = project.project_streak_days || null
    projectName = escapeHtml(projectName)
    projectDescription = escapeHtml(projectDescription)
    projectStatus = escapeHtml(projectStatus)
    projectType = escapeHtml(projectType)
    projectLevel = escapeHtml(projectLevel)
    projectImage = escapeHtml(projectImage)
    projectStreak = projectStreak == null ? "No" : String(projectStreak) + "d"
    let grayedStreak = projectStreak === "No" ? "grayscale opacity-50" : ""
    projectStreak = escapeHtml(projectStreak)
    projectFruit = escapeHtml(projectFruit)
    fruitSlug = escapeHtml(fruitSlug)
    fruitStageImage = escapeHtml(fruitStageImage)

    let image = ``
    if (projectImage) {
        image = `<img src="${projectImage}" alt="Macondo boringizer" class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">`
    } else {
        image = `<div class="absolute inset-0 flex items-center justify-center text-xs text-ds-brown/40 font-semibold uppercase tracking-wider">No thumbnail</div>`
    }

    let card = document.createElement("div")
    card.className =
        "group flex min-h-0 flex-col bg-parchment border-[3px] border-ds-brown/20 hover:border-ds-brown/60 cursor-pointer transition-colors"
    card.setAttribute("role", "button")
    card.tabIndex = 0
    card.setAttribute("aria-label", "View project " + projectName)
    if (project.id != null) {
        card.setAttribute(projectCardIdAttribute, String(project.id))
    }
    let cardContent = `
  <div
    class="relative aspect-[16/10] bg-ds-brown/10 overflow-hidden border-b-[3px] border-ds-brown/10">
    ${image}
    <div
      class="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-parchment/95 border-2 border-ds-brown text-xs font-bold text-ds-brown">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide w-3 h-3 text-ds-danger lucide-flame-icon lucide-flame ${grayedStreak}"
        aria-hidden="true">
        <path
          d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"></path>
      </svg>
      ${projectStreak} streak
    </div>
    <div
      class="absolute top-2 right-2 w-8 h-8 bg-parchment/95 border-2 border-ds-brown flex items-center justify-center"
      title="${projectFruit}">
      <img
        src="/images/fruits/${fruitSlug}"
        alt="${projectFruit}"
        class="w-5 h-5 object-contain" />
    </div>
    <!---->
  </div>
  <div class="flex flex-1 flex-col gap-2 p-3 relative">
    <h3 class="text-base font-bold text-ds-brown leading-tight line-clamp-2" style="padding-right: 6.5rem">${projectName}</h3>
    <p class="text-xs text-ds-brown/70 leading-snug" style="height: 3rem; overflow: hidden; padding-right: 6.5rem">
      ${projectDescription}
    </p>
    <div class="absolute right-3 top-3 w-24 h-24">
      <img
        src="/images/tierra/ground_tile.webp"
        alt=""
        class="absolute bottom-0 left-0 w-24 object-contain"
      >
      <img
        src="/images/fruits/${fruitStageImage}"
        alt="${projectFruit}"
        class="absolute object-contain"
        style="width: 70px; height: 70px; bottom: 20px; left: 50%; transform: translateX(-50%)"
      >
    </div>
    <div class="flex items-center justify-between gap-2 mt-1">

      <div class="flex items-center gap-1 shrink-0">
        <span
          class="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${projectStatusColor} ">
          ${projectStatus}
        </span>
        <span
          class="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-ds-brown/10 text-ds-brown/80">
          ${projectType}
        </span>
        <span
          class="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-ds-brown/10 text-ds-brown/80">
          L${projectLevel}
        </span>
      </div>
    </div>
    <div class="flex items-center justify-between gap-2 mt-auto pt-2 border-t-2 border-ds-brown/10">
      <span class="text-[10px] text-ds-brown/40 uppercase tracking-wider">View project</span>
    </div>
  </div>

        `
    card.innerHTML = cardContent

    card.addEventListener("contextmenu", function (e) {
        console.log("macondo: project card clicked", project.id)
        projectcontextmenu(project.id, e)
    })

    card.addEventListener("click", function (e) {
        console.log("macondo: project card clicked", project.id)
        projectpopup(project.id, e)
    })
    card.addEventListener("keydown", function(e) {
        if (e.key !== "Enter" && e.key !== " ") { return }
        e.preventDefault()
        let rect = card.getBoundingClientRect()
        let keyboardClick = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            button: 0,
            buttons: 1,
            clientX: rect.left + rect.width / 2,
            clientY: rect.top + rect.height / 2,
        })
        console.log("macondo: project card clicked", project.id)
        projectpopup(project.id, keyboardClick)
    })

    return card
}

export function prepareDashboard() {
    let mainContainer = document.getElementsByClassName(
        "fixed inset-0 overflow-hidden bg-parchment",
    )[0] as HTMLElement | undefined
    if (mainContainer) {
        mainContainer.style.overflowY = "auto"
        mainContainer.style.overflowX = "hidden"
    }

    let gameword = document.querySelector<HTMLElement>(".game-world")
    if (gameword) {
        gameword.hidden = true
    }
}

export function renderProjects(information: Information, didLoadProjects: boolean) {
    let mainContainer = document.getElementsByClassName(
        "fixed inset-0 overflow-hidden bg-parchment",
    )[0]
    if (!mainContainer) {
        return
    }

    let projectsContainer = document.getElementById(customProjectsId)
    if (!projectsContainer) {
        projectsContainer = document.createElement("div")
        projectsContainer.id = customProjectsId
        projectsContainer.className =
            "relative mx-4 mt-28 mb-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max gap-4"
        projectsContainer.style.zIndex = "21"
        mainContainer.appendChild(projectsContainer)
    }

    if (!didLoadProjects || !document.getElementById("macondo-boringizer-shop-button")) {
        let loadingKey = "loading"
        if (renderedProjectsKey === loadingKey && projectsContainer.children.length === 1) {
            return
        }
        renderedProjectsKey = loadingKey
        projectsContainer.className = "fixed inset-0 flex bg-parchment"
        projectsContainer.style.zIndex = "200"
        projectsContainer.replaceChildren(loadingProjectsCard())
        return
    }

    projectsContainer.className =
        "relative mx-4 mt-28 mb-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max gap-4"
    projectsContainer.style.zIndex = "21"

    let projectsToRender = information.projects
    let projectsKey = projectsToRender
        .map(function (project) {
            return [
                project.id,
                project.name,
                project.description,
                project.status,
                project.has_shipped,
                project.type,
                project.level,
                project.image,
                project.thumbnail_url,
                project.fruit,
                project.stage,
                project.project_streak_days,
            ].map(function(value) {
                return String(value ?? "")
            }).join("^_")
        })
        .join("|")
    let expectedProjectCardCount = projectsToRender.length + 1
    if (
        projectsKey === renderedProjectsKey &&
        projectsContainer.children.length === expectedProjectCardCount
    ) {
        refreshProjectCardTints()
        return
    }
    renderedProjectsKey = projectsKey

    projectsContainer.replaceChildren()
    for (let i = 0; i < projectsToRender.length; i++) {
        projectsContainer.appendChild(projectCard(projectsToRender[i]))
    }

    projectsContainer.appendChild(newProjectCard())
    refreshProjectCardTints()
}
