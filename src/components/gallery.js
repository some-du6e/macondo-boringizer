function galleryBetter() {
    if (location.pathname !== "/explore") { return }
    console.log("HCTG+: galleryBetter running")
    window.HCTG = window.HCTG || {}

    let now = new Date()



    let newcache = {
        "projects": null,
        "date": now
    }

    // get projects and cache them
    let datapage = window.HCTG.datapage
    
    // check if the datapage is old
    if (datapage.url !== "/explore") {
        console.warn("need to refresh")
        location.reload()
    }
    let projects = datapage.props.projects


    
    newcache.projects = projects

    // console.log(newcache)
    localStorage.setItem("hctg-gallery-cache", JSON.stringify(newcache))
    console.log("HCTG+: saved gallery cache")




    // add a link to the project(s)
    let projectscontainer = document.getElementsByClassName("grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3")[0]
    projectscontainer.id = "gallery-projects-container"
    let renderedprojects = projectscontainer.children

    for (let renderedproject of renderedprojects) {
        let projectid = null
        let renderedprojectimgurl = renderedproject.children[0].children[0].src
        for (let project2 of projects) {
            if (renderedprojectimgurl.endsWith(project2.screenshot)) {
                projectid = project2.id
                break
            }
        }
        // console.log(projectid)

        projectid = String(projectid)
        renderedproject.setAttribute("hctg-public-project-id", projectid)
        let projecturl = `/me?projectId=${projectid}#view`
        renderedproject.href = projecturl

    }


}

// window.addEventListener('pageChange', function() {
//     setTimeout(galleryBetter, 200)
// });
// retiring this for a bit since they officially added gallery stuff

// galleryBetter()
