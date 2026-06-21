function parseDataPage() {
    window.HCTG = window.HCTG || {}
    window.HCTG.consts = window.HCTG.consts || {
        "onetoken2usd": 5,
        "onehour2usd": 5,
        "REALLYdebuging": false
    }

    // get data-page from the app div
    const appdiv = document.getElementById("app")
    if (!appdiv) { return }

    let datapageslop = appdiv.getAttribute("data-page")
    if (!datapageslop) { return }

    // parse the slop into something more usable
    // i didnt think it was this easy...
    let datapage = null
    try {
        datapage = JSON.parse(datapageslop)
    } catch {
        console.error("HCTG: could not parse data-page JSON. ID:xj8sqv")
        return
    }

    window.HCTG.datapage = datapage
    // console.log("HCTG+: parsed datapage", datapage)
    let user = datapage?.props?.user
    if (user) {
        window.HCTG.user = user
    }else {
        console.error("HCTG: something has happened and the user prop was not found! ID:exnwqi")
        return
    }
    // i think this is in seconds
    let hours = {
        "totalTime": user.total_reported_seconds ?? 0,
        "secondsInReview": user.total_in_review_seconds ?? 0,
        "approvedSeconds": user.total_approved_seconds ?? 0
    
    }
    window.HCTG.hours = hours

    // economics
    let economics = {
        "totalHours": null,
        "hours": null,
        "predictedUSD": null,
        "USD": null,
        "tokens": user.balance ?? 0
    }
    
    // total hours
    economics.totalHours = hours.totalTime / 3600
    economics.totalHours = Math.round(economics.totalHours * 100) / 100 // make it bit prettier
    economics.hours = economics.totalHours

    // predict usd
    if (localStorage.getItem("hctg-use-hours-for-money") === "true") {
        economics.USD = economics.hours * window.HCTG.consts.onetoken2usd
        economics.USD = Math.round(economics.USD * 100) / 100
    } else {
        // kinda predict usd
        economics.USD = economics.tokens * window.HCTG.consts.onetoken2usd
        economics.USD = Math.round(economics.USD * 100) / 100
    }



    // localStorage.setItem("hctg-old-balance", toString(economics.balance))
    
    window.HCTG.economics = economics
    window.dispatchEvent(new Event('hctg:dataReady'))

    console.log(datapage)
}

window.addEventListener('pageChange', function() {
    setTimeout(parseDataPage, 100)
});

parseDataPage()
