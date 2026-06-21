function makeSidebarBetter() {
    window.HCTG = window.HCTG || {}
    if (!window.HCTG.economics) { return }

    // if (window.location.pathname !== "/projects") { return } // zero clue why i added this

    // slip in the hours
    // done: see if dollars can be fitted in (prob too cramped)
    // ^ only 2 looks like trash but 3 is ok
    let statsdiv = null
    let possiblestatsdivs = document.getElementsByClassName("flex items-center justify-between")
    for (let div of possiblestatsdivs) {
        const leftCell = div.children[0]
        if (
            leftCell &&
            leftCell.classList?.contains("flex") &&
            leftCell.classList?.contains("items-center") &&
            leftCell.classList?.contains("gap-1.5")
        ) {
            statsdiv = div
            break
        }
    }
    if (!statsdiv) {
        console.error("HCTG: could not find icons div! ID: 9s8f7g")
        return
    }

    let littlestatsdiv = null
    let possiblelittlestatsdivs = document.getElementsByClassName("flex items-center justify-between")
    for (let div of possiblelittlestatsdivs) {
        if (div.children[0].className === "flex items-center gap-1.5") {
            littlestatsdiv = div
            break
        }
    }

    let tokensdiv = statsdiv.children[0]
    if (!tokensdiv) { return }
    // make the tokens more persice
    let wabisabitokens = window.HCTG.hours.approvedSeconds
    wabisabitokens = wabisabitokens / 3600 
    wabisabitokens = Math.round(wabisabitokens * 100) / 100

    // bro trust this works
    let difference = wabisabitokens - window.HCTG.economics.tokens
    difference = Math.trunc(difference)
    console.log("HCTG+: diff: ",difference)

    wabisabitokens = wabisabitokens - difference
    tokensdiv.children[1].textContent = wabisabitokens

    let hoursdiv = statsdiv.querySelector('[data-hctg-stat="hours"]') || tokensdiv.cloneNode(true)
    // prob a bad idea but the site uses it so idc
    let hoursdivicon = "data:image/svg+xml,%3csvg%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Clock%20Icon'%20d='M8%200C12.4184%200%2016%203.5816%2016%208C16%2012.4184%2012.4184%2016%208%2016C3.5816%2016%200%2012.4184%200%208C0%203.5816%203.5816%200%208%200ZM8%203.2C7.78783%203.2%207.58434%203.28429%207.43431%203.43431C7.28429%203.58434%207.2%203.78783%207.2%204V8C7.20005%208.21216%207.28436%208.41561%207.4344%208.5656L9.8344%2010.9656C9.98528%2011.1113%2010.1874%2011.192%2010.3971%2011.1901C10.6069%2011.1883%2010.8075%2011.1042%2010.9559%2010.9559C11.1042%2010.8075%2011.1883%2010.6069%2011.1901%2010.3971C11.192%2010.1874%2011.1113%209.98528%2010.9656%209.8344L8.8%207.6688V4C8.8%203.78783%208.71571%203.58434%208.56569%203.43431C8.41566%203.28429%208.21217%203.2%208%203.2Z'%20fill='var(--fill-0,%20black)'/%3e%3c/svg%3e"
    hoursdiv.children[1].textContent = window.HCTG.economics.totalHours ?? window.HCTG.economics.hours ?? 0
    hoursdiv.children[0].src = hoursdivicon
    hoursdiv.dataset.hctgStat = "hours"


    let dollardiv = statsdiv.querySelector('[data-hctg-stat="usd"]') || tokensdiv.cloneNode(true)
    let dollardivicon = "data:image/svg+xml,%3csvg%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='80%2064%20480%20512'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M392%20176L248%20176L210.7%20101.5C208.9%2097.9%20208%2093.9%20208%2089.9C208%2075.6%20219.6%2064%20233.9%2064L406.1%2064C420.4%2064%20432%2075.6%20432%2089.9C432%2093.9%20431.1%2097.9%20429.3%20101.5L392%20176zM233.6%20224L406.4%20224L455.1%20264.6C521.6%20320%20560%20402%20560%20488.5C560%20536.8%20520.8%20576%20472.5%20576L167.4%20576C119.2%20576%2080%20536.8%2080%20488.5C80%20402%20118.4%20320%20184.9%20264.6L233.6%20224zM324%20288C313%20288%20304%20297%20304%20308L304%20312C275.2%20312.3%20252%20335.7%20252%20364.5C252%20390.2%20270.5%20412.1%20295.9%20416.3L337.6%20423.3C343.6%20424.3%20348%20429.5%20348%20435.6C348%20442.5%20342.4%20448.1%20335.5%20448.1L280%20448C269%20448%20260%20457%20260%20468C260%20479%20269%20488%20280%20488L304%20488L304%20492C304%20503%20313%20512%20324%20512C335%20512%20344%20503%20344%20492L344%20487.3C369%20483.2%20388%20461.6%20388%20435.5C388%20409.8%20369.5%20387.9%20344.1%20383.7L302.4%20376.7C296.4%20375.7%20292%20370.5%20292%20364.4C292%20357.5%20297.6%20351.9%20304.5%20351.9L352%20351.9C363%20351.9%20372%20342.9%20372%20331.9C372%20320.9%20363%20311.9%20352%20311.9L344%20311.9L344%20307.9C344%20296.9%20335%20287.9%20324%20287.9z'%20fill='var(--fill-0,%20black)'/%3e%3c/svg%3e"
    
    dollardiv.children[1].textContent = window.HCTG.economics.USD ?? 0
    dollardiv.children[0].src = dollardivicon
    dollardiv.dataset.hctgStat = "usd"
    // good enough order
    // tokens, dollars, hours
    if (!hoursdiv.isConnected) {
        statsdiv.insertBefore(hoursdiv, statsdiv.children[1] ?? null)
    }
    if (!dollardiv.isConnected) {
        statsdiv.insertBefore(dollardiv, statsdiv.children[1] ?? null)
    }



    ////// / // / / // / // / / // / / / /
    // make that shi prettier
    const actionButton = document.querySelector('button[title="Logout"], a[title="Notifications"], a[title="Settings"]')
    const stuffdiv = actionButton?.closest('div')
    if (!stuffdiv) {
        console.error("HCTG: could not find actions div! ID: h5d0zt")
        return
    }
    // make the icon thing with the logout stuff vertical
    stuffdiv.className = "flex items-center gap-0.5 flex-col"

    const cardRoot = stuffdiv.closest('.rounded-2xl')
    const tempthingidkhowtocall = cardRoot?.querySelector('.flex.items-center.gap-3')
    if (!tempthingidkhowtocall) {
        console.error("HCTG: could not find header row! ID: 3a6jqn")
        return
    }

    if (stuffdiv.parentElement !== tempthingidkhowtocall) {
        tempthingidkhowtocall.appendChild(stuffdiv)
    }

    // make the statsdiv not spaced out asl
    statsdiv.className = "flex items-center gap-2"
    // fix the hours cuz it looks really squished
    hoursdiv.children[1].className = "smoothing-black text-xl tracking-[-0.025em]"


    /////////
    // goals
    let possiblenavbars = document.getElementsByClassName("relative z-10 mt-6 flex flex-col gap-[40px]")
    let navbar = null
    for (let possibility of possiblenavbars) {
        if (possibility.tagName === "NAV") {
            navbar = possibility
            break
        }
    }

    let lastitem = navbar.children[navbar.children.length - 1]
    
    let goalstab = lastitem.cloneNode(true)

    let goalstabtitle = goalstab.children[0].children[1].children[0]
    let goalstabicon = goalstab.children[0].children[0].children[0].children[0]
    goalstabtitle.innerText = "Goals"
    goalstabtitle.classList.remove("text-black", "smoothing-black")
    goalstabtitle.classList.add("text-white", "smoothing-white")

    goalstabicon.src = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3C!--!Font%20Awesome%20Free%20v7.2.0%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%2Ffree%20Copyright%202026%20Fonticons%2C%20Inc.--%3E%3Cpath%20d%3D%22M448%20256a192%20192%200%201%200%20-384%200%20192%20192%200%201%200%20384%200zM0%20256a256%20256%200%201%201%20512%200%20256%20256%200%201%201%20-512%200zm256%2080a80%2080%200%201%200%200-160%2080%2080%200%201%200%200%20160zm0-224a144%20144%200%201%201%200%20288%20144%20144%200%201%201%200-288zM224%20256a32%2032%200%201%201%2064%200%2032%2032%200%201%201%20-64%200z%22%2F%3E%3C%2Fsvg%3E"
    
    goalstab.href = "/me#goals"
    navbar.appendChild(goalstab)


    // color it in if we are in the goals tab
    if (location.pathname === "/me" && location.hash === "#goals") {
        // done: NOT MAKE THIS HARDCODED
        // doesnt need to be perfect
        goalstab.children[0].className = "flex items-center transition-all pr-4"
        goalstab.children[0].children[0].className = "transition-all relative z-20 flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full bg-[#fecb0d]"
        goalstab.children[0].children[0].children[0].className = "transition-all relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white"
        


        goalstab.children[0].children[1].className = "relative z-10 -ml-4 rounded-r-2xl py-2 pr-10 transition-all bg-[#fecb0d] pl-8"
        const goalTitle = goalstab.children[0].children[1].children[0]
        goalTitle.className = goalTitle.className
            .split(" ")
            .filter((c) => !c.startsWith("hover:") && !c.startsWith("group-hover:") && c !== "text-white" && c !== "smoothing-white")
            .join(" ")
        goalTitle.classList.add("text-black", "smoothing-black")
    }

    // replace stuff with le goals
    let goalsreplacing = localStorage.getItem("hctgplus-tobereplacedwithgoals") || "hours"
    function replaceWithGoals(stat) {
        let target = null
        if (stat === "hours") {
            target = hoursdiv
        }else if (stat === "dollars") {
            target = dollardiv
        } else if (stat === "tickets") {
            target = statsdiv.children[0]
        }

        if (!target) {
            return
        }

        if (!window.HCTG.goals || typeof window.HCTG.goals.hoursDoneToday !== "function" || typeof window.HCTG.goals.hoursAday !== "function") {
            return
        }

        const gubby = document.getElementsByClassName("flex items-center gap-3")[0]
        gubby.children[1].appendChild(target)
        
        let hoursDoneToday = window.HCTG.goals.hoursDoneToday()
        if (hoursDoneToday && typeof hoursDoneToday.then === "function") {
            hoursDoneToday.then(function(hoursDone) {
                let hoursAday = window.HCTG.goals.hoursAday()
                if (!Number.isFinite(hoursDone) || !Number.isFinite(hoursAday)) {
                    target.children[1].innerText = "0/0"
                    return
                }

                let targettext = String(Math.round(hoursDone * 100) / 100) + "hrs/" + String(Math.round(hoursAday * 100) / 100) + "hrs"
                target.children[1].innerText = targettext


                if (Math.round(hoursDone * 100) >= Math.round(hoursAday * 100)) {
                    target.children[1].classList.add("text-green-500")
                    target.children[1].style.textShadow = "0 0 10px #15532c"
                }
            }).catch(function() {
                target.children[1].innerText = "0/0"
            })
            return
        }

        let targettext = "..."
        target.children[1].innerText = targettext
    }
    let goalitem = localStorage.getItem("hctgplus-goalitem")
    if (goalitem) {
        let toreplace = goalsreplacing
        let isthereakey = localStorage.getItem("hctg-hacktime-key") ? true : false

        if (isthereakey) {
            replaceWithGoals(toreplace)
        }
        
    }

    

    /// extra
    let possiblehelpstuff = document.getElementsByClassName("rounded-xl border-2 border-white p-4")
    let helpstuff = null
    for (let possibily of possiblehelpstuff ) {
        let parent = possibily.parentElement
        if (parent.children[1]) {
            if (parent.children[1].className === "rounded-2xl bg-[#fecb0d] p-[21px] text-black") {
                helpstuff = possibily
            }
        }
    }
    if (!helpstuff) { console.error("HCTG+: didnt find the help stuff pls fix id:DBNIJ")}
    
    let dismiss = localStorage.getItem("hctg-dismiss-help") ? true : false 
    if (dismiss) { helpstuff.hidden = true }
    // add a little x
    if (!dismiss) {
        let dissmiss = document.createElement("a")
        dissmiss.className = "absolute top-2 right-5 flex gap-1.5"
        dissmiss.innerText = "X"
        dissmiss.href = "javascript:void(0)"
        dissmiss.onclick = function() {
            helpstuff.hidden = true
            localStorage.setItem("hctg-dismiss-help", "i dont really check for the content tbh")
        }

        helpstuff.appendChild(dissmiss)
    }



    ///////////////////////////
    // redirect larping pages...
    ///////////////////////


    for (let thing of navbar.children) {
        if (thing.className !== "group group relative z-10 flex items-center") {
            console.log("HCTG+:", thing, "is not a choice buddy")
        }
        let thingName = thing.children[0]?.children[1].children[0]?.innerText
        // if (thingName) {
        //     console.log(thingName)
        // }
        if (thingName === "Review") {
            // const textEl = thing.children[0]?.children[1].children[0]
            // if (textEl) {
            //     textEl.innerText = "butt!"
            // }
            let gubby = "/me#larp-reviewer"
            thing.href = gubby
            thing.onclick = function (e) {
                window.location.href = gubby
                e.preventDefault()
            }


            if (location.pathname === "/me" && (location.hash === "#larp_review" || location.hash === "#larp-reviewer")) {
                // done: NOT MAKE THIS HARDCODED
                // doesnt need to be perfect
                thing.children[0].className = "flex items-center transition-all pr-4"
                thing.children[0].children[0].className = "transition-all relative z-20 flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full bg-[#fecb0d]"
                thing.children[0].children[0].children[0].className = "transition-all relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white"



                thing.children[0].children[1].className = "relative z-10 -ml-4 rounded-r-2xl py-2 pr-10 transition-all bg-[#fecb0d] pl-8"
                const thingTitle = thing.children[0].children[1].children[0]
                thingTitle.className = thingTitle.className
                    .split(" ")
                    .filter((c) => !c.startsWith("hover:") && !c.startsWith("group-hover:") && c !== "text-white" && c !== "smoothing-white")
                    .join(" ")
                thingTitle.classList.add("text-black", "smoothing-black")
            }
        }
    }
}

window.addEventListener('pageChange', function() {
    setTimeout(makeSidebarBetter, 100)
});

window.addEventListener('hctg:dataReady', function() {
    setTimeout(makeSidebarBetter, 0)
});

makeSidebarBetter()
