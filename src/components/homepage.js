function homepagething() {
    window.macondo = window.macondo || {}
    if (location.pathname !== "/dashboard") { return }
    if (window.macondo.homepagethingObserver) { return }
    console.log("macondo+: homepagething running")
    // if (!window.macondo.datapage) {
    //     console.error("macondo: datapage not found! ID:1s9f8g")
    //     return
    // }


    
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
    let didTryGetInfo = false

    function getMainContainer() {
        return document.getElementsByClassName("fixed inset-0 overflow-hidden bg-parchment")[0]
    }

    function getProjects() {
        function openProjectPopup(project) {
            console.log("macondo: opening project popup")
            project.click()
        }
    
        function dowierdprojectmagic(project) {
            openProjectPopup(project)
        }
        // get projects
        let projectContainer = document.getElementById("projects")
        let projects = {}
        for (let project of projectContainer.children) {
            dowierdprojectmagic(project)
            break
        }
        // todo: skid this https://github.com/hridaya423/macondoutils/blob/main/content.js#L1459
        // todo: investigate https://macondo.hackclub.com/api/profile/streaks
        // maybe works without anything funky? just a fetch?
    }


    let projectSchema = {
        "name": String,
        "author": String,
        "description": String,
        "status": ""
    }

    function projectCard(project) {
        let card = document.createElement("div")
        card.className = "group flex min-h-0 flex-col bg-parchment border-[3px] border-ds-brown/20 hover:border-ds-brown/60 cursor-pointer transition-colors"
        let cardContent = `
  <div
    class="relative aspect-[16/10] bg-ds-brown/10 overflow-hidden border-b-[3px] border-ds-brown/10">
    <img
      src="https://cdn.hackclub.com/019e83fe-d2d9-70e3-ace2-68fc80d4b1d6/Screenshot%202026-06-01%20192216.png"
      alt="adventure time"
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
      36d streak
    </div>
    <div
      class="absolute top-2 right-2 w-8 h-8 bg-parchment/95 border-2 border-ds-brown flex items-center justify-center"
      title="Papaya">
      <img
        src="/images/fruits/papaya/icon_interior.webp"
        alt="Papaya"
        class="w-5 h-5 object-contain" />
    </div>
    <!---->
  </div>
  <div class="flex flex-1 flex-col gap-2 p-3">
    <h3 class="text-base font-bold text-ds-brown leading-tight line-clamp-2">adventure time</h3>
    <p class="text-xs text-ds-brown/70 leading-snug line-clamp-2">
      ِA 2D Action &amp; Adventure RPG
    </p>
    <div class="flex items-center justify-between gap-2 mt-1">
      <button
        type="button"
        class="flex items-center gap-2 min-w-0 hover:opacity-70 transition-opacity">
        <div class="w-6 h-6 rounded-full overflow-hidden border-2 border-ds-brown/40 shrink-0">
          <img
            src="https://l4.dunkirk.sh/i/5DjfoBI58Pfw.webp"
            alt="Levi"
            class="w-full h-full object-cover" />
        </div>
        <span class="text-xs text-ds-brown/80 truncate">Levi</span>
      </button>
      <div class="flex items-center gap-1 shrink-0">
        <span
          class="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-ds-success text-parchment">
          Shipped
        </span>
        <span
          class="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-ds-brown/10 text-ds-brown/80">
          software
        </span>
        <span
          class="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-ds-brown/10 text-ds-brown/80">
          L3
        </span>
      </div>
    </div>
    <div class="flex items-center justify-between gap-2 mt-auto pt-2 border-t-2 border-ds-brown/10">
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
        <span class="tabular-nums">8</span>
      </button>
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
        if (!mainContainer || document.getElementById(customProjectsId)) { return }

        let projectsContainer = document.createElement("div")
        projectsContainer.id = customProjectsId
        projectsContainer.className = "relative z-10 mx-4 mt-28 mb-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max gap-4"
        for (let i = 0; i < 5; i++) {
            projectsContainer.appendChild(projectCard())
        }
        mainContainer.appendChild(projectsContainer)
    }

    function syncDashboard() {
        if (location.pathname !== "/dashboard") { return }
        prepareDashboard()
        if (!didTryGetInfo) {
            getInfo()
        }
        renderProjects()
        doTopbarstuff()
        
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
        pfp.style.order = "-1"

        let img = document.createElement("img")
        img.src = pfpUrl
        img.alt = "Profile"
        img.className = "w-full h-full object-cover"

        pfp.appendChild(img)
        return pfp

    }

    function getInfo() {
        didTryGetInfo = true
        let info = {
            "user": {
                "name": "not found",
                "pfp": defaultProfilePfp
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
            .then(function(userInfo) {
                let pfp = findImageUrl(userInfo)
                if (pfp) {
                    info.user.pfp = pfp
                } else {
                    console.warn("macondo: no profile image found in /api/auth/me; using default profile")
                }
                information = info
                doTopbarstuff()
            })
            .catch(function(error) {
                console.warn("macondo: could not fetch profile info; using default profile", error)
                information = info
                doTopbarstuff()
            })

        return info
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
