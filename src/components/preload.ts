// simply asl

// async bc its not gonna be used for shit, only for caching type shi
async function preloadShop() {
    fetch("https://macondo.hackclub.com/api/shop/items", {
        method: "GET",
        mode: "cors",
        credentials: "include",
    })
}

async function preloadExplore() {
    fetch("https://macondo.hackclub.com/api/explore/events?limit=24", {
        method: "GET",
        mode: "cors",
        credentials: "omit",
    })
    fetch("https://macondo.hackclub.com/api/explore/projects?sort=recently_updated&status=shipped&limit=24", {
        method: "GET",
        mode: "cors",
        credentials: "omit",
    })
}


export async function preload() {
    console.log("preloading")
    // defaults to yeah
    const preloadingshop = localStorage.getItem("boringizer-preloading-shop") == "false" ? false : true 
    // defaults to nah
    const preloadingexplore = localStorage.getItem("boringizer-preloading-explore") == "true" ? true : false
    // todo: place them fuckers in the setting and also finish that
    
    if (preloadingshop) {preloadShop()}
    if (preloadingexplore) {preloadExplore()}

}