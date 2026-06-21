function betterLander() {
    if (location.pathname !== "/") { return }
    console.log("HCTG+: betterLander running")

    // check if we are really on the lander
    let title = document.getElementsByClassName("flex w-full flex-col border-t-30 border-r-4 border-b-4 border-l-4 border-solid border-[#383636] bg-white lg:flex-row text-[#383636]")[0]
    if (!title) {
        console.warn("HCTG: could not find lander title div! prob not on the lander ID: WDZE8G")
        return
    }
    
    // check for smth else rq
    if (title.children[0].className !== "flex items-center justify-center bg-white px-6 py-6 lg:border-r-0") {
        console.warn("HCTG: lander title div does not have expected children! prob not on the lander ID: 9s8f7g")
        return
    }

    ///// done: check this better 
    // it doesnt have to be perfect
    let ohiogubby = document.getElementsByClassName("mt-4 flex h-20 w-full flex-col gap-2 sm:flex-row lg:gap-3")[0]
    if (!ohiogubby) {
        console.warn("HCTG: could not find ohiogubby div! prob not on the lander ID: EQBH7g")
        return
    }

    let getstartedbutton = ohiogubby.children[1]

    let loginbutton = getstartedbutton.cloneNode(true)
    const changeTag = window.HCTG?.utils?.changeTag
    if (typeof changeTag === "function") {
        loginbutton = changeTag(loginbutton, "a")
    } else {
        console.warn("HCTG: changeTag helper missing; using direct <a> conversion")
        const fallbackAnchor = document.createElement("a")
        for (const attr of loginbutton.attributes) {
            fallbackAnchor.setAttribute(attr.name, attr.value)
        }
        while (loginbutton.firstChild) {
            fallbackAnchor.appendChild(loginbutton.firstChild)
        }
        loginbutton = fallbackAnchor
    }
    loginbutton.children[1].innerText = "Log in"
    // change le icon
    let loginicon = loginbutton.children[0]
    // flip it
    loginicon.style.setProperty("transform", "rotate(180deg)", "important")
    let url = "/auth/hca"
    loginbutton.href = url
    loginbutton.type = null
    

    ohiogubby.appendChild(loginbutton)
}

window.addEventListener('pageChange', function() {
    setTimeout(betterLander, 200)
});

betterLander()
