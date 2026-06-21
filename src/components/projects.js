function makeProjectsBetter() {
    window.HCTG = window.HCTG || {}
    if (!window.HCTG.economics) { return }

    if (window.location.pathname !== "/projects") { return } // zero clue why i added this

    if (!window.HCTG.datapage.props.projects || window.HCTG.datapage.url === "/explore") {
        console.warn("HCTG+: need to refresh cuz of the datapage shinanigans.... ")
        location.reload()
        return
    }

    let projectscontainer = null
    let possibleprojectscontainers = document.getElementsByClassName("grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3")
    // TODO: only one, but still need to fix
    projectscontainer = possibleprojectscontainers[0]

    // link the id to each project card
    let projects = window.HCTG.datapage.props.projects
    for (let card of projectscontainer.children) {
        let cardID = card.href.split("/projects/")[1].trim()
        cardID = cardID.split("/manage")[0].trim() // in case there are any trailing slashes or something
        if (cardID !== "new") {
            console.log("HCTG+: cardID:", cardID)
            for (let project of projects) {
                if (project.id == cardID) {
                    card.id = "hctg-project-" + projects.indexOf(project)
                    card.setAttribute("data-hctg-project-id", projects.indexOf(project))
                    break
                }
            }
        }
    }


    for (let card of projectscontainer.children) {
        let projectid = card.getAttribute("data-hctg-project-id")
        let project = projects[projectid]
        let cardbg = card.children[1]
        let cardpic = card.children[0].children[0]  
        console.log(project)

        // Force a clean white base so cards never look gray.
        cardbg.style.setProperty("background-color", "#ffffff", "important")
        cardbg.style.setProperty("background-image", "none", "important")
        cardbg.style.setProperty("background-repeat", "no-repeat", "important")
        cardbg.style.boxShadow = "none"

        if (project && project.aasm_state === "approved") {
            
            cardbg.classList.remove("border-black")
            cardbg.style.borderColor = "#86efac"
            cardpic.classList.remove("border-black")
            cardpic.style.borderColor = "#86efac"
            
            cardbg.style.setProperty("background-color", "#ffffff", "important")
            cardbg.style.setProperty("background-image", "linear-gradient(145deg, #ffffff 0%, #f3fdf7 48%, #dcfce7 100%)", "important")
            cardbg.style.setProperty("background-repeat", "no-repeat", "important")
            cardbg.style.boxShadow = "inset 0 0 0 1px rgba(134, 239, 172, 0.45), inset 0 0 18px rgba(134, 239, 172, 0.28)"
        }
    }

}

window.addEventListener('pageChange', function() {
    setTimeout(makeProjectsBetter, 100)
});

window.addEventListener('hctg:dataReady', function() {
    setTimeout(makeProjectsBetter, 0)
});

makeProjectsBetter()
