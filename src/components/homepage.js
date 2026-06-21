function betterShop() {
    window.HCTG = window.HCTG || {}
    if (location.pathname !== "/dashboard") { return }
    console.log("HCTG+: betterShop running")
    // if (!window.HCTG.datapage) {
    //     console.error("HCTG: datapage not found! ID:1s9f8g")
    //     return
    // }


    // get projects
    // let projectContainer = document.getElementById("projects")
    // let projects = {}

    // for (let project of projectContainer.children) {
    //     // get id


    // }
    
    let NUXT_DATA = document.getElementById("__NUXT_DATA__")
    if (!NUXT_DATA) {
        console.error("HCTG: NUXT_DATA not found! ID:1s9f8g")
        return
    }
    let data = JSON.parse(NUXT_DATA.innerHTML)
    console.log("hello", data)

    let notshits = {}
    let projectbuffer = {}
    let projectSchema = {
        "id": Number,
        "title": String,
    }


    for (let i = 0; i < data.length; i++) {
        let shit = data[i]
        if (Number.isInteger(shit) && shit > 0 && typeof data[i + 1] === "string") {
            notshits[shit] = data.slice(i + 1, i + 7)
        }
    }

    console.log("notshits: ", notshits)
}

window.addEventListener('pageChange', function() {
    setTimeout(betterShop, 200)
});

setTimeout(betterShop, 200)