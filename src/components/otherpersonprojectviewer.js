function projectViewer() {
  if (location.pathname !== "/me") {
    return
  }
  const queryParams = new URLSearchParams(window.location.search)
  let projectidtoview = Object.fromEntries(queryParams).projectId
  if (!projectidtoview) {
    if (Object.fromEntries(queryParams).projectobj) {
      projectidtoview = 676767
    }
  }
  let isViewHash = location.hash === "#view"
  if (!isViewHash) {
    return
  }
  console.log("HCTG+: projectViewer running")
  window.HCTG = window.HCTG || {}

  if (!document.getElementById("HCTGplus-projectviewer-styles")) {
    let style = document.createElement("style")
    style.id = "HCTGplus-projectviewer-styles"
    style.textContent = `
          [data-hctg-action-btn="true"] img { filter: invert(1); }
          [data-hctg-action-btn="true"]:hover img { filter: invert(0); }
        `
    document.head.appendChild(style)
  }

  function prepareforcustomsite(titlee) {
    // change title
    let title = document.getElementsByClassName(
      "text-[48px] font-bold tracking-[-0.06em] text-nowrap text-white smoothing-white",
    )[0]
    if (!title) {
      console.warn(
        "HCTG: could not find project title div! prob not on the project page ID: 9s8f7g",
      )
      return null
    }
    title.textContent = titlee

    let oldcontent = document.getElementsByClassName("grid grid-cols-1 md:grid-cols-2")[0]
    if (!oldcontent) {
      console.warn("HCTG: could not find old content container. ID: 4jv1mn")
      return null
    }
    oldcontent.remove()

    let containerx = document.getElementsByClassName(
      "relative -ml-2 h-screen w-full flex-1 overflow-y-scroll px-6 py-10",
    )[0]
    if (!containerx) {
      console.warn("HCTG: could not find page container. ID: a2q7kp")
      return null
    }
    let container = document.createElement("div")
    container.className = "flex flex-col gap-10 px-6 py-8 xl:px-24 xl:py-16"
    containerx.appendChild(container)
    return container
  }

  function formattime(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    const formatted = `${hours}h ${minutes}m`
    return formatted // shi prob in 3 different components lowkey
  }

  function getIconURL(iconName) {
    return "chrome-extension://" + chrome.runtime.id + "/icons/" + iconName
  }

  if (!projectidtoview) {
    alert("What are you doing buddy?")
    return
  }

  function dqnidnqwi(project) {
    let highqualelement = ""
    if (project.high_quality) {
      highqualelement = `<span class="absolute top-2 right-3 text-sm font-bold text-[#fecb0d]">★ High quality</span>`
    }
    // let hoursicon =
    //   "https://cdn.hackclub.com/019de636-d32a-7609-b39f-2dec623649f2/hours.svg"
    let hoursicon =
      getIconURL("hours.svg")
    let repoicon =
      getIconURL("repo.svg")
    let demoicon =
      getIconURL("demo.svg")
    let readmeicon =
      getIconURL("readme.svg")
    //// done: host on hc cdn
    // done: instead of hosting it just host it locally

    let projectcard = document.createElement("div")
    projectcard.innerHTML = `
          <div class="flex h-full flex-col col-span-full" id="HCTGplus-project" data-hctg-project-id="${project.id}" style="display: block;">
            <div class="relative h-8 rounded-tl-2xl rounded-tr-2xl bg-black">
              ${highqualelement}
              <div class="absolute top-2 left-5 flex gap-1.5" style="left: 0.5rem; top: 0.5rem;">
                <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20448%20512%22%3E%3C!--!Font%20Awesome%20Free%20v7.2.0%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%2Ffree%20Copyright%202026%20Fonticons%2C%20Inc.--%3E%3Cpath%20d%3D%22M192%200c-35.3%200-64%2028.7-64%2064l0%20256c0%2035.3%2028.7%2064%2064%2064l192%200c35.3%200%2064-28.7%2064-64l0-200.6c0-17.4-7.1-34.1-19.7-46.2L370.6%2017.8C358.7%206.4%20342.8%200%20326.3%200L192%200zM64%20128c-35.3%200-64%2028.7-64%2064L0%20448c0%2035.3%2028.7%2064%2064%2064l192%200c35.3%200%2064-28.7%2064-64l0-16-64%200%200%2016-192%200%200-256%2016%200%200-64-16%200z%22%2F%3E%3C%2Fsvg%3E" class="w-4 invert hover:pink cursor-pointer" title="">
                <span class="text-[#ffffff] text-sm font-bold invert items-center">${project.id}</span>
              </div>
            </div>
            <div class="flex flex-1 flex-col rounded-br-2xl rounded-bl-2xl border-2 border-t-0 border-black bg-white px-6 py-4">
              <img alt="${project.title}" class="mb-4 w-full object-contain h-64" src="${project.screenshot}?disposition=inline">
              <div class="flex items-start justify-between gap-6">
                <h2 class="smoothing-black text-4xl font-bold tracking-[-0.03em]">${project.title}</h2>
                <div class="flex items-center gap-1.5">
                  <img alt="Hours" class="h-5 w-5" src="${hoursicon}">
                  <span class="smoothing-black text-2xl tracking-[-0.03em]">${formattime(project.approved_seconds)}</span>
                </div>
                
              </div>
              <p class="smoothing-gray text-xl text-gray-600">by <a href="javascript:void(0)" onclick="alert('coming soon') //TODO ">${project.username}</a></p>
              <p class="smoothing-black mt-2 text-xl tracking-[-0.02em]">${project.desc}</p>
              <div class="mt-auto">
                <div class="mt-4 flex items-center gap-2">
                    <a href="${project.demo_link}" data-hctg-action-btn="true" class="group smoothing-white justify-center w-full mt-4 flex gap-3 cursor-pointer bg-black px-5 py-3 items-center text-xl font-bold tracking-tight text-white transition-colors hover:bg-[#fecb0d] hover:text-black">
                      <img src="${demoicon}" class="w-4">
                        Demo
                    </a>
                    <a href="${project.repo_link}" data-hctg-action-btn="true" class="group smoothing-white justify-center w-full mt-4 flex gap-3 cursor-pointer bg-black px-5 py-3 items-center text-xl font-bold tracking-tight text-white transition-colors hover:bg-[#fecb0d] hover:text-black">
                      <img src="${repoicon}" class="w-4">
                        Repository
                    </a>
                    <a href="${project.repo_link + "/blob/main/README.md"}" data-hctg-action-btn="true" class="group smoothing-white justify-center w-full mt-4 flex gap-3 cursor-pointer bg-black px-5 py-3 items-center text-xl font-bold tracking-tight text-white transition-colors hover:bg-[#fecb0d] hover:text-black" >
                      <img src="${readmeicon}" class="w-4">
                        Readme
                    </a>
                </div>
              </div>
            </div>
          </div>
        `

    mainContainer.appendChild(projectcard)
  }

  function addComments(projectId) {
    // Remove existing giscus iframe if present
    let existing = document.getElementById("giscus-container")
    if (existing) existing.remove()

    let container = document.createElement("iframe")
    container.id = "giscus-container"
    container.style.width = "100%"
    container.style.height = "600px"
    container.style.border = "none"
    container.src = chrome.runtime.getURL("comments.html") + "?project=" + encodeURIComponent(projectId)
    mainContainer.appendChild(container)

    if (!window.__hctgCommentsHeightListener) {
      window.__hctgCommentsHeightListener = (event) => {
        const currentContainer = document.getElementById("giscus-container")
        if (!currentContainer || event.source !== currentContainer.contentWindow) return

        if (!event.data || event.data.type !== "giscus-height") return

        const nextHeight = Number.parseInt(event.data.height, 10)
        if (Number.isFinite(nextHeight) && nextHeight > 0) {
          currentContainer.style.height = `${nextHeight}px`
        }
      }
      window.addEventListener("message", window.__hctgCommentsHeightListener)
    }
  }
  // let project = { // first project i saw and also a good example
  //     // TODO: get other proejcs ad not hard code it
  //     "id": 14,
  //     "aasm_state": "approved",
  //     "approved_at": "2026-03-09T16:32:47.251Z",
  //     "demo_link": "https://aregus.me",
  //     "desc": "its my own website :P",
  //     "rejected_at": null,
  //     "repo_link": "https://github.com/Areg472/my-portfolio",
  //     "submitted_at": "2026-02-14T15:24:06.991Z",
  //     "title": "My portfolio",
  //     "ysws": null,
  //     "created_at": "2026-01-17T07:28:09.232Z",
  //     "updated_at": "2026-03-09T16:32:47.267Z",
  //     "user_id": 44,
  //     "high_quality": true,
  //     "ai_declaration": null,
  //     "reported_seconds": 3439,
  //     "total_seconds": null,
  //     "approved_seconds": 3439,
  //     "real_approved_seconds": 3439,
  //     "hackatime_projects": [
  //         335
  //     ],
  //     "tags": [],
  //     "status": "Approved on 2026-03-09",
  //     "unread_notification_count": 0,
  //     "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6ODIsInB1ciI6ImJsb2JfaWQifX0=--85063a9fc08aad981fba5fcf347669d71e77bf62/Screenshot%202026-02-14%20at%2019-23-49%20Areg.png?disposition=inline",
  //     "username": "Areg (Արեգ)"
  // }

  // find the project
  let project = null
  if (projectidtoview !== 676767) { // check for override
    
    let galleryprojects = null
    let rawGalleryCache = localStorage.getItem("hctg-gallery-cache")
    if (rawGalleryCache) {
      try {
        let parsedCache = JSON.parse(rawGalleryCache)
        if (Array.isArray(parsedCache)) {
          galleryprojects = parsedCache
        } else if (parsedCache && Array.isArray(parsedCache.projects)) {
          galleryprojects = parsedCache.projects
        }
      } catch (error) {
        console.warn("HCTG: invalid gallery cache, clearing it. ID: 8r3jwy")
        localStorage.removeItem("hctg-gallery-cache")
      }
    }

    if (!galleryprojects) {
      alert("need to go to gallery page")
      return
    }

    let projectIdAsNumber = Number(projectidtoview)
    for (let galleryproject of galleryprojects) {
      if (galleryproject.id === projectidtoview || galleryproject.id === projectIdAsNumber) {
        project = galleryproject
        break
      }
    }
    if (!project) {
      alert("not found :(")
      return
    }
  } else {
    project = decodeURIComponent(Object.fromEntries(queryParams).projectobj)
    project = JSON.parse(project)
  }

  let mainContainer = prepareforcustomsite("Project")
  if (!mainContainer) {
    return
  }

  console.log(project)
  dqnidnqwi(project)
  addComments(project.id)
}

window.addEventListener("pageChange", function () {
  setTimeout(projectViewer, 200)
})

projectViewer()
