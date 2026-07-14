import type { Project, Information } from "./types"
import { projectcontextmenu, projectpopup, newprojectpopup } from "./popups"
import { customProjectsId, placeholderProjects } from "./consts.ts"

let renderedProjectsKey = ""

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

function projectCard(project: Project) {
    project = project || {}
    let projectName = project.name || "Untitled project"
    let projectDescription = project.description || "No description yet."
    let projectStatus =
        project.has_shipped == null ? project.status || "In Progress" : project.has_shipped ? "Shipped" : "In Progress"
    let projectStatusColor = projectStatus == "In Progress" ? "bg-ds-warning text-ds-brown" : ""
    let projectType = project.type || "software"
    let projectLevel = project.level || "1"
    let projectVotes = project.votes || project.upvotes || 0
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
    projectVotes = escapeHtml(projectVotes)
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
        class="lucide w-3 h-3 text-ds-danger lucide-flame-icon lucide-flame w-3 h-3 text-ds-danger ${grayedStreak}"
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
    <img
      src="/images/fruits/${fruitStageImage}"
      class="w-20 h-20 object-contain absolute right-3 top-3"
    >
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
      <!--
      <button
        type="button"
        class="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold border-2 transition-colors bg-parchment text-ds-brown border-ds-brown/40 hover:border-ds-brown"
        aria-disabled="false"
        title="Upvote">
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
          class="lucide w-3.5 h-3.5 lucide-chevron-up-icon lucide-chevron-up w-3.5 h-3.5"
          aria-hidden="true">
          <path d="m18 15-6-6-6 6"></path>
        </svg>
        <span class="tabular-nums">${projectVotes}</span>
      </button> TODO: check if project.votes is real or if codex hallucinated it

      --->
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

    let projectsToRender =
        information.projects.length || didLoadProjects ? information.projects : placeholderProjects
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
                project.votes,
                project.upvotes,
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
        return
    }
    renderedProjectsKey = projectsKey

    projectsContainer.replaceChildren()
    for (let i = 0; i < projectsToRender.length; i++) {
        projectsContainer.appendChild(projectCard(projectsToRender[i]))
    }

    projectsContainer.appendChild(newProjectCard())
}
