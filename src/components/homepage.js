function betterShop() {
    window.HCTG = window.HCTG || {}
    if (location.pathname !== "/dashboard") { return }
    console.log("HCTG+: betterShop running")
    // if (!window.HCTG.datapage) {
    //     console.error("HCTG: datapage not found! ID:1s9f8g")
    //     return
    // }


    
    function openProjectPopup(project) {
        console.log("HCTG: opening project popup")
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
        
}

window.addEventListener('pageChange', function() {
    setTimeout(betterShop, 200)
});

setTimeout(betterShop, 200)