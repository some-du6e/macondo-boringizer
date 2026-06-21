function addSettings() {
    if (location.pathname !== "/me") { return }
    if (location.hash !== "") { return }
    console.log("HCTG+: addSettings running")

    let mainContainer = document.getElementsByClassName("relative -ml-2 h-screen w-full flex-1 overflow-y-scroll px-6 py-10")[0]

    let settingsContainer = document.createElement("div")
    settingsContainer.className = "p-8"
    settingsContainer.innerHTML = `
    <h2 class="mb-2 text-3xl font-bold">HCTG+ settings</h2>
    <div id="settingscontainer">

    </div>
    `

    mainContainer.appendChild(settingsContainer)

    
    function addSetting(title, localstoragetochange, inputtype, callback, subtitle, dropdowns) {
        let setting = document.createElement("div")
        setting.className = "px-6 py-4"

       

        if (subtitle) {
             // title
            let titlee = document.createElement("h3")
            titlee.className = "smoothing-black text-2xl font-bold tracking-[-0.02em]"
            titlee.innerText = title
            setting.appendChild(titlee)

            let subtitlee = document.createElement("p")
            subtitlee.className = "smoothing-gray text-xl mb-4 text-gray-600"
            subtitlee.innerText = subtitle
            setting.appendChild(subtitlee)
        }else {
             // title
        let titlee = document.createElement("h3")
        titlee.className = "smoothing-black mb-4 text-2xl font-bold tracking-[-0.02em]"
        titlee.innerText = title
        setting.appendChild(titlee)
        }

        if (inputtype === "boolean") {
            let input = document.createElement("select")
            input.className = ""
            input.innerHTML = `
            <option value="false">No</option>
            <option value="true">Yes</option>
            `
            input.onchange = function() {
                localStorage.setItem(localstoragetochange, input.value)
            }
            let lsitem = localStorage.getItem(localstoragetochange) ? localStorage.getItem(localstoragetochange) : false
            input.value = lsitem
            localStorage.setItem(localstoragetochange, lsitem)
            setting.appendChild(input)
        }

        if (inputtype === "customDropdown") {
            let input = document.createElement("select")
            input.className = ""
            input.innerHTML = `
            ${dropdowns.map(dropdown => `<option value="${dropdown}">${dropdown}</option>`).join("")}
            `
            input.onchange = function() {
                localStorage.setItem(localstoragetochange, input.value)
            }
            let lsitem = localStorage.getItem(localstoragetochange) ? localStorage.getItem(localstoragetochange) : dropdowns[0]
            input.value = lsitem
            localStorage.setItem(localstoragetochange, lsitem)
            setting.appendChild(input)
        }

        if (inputtype === "button") {
            let input = document.createElement("a")
            input.className = "mt-2 bg-black px-4 py-1.5 font-bold text-white no-underline transition-colors hover:bg-[#fecb0d] hover:text-black cursor-pointer"
            input.innerText = "Please"
            input.onclick = callback
            setting.appendChild(input)
        }

        if (inputtype === "counter") {
            let input = document.createElement("div")
            input.className = ""
            let lsitem = parseInt(localStorage.getItem(localstoragetochange)) || 0
            title = title.replaceAll(" ", "")
            input.innerHTML = `
            <div class="mt-4 flex items-center  gap-2">
            <button type="button" class="flex h-10 w-10 cursor-pointer items-center justify-center rounded border-2 border-black bg-white text-xl font-bold transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40" id="${title}-down10">-10</button>
                <button type="button" class="flex h-10 w-10 cursor-pointer items-center justify-center rounded border-2 border-black bg-white text-xl font-bold transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40" id="${title}-down">−1</button>
                    <span class="smoothing-black w-10 text-center text-xl font-bold" id="${title}-counter">${lsitem}</span>
                <button type="button" class="flex h-10 w-10 cursor-pointer items-center justify-center rounded border-2 border-black bg-white text-xl font-bold transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40" id="${title}-up">+1</button>
                <button type="button" class="flex h-10 w-10 cursor-pointer items-center justify-center rounded border-2 border-black bg-white text-xl font-bold transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40" id="${title}-up10">+10</button>
            </div>
            `

            function sillygubby(imgay) {
                lsitem = lsitem + imgay
                localStorage.setItem(localstoragetochange, lsitem)
                input.querySelector(`#${title}-counter`).innerText = lsitem
            }
            
            input.value = lsitem
            localStorage.setItem(localstoragetochange, lsitem)
            setting.appendChild(input)
            
            input.querySelector(`#${title}-up`).addEventListener('click', () => sillygubby(+1))
            input.querySelector(`#${title}-up10`).addEventListener('click', () => sillygubby(+10))
            input.querySelector(`#${title}-down`).addEventListener('click', () => sillygubby(-1))
            input.querySelector(`#${title}-down10`).addEventListener('click', () => sillygubby(-10))
        }
        settingsContainer.appendChild(setting)
    }

    addSetting("Hide black market items", "hctg-hideblackmarket", "boolean", null, 'Hides items that require a golden ticket' )
    addSetting("Developer mode", "hctg-devmode", "boolean", null, "Shows the item id of a shop item")
    addSetting("Use hours for money estimation", "hctg-use-hours-for-money", "boolean", null, "Calculates money based on total hours instead of tickets")
    addSetting("Stat to replace with ur goal", "hctgplus-tobereplacedwithgoals", "customDropdown", null, "Replaces a stat you chose (like hours or tickets or dollars) with your goal progress in the sidebar.", ["hours", "tickets", "dollars"])

    let yap = "Note 1: may be flaky at times since manifest v3 ruined all chances at on the fly request modification \n Note 2: You cant use this to do role stuff since the server has it secured \n Note 3: im not responsible if you find a vulnerability using this feature \n Note 4: You need to refresh after changing it to see changes"
    addSetting("Larp as admin", "hctg-larp-admin", "boolean", null, `Be a fake admin \n ${yap}`)
    addSetting("Larp as reviewer", "hctg-larp-reviewer", "boolean", null, `Be a fake reviewer \n ${yap}`)
    addSetting("Fake golden ticket", "hctg-larp-wizard", "boolean", null, `Have a fake golden ticket (internally known as being a wizard) \n ${yap}`)

    addSetting("Fake balance", "hctg-larp-balance", "boolean", null, `Have a fake balance defined below \n ${yap}`)
    addSetting("Fake balance", "hctg-new-balance", "counter", null, "Refresh after changing this to see changes.")
    addSetting("Bring back help", null, "button", function() {
        localStorage.removeItem('hctg-dismiss-help')
        location.reload()
    })



    
}

window.addEventListener('pageChange', function() {
    setTimeout(addSettings, 200)
});


window.HCTG = window.HCTG || {}






addSettings()
