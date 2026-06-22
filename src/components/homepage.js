function homepagething() {
    window.macondo = window.macondo || {}
    if (location.pathname !== "/dashboard") { return }
    if (window.macondo.homepagethingObserver) { return }
    console.log("macondo+: homepagething running")
    // if (!window.macondo.datapage) {
    //     console.error("macondo: datapage not found! ID:1s9f8g")
    //     return
    // }



    // shi to skid
    // https://github.com/SabioOfficial/MacondoPlus
    // utils

    let projects = {}
    let customProjectsId = "macondo-boringizer-projects"
    let defaultProfilePfp = "https://cachet.dunkirk.sh/users/U091HC53CE8/r"
    let information = {
        "user": {
            "name": "not found",
            "pfp": defaultProfilePfp
        },
        "projects": []
    }
    let placeholderProjects = [
        {
            "id": "placeholder-1",
            "name": "YO PLEASE WAIT", // TODO: loading bar
            "author": "",
            "description": "im loading yo shi gng wait a sec",
            "status": "Shipped",
            "type": "software",
            "level": "3",
            "votes": 8,
            "image": "https://media.tenor.com/WX_LDjYUrMsAAAAi/loading.gif",
            "pfp": "https://l4.dunkirk.sh/i/5DjfoBI58Pfw.webp",
            "fruit": "Papaya"
        }
    ]
    let didTryGetInfo = false
    let renderedProjectsKey = ""

    function getMainContainer() {
        return document.getElementsByClassName("fixed inset-0 overflow-hidden bg-parchment")[0]
    }

    function convertfruittoshit(fruit) {
        if (fruit == "Papaya") { return "papaya/icon_interior.webp" }
        if (fruit == "Coconut") { return "coco/icon_interior.webp"}

        if (fruit == "Pineapple") { return "pineapple/icon.webp"}
        if (fruit == "Mango") { return "mango/icon.webp" }
        
    }

    function escapeHtml(value) {
        return String(value == null ? "" : value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
    }


    let projectSchema = {
        "name": String,
        "author": String,
        "description": String,
        "status": ""
    }

    function projectCard(project) {
        project = project || {}
        let projectName = project.name || "Untitled project"
        let projectDescription = project.description || "No description yet."
        let projectStatus = project.has_shipped ? "Shipped" : "In Progress" 
        let projectStatusColor = projectStatus == "In Progress" ? "bg-ds-warning text-ds-brown" : ""
        let projectType = project.type || "software"
        let projectLevel = project.level || "1"
        let projectVotes = project.votes || project.upvotes || 0
        let projectImage = project.thumbnail_url || "https://cdn.hackclub.com/019ef10d-99ef-745b-884e-dbfbff62a87b/mdrc5gt.png"
        let projectFruit = project.fruit || "Papaya"
        let fruitSlug = convertfruittoshit(String(projectFruit))
        let projectStreak = project.project_streak_days || null
        projectName = escapeHtml(projectName)
        projectDescription = escapeHtml(projectDescription)
        projectStatus = escapeHtml(projectStatus)
        projectType = escapeHtml(projectType)
        projectLevel = escapeHtml(projectLevel)
        projectVotes = escapeHtml(projectVotes)
        projectImage = escapeHtml(projectImage)
        projectStreak = projectStreak == null ? "No" : String(projectStreak) + "d"
        projectStreak = escapeHtml(projectStreak)
        projectFruit = escapeHtml(projectFruit)
        fruitSlug = escapeHtml(fruitSlug)
        let card = document.createElement("div")
        card.className = "group flex min-h-0 flex-col bg-parchment border-[3px] border-ds-brown/20 hover:border-ds-brown/60 cursor-pointer transition-colors"
        let cardContent = `
  <div
    class="relative aspect-[16/10] bg-ds-brown/10 overflow-hidden border-b-[3px] border-ds-brown/10">
    <img
      src="${projectImage}"
      alt="${projectName}"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy" />
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
        class="lucide w-3 h-3 text-ds-danger lucide-flame-icon lucide-flame w-3 h-3 text-ds-danger"
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
  <div class="flex flex-1 flex-col gap-2 p-3">
    <h3 class="text-base font-bold text-ds-brown leading-tight line-clamp-2">${projectName}</h3>
    <p class="text-xs text-ds-brown/70 leading-snug line-clamp-2">
      ${projectDescription}
    </p>
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
        return card
    }



    function prepareDashboard() {
        let mainContainer = getMainContainer()
        if (mainContainer) {
            mainContainer.style.overflowY = "auto"
            mainContainer.style.overflowX = "hidden"
        }

        let gameword = document.querySelector(".game-world")
        if (gameword) {
            gameword.hidden = true
        }
    }

    function renderProjects() {
        let mainContainer = getMainContainer()
        if (!mainContainer) { return }

        let projectsContainer = document.getElementById(customProjectsId)
        if (!projectsContainer) {
            projectsContainer = document.createElement("div")
            projectsContainer.id = customProjectsId
            projectsContainer.className = "relative z-10 mx-4 mt-28 mb-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max gap-4"
            mainContainer.appendChild(projectsContainer)
        }

        let projectsToRender = information.projects.length ? information.projects : placeholderProjects
        let projectsKey = projectsToRender.map(function(project) {
            return project.id || project.name || ""
        }).join("|")
        if (projectsKey === renderedProjectsKey && projectsContainer.children.length === projectsToRender.length) {
            return
        }
        renderedProjectsKey = projectsKey

        projectsContainer.replaceChildren()
        for (let i = 0; i < projectsToRender.length; i++) {
            projectsContainer.appendChild(projectCard(projectsToRender[i]))
        }
    }

    function syncDashboard() {
        if (location.pathname !== "/dashboard") { return }
        prepareDashboard()
        if (!didTryGetInfo) {
            setTimeout(getInfo, 3000)
        }
        renderProjects()
        doTopbarstuff()

    }
    function closePopup() {
        console.log("macondo: closing popup")

        let popup = document.getElementsByClassName("relative pl-5 pt-4 pr-6 pb-6 flex flex-col modal-frame relative w-full max-w-6xl mx-4 pointer-events-auto max-h-[90vh]")[0]
        if (!popup) {
            console.warn("macondo: popup not found; cannot close")
            return
        }

        let close_button = popup.getElementsByClassName("text-sm text-ds-brown flex items-center gap-1 hover:opacity-70 transition-opacity")[0]
        if (!close_button) {
            console.warn("macondo: popup close button not found")
            return
        }

        close_button.click()
    }
    function makepfp() {
        let pfpUrl = information.user && information.user.pfp ? information.user.pfp : defaultProfilePfp
        let existingPfp = document.getElementById("macondo-boringizer-pfp")
        if (existingPfp) {
            if (existingPfp.dataset.macondoProfileLinkReady !== "true") {
                let cleanPfp = existingPfp.cloneNode(true)
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


    // todo depracted
    function extractProjectFromElement(projectElement) {
        console.log("good morning officer", projectElement)
        let project = {
            id: 7878,
            name: "not found",
            plant: "not found",
            stage: "not found",
            description: "not found",
            img: "not found",
            type: "not found",
            status: "not found"
        }


        let projectHref = projectElement.href
        console.log("project href", projectHref)
        let id = String(projectHref).split("/")[4]
        project.id = id


        let nameelement = projectElement.children.at(-1)



        let imgimg = projectElement.children[0]
        let img = imgimg ? imgimg.src : null // todo check slack
        project.img = img

        console.log(project)
        return project
    }

    function getInfo() {
        didTryGetInfo = true
        let info = {
            "user": {
                "name": "not found",
                "pfp": defaultProfilePfp,
                "id": "not found"
            },
            "projects": []
        }

        function findImageUrl(value) {
            if (!value) { return null }
            if (typeof value === "string") {
                if (/^https?:\/\/.+\.(webp|png|jpe?g|gif)(\?.*)?$/i.test(value) || value.includes("cachet.dunkirk.sh") || value.includes("l4.dunkirk.sh")) {
                    return value
                }
                return null
            }
            if (Array.isArray(value)) {
                for (let item of value) {
                    let found = findImageUrl(item)
                    if (found) { return found }
                }
                return null
            }
            if (typeof value === "object") {
                let likelyKeys = ["pfp", "avatar", "avatarUrl", "avatar_url", "image", "imageUrl", "image_url", "photo", "photoUrl", "photo_url", "picture"]
                for (let key of likelyKeys) {
                    let found = findImageUrl(value[key])
                    if (found) { return found }
                }
                for (let key of Object.keys(value)) {
                    let found = findImageUrl(value[key])
                    if (found) { return found }
                }
            }
            return null
        }

        fetch("/api/auth/me", { credentials: "include" })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("auth/me returned " + response.status)
                }
                return response.json()
            })
            .then(function (userInfo) {
                info.user.name = userInfo.name || info.user.name
                info.user.id = userInfo.id || info.user.id
                let pfp = findImageUrl(userInfo)
                if (pfp) {
                    info.user.pfp = pfp
                    
                } else {
                    console.warn("macondo: no profile image found in /api/auth/me; using default profile")
                }
                information = info
                doTopbarstuff()
                if (!info.user.id || info.user.id === "not found") {
                    throw new Error("auth/me did not return user id")
                }
                return fetch(`api/users/${info.user.id}`, { credentials: "include" })
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("api/projects returned " + response.status)
                }
                return response.json()
            })
            .then(function(projectsData) {
                info.projects = projectsData.projects || []
                information = info
                renderProjects()
            })
            .catch(function(error) {
                console.warn("macondo: could not fetch profile/projects info; using default", error)
                information = info
                doTopbarstuff()
            })

        console.log(info)
        return info
    }

    function isProfileModalOpen() {
        return !!document.querySelector(".modal-frame")
    }

    function findProfileOpener() {
        return Array.from(document.querySelectorAll("button")).find(function(button) {
            return button.textContent.trim() === "Open your profile"
        })
    }

    function openProfilePopup(event, iNEEDTHEFUCKINGOPOPUP, invisible) {
        if (event && (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) {
            return
        }

        if (event) {
            event.preventDefault()
        }

        console.log("macondo: opening profile popup")
        if (isProfileModalOpen()) { return }

        let gameWorld = document.querySelector(".game-world")
        let oldGameWorldState = null
        if (gameWorld) {
            oldGameWorldState = {
                hidden: gameWorld.hidden,
                opacity: gameWorld.style.opacity,
                pointerEvents: gameWorld.style.pointerEvents
            }
            gameWorld.hidden = false
            gameWorld.style.opacity = "0"
            gameWorld.style.pointerEvents = "none"
        }

        let opener = findProfileOpener()
        if (!opener) {
            console.warn("macondo: profile opener not found; going to profile page")
            window.location.assign("/profile")
            return
        }

        function restoreGameWorldForModal() {
            if (!gameWorld || !oldGameWorldState) { return }
            gameWorld.style.opacity = oldGameWorldState.opacity
            gameWorld.style.pointerEvents = oldGameWorldState.pointerEvents
        }

        function restoreGameWorldAfterFailure() {
            if (!gameWorld || !oldGameWorldState) { return }
            gameWorld.hidden = oldGameWorldState.hidden
            gameWorld.style.opacity = oldGameWorldState.opacity
            gameWorld.style.pointerEvents = oldGameWorldState.pointerEvents
        }

        opener.click()
        setTimeout(function() {
            if (isProfileModalOpen()) {
                restoreGameWorldForModal()
                return
            }

            restoreGameWorldAfterFailure()

            console.warn("macondo: profile popup did not open; going to profile page")
            if (!iNEEDTHEFUCKINGOPOPUP) {
                window.location.assign("/profile")
            }
        }, 400)
    }

    function doTopbarstuff() {
        let topbar = document.getElementById("macondo-boringizer-topbar") || document.getElementsByClassName("absolute top-0 left-0 right-0 z-[100] pointer-events-none")[0]
        if (!topbar) { console.error("boring: topbar not found! ID:1s9f8g"); return }

        topbar.id = "macondo-boringizer-topbar"

        topbar.classList.remove("absolute")
        topbar.classList.remove("pointer-events-none")

        let leftside = topbar.children[0].children[0]
        leftside.id = "macondo-boringizer-leftside"

        let pfp = makepfp()
        if (pfp.parentElement !== leftside) {
            leftside.appendChild(pfp)
        }

    }

    syncDashboard()

    let syncTimeout
    window.macondo.homepagethingObserver = new MutationObserver(function() {
        clearTimeout(syncTimeout)
        syncTimeout = setTimeout(syncDashboard, 50)
    })
    window.macondo.homepagethingObserver.observe(document.body, {
        childList: true,
        subtree: true
    })
}

window.addEventListener('pageChange', function() {
    setTimeout(homepagething, 200)
});

setTimeout(homepagething, 200)
// todo open the project thing
