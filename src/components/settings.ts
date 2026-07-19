function grayscaleSetting() {

    let grayscaleRow = document.createElement("tr")
    grayscaleRow.className = "bg-white border-t border-black z-[-1]"

    let grayscaleRowTitle = document.createElement("td")
    grayscaleRowTitle.className = "py-3 pr-4 pl-2 text-black"
    grayscaleRowTitle.textContent = "Ultra boring"

    let grayScaleRowCheckbox = document.createElement("td")
    grayScaleRowCheckbox.className = "py-3 px-2 text-center"

    let grayScaleRowCheckboxInput = document.createElement("input")
    grayScaleRowCheckboxInput.type = "checkbox"
    grayScaleRowCheckboxInput.className = "w-4 h-4 accent-ds-brown"
    grayScaleRowCheckboxInput.dataset.boringizerSetting = "grayscale"
    
    grayScaleRowCheckbox.appendChild(grayScaleRowCheckboxInput)
    grayscaleRow.appendChild(grayscaleRowTitle)
    grayscaleRow.appendChild(grayScaleRowCheckbox)

    const grayscaleEvent = new CustomEvent("boringizer-update-grayscale");



    const grayscaleStatus = localStorage.getItem("boringizer-grayscale") == "true" ? true : false 
    grayScaleRowCheckboxInput.checked = grayscaleStatus
    
    grayScaleRowCheckboxInput.addEventListener("change", function() {
        const newStatus = grayScaleRowCheckboxInput.checked
        localStorage.setItem("boringizer-grayscale", newStatus.toString())
        console.log("Boringizer: Grayscale setting changed to", newStatus)

        window.dispatchEvent(grayscaleEvent)
    })

    return grayscaleRow
}

function preloadShopSetting() {
    let preloadShopRow = document.createElement("tr")
    preloadShopRow.className = "border-t border-ds-brown/15"

    let preloadShopRowTitle = document.createElement("td")
    preloadShopRowTitle.className = "py-3 pr-4 text-ds-brown"
    preloadShopRowTitle.textContent = "Preload shop items"

    let preloadShopRowCheckbox = document.createElement("td")
    preloadShopRowCheckbox.className = "py-3 px-2 text-center"

    let preloadShopRowCheckboxInput = document.createElement("input")
    preloadShopRowCheckboxInput.type = "checkbox"
    preloadShopRowCheckboxInput.className = "w-4 h-4 accent-black"
    preloadShopRowCheckboxInput.dataset.boringizerSetting = "preload-shop"

    preloadShopRowCheckbox.appendChild(preloadShopRowCheckboxInput)
    preloadShopRow.appendChild(preloadShopRowTitle)
    preloadShopRow.appendChild(preloadShopRowCheckbox)
    
    const preloadShopStatus = localStorage.getItem("boringizer-preloading-shop") == "false" ? false : true 
    preloadShopRowCheckboxInput.checked = preloadShopStatus
    
    preloadShopRowCheckboxInput.addEventListener("change", function() {
        const newStatus = preloadShopRowCheckboxInput.checked
        localStorage.setItem("boringizer-preloading-shop", newStatus.toString())
        console.log("Boringizer: Preload shop setting changed to", newStatus)
    })

    return preloadShopRow
}

function fatDelayThingIdkHowToNameThis(secs: number, container: Element) {
    let bigboy = document.createElement("div")
    bigboy.className = "relative flex w-full flex-col items-center justify-between px-8 py-24 text-center"
    bigboy.style.minHeight = "42rem"
    bigboy.innerHTML = `
        <div class="max-w-2xl">
            <p class="mb-3 text-sm font-bold uppercase tracking-widest text-ds-brown/60">Hold up</p>
            <h2 class="text-4xl font-bold leading-tight text-ds-brown">Are you sure you want to change this?</h2>
            <p class="mt-4 text-base text-ds-brown/70">Take a second before changing your shop lock.</p>
        </div>
        <div class="flex w-full max-w-md flex-col items-center gap-5">
            <button type="button" data-delay-choice="no" class="w-full border-[3px] border-ds-brown bg-ds-brown px-6 py-3 text-base font-bold text-ds-cream transition-colors hover:bg-ds-brown/90">
                No, keep it as it was
            </button>
            <div class="h-2 w-full overflow-hidden border-2 border-ds-brown/30" aria-hidden="true">
                <div data-delay-progress class="h-full w-full bg-ds-brown"></div>
            </div>
            <button type="button" data-delay-choice="yes" disabled class="text-sm font-bold text-ds-brown/40 transition-opacity disabled:cursor-not-allowed">
                Yes, change it <span data-delay-seconds>(${Math.ceil(secs)}s)</span>
            </button>
        </div>
    `
    container.appendChild(bigboy)

    let noButton = bigboy.querySelector<HTMLButtonElement>('[data-delay-choice="no"]')
    let yesButton = bigboy.querySelector<HTMLButtonElement>('[data-delay-choice="yes"]')
    let progress = bigboy.querySelector<HTMLElement>("[data-delay-progress]")
    let seconds = bigboy.querySelector<HTMLElement>("[data-delay-seconds]")
    if (!noButton || !yesButton || !progress || !seconds) {
        return Promise.resolve(false)
    }

    let shrinkAnimation = progress.animate(
        [
            { transform: "scaleX(1)" },
            { transform: "scaleX(0)" },
        ],
        {
            duration: secs * 1000,
            easing: "linear",
            fill: "forwards",
        },
    )
    progress.style.transformOrigin = "left"

    let secondsLeft = Math.ceil(secs)
    let countdown = window.setInterval(function() {
        secondsLeft -= 1
        seconds.textContent = secondsLeft > 0 ? `(${secondsLeft}s)` : ""
    }, 1000)

    shrinkAnimation.addEventListener("finish", function() {
        window.clearInterval(countdown)
        seconds.textContent = ""
        yesButton.disabled = false
        yesButton.className = "text-sm font-bold text-ds-brown underline decoration-2 underline-offset-4 hover:opacity-70 transition-opacity"
    })

    return new Promise<boolean>(function(resolve) {
        noButton.addEventListener("click", function() {
            window.clearInterval(countdown)
            shrinkAnimation.cancel()
            resolve(false)
        }, { once: true })
        yesButton.addEventListener("click", function() {
            if (yesButton.disabled) { return }
            resolve(true)
        }, { once: true })
    })

}
async function openDelayPopup(secs: number) { // inspired by onesec
    let popupBg = document.createElement("div")
    popupBg.className = "fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"

    let popup = document.createElement("div")
    popup.className = "fixed inset-0 z-[201] flex items-center justify-center pointer-events-none"
    popup.innerHTML = `
    <div
    class="relative pl-5 pt-4 pr-6 flex flex-col modal-frame relative w-full max-w-6xl mx-4 pointer-events-auto max-h-[90vh]">
    <div class="absolute top-2 bottom-2 left-3 right-3 bg-parchment"></div>
    <div class="relative z-[1] flex-1 min-h-0 w-full  overflow-y-auto">
        <div class="bg-parchment">
            <div
                class="max-w-6xl mx-auto relative overflow-x-hidden"
                id="thingamajig-container">
            </div>
        </div>
    </div>
    <img
        src="/images/borders/top_left.webp"
        class="absolute top-0 left-0 w-24 h-24 pointer-events-none z-[2]"
        alt=""
        draggable="false" />
    <img
        src="/images/borders/top_right.webp"
        class="absolute top-0 right-0 w-24 h-24 pointer-events-none z-[2]"
        alt=""
        draggable="false" />
    <img
        src="/images/borders/bottom_left.webp"
        class="absolute bottom-0 left-0 w-24 h-24 pointer-events-none z-[2]"
        alt=""
        draggable="false" />
    <img
        src="/images/borders/bottom_right_2.webp"
        class="absolute bottom-0 right-0 w-24 h-24 pointer-events-none z-[2]"
        alt=""
        draggable="false" />
    <div
        class="absolute top-24 left-[8px] bottom-24 w-24 pointer-events-none z-[1]"
        style="
            background-image: url(&quot;/images/borders/left.webp&quot;);
            background-size: 96px 96px;
            background-repeat: no-repeat round;
        "></div>
    <div
        class="absolute top-24 right-[8px] bottom-24 w-24 pointer-events-none z-[1]"
        style="
            background-image: url(&quot;/images/borders/right.webp&quot;);
            background-size: 96px 96px;
            background-repeat: no-repeat round;
        "></div>
    <div
        class="absolute top-0 left-24 right-24 h-24 pointer-events-none z-[1]"
        style="
            background-image: url(&quot;/images/borders/top.webp&quot;);
            background-size: 100% 100%;
        "></div>
    <div
        class="absolute bottom-0 left-24 right-24 h-24 pointer-events-none z-[1]"
        style="
            background-image: url(&quot;/images/borders/bottom.webp&quot;);
            background-size: 100% 100%;
        "></div>
</div>

    `

    let body = document.querySelector("body")
    if (!body) { return }
    body.appendChild(popupBg)
    body.appendChild(popup)

    let thingamajigContainer = popup.querySelector("#thingamajig-container")
    if (!thingamajigContainer) { console.log("thingamajigContainer not found"); return }

    let result = await fatDelayThingIdkHowToNameThis(secs, thingamajigContainer)
    popupBg.remove()
    popup.remove()
    return result

}



function lockShopSetting() {
    let lockShopRow = document.createElement("tr")
    lockShopRow.className = "border-t border-ds-brown/15"

    let lockShopRowTitle = document.createElement("td")
    lockShopRowTitle.className = "py-3 pr-4 text-ds-brown"
    lockShopRowTitle.textContent = "Lock shop"

    let lockShopRowCheckbox = document.createElement("td")
    lockShopRowCheckbox.className = "py-3 px-2 text-center"

    let lockShopRowCheckboxInput = document.createElement("input")
    lockShopRowCheckboxInput.type = "checkbox"
    lockShopRowCheckboxInput.className = "w-4 h-4 accent-black"
    lockShopRowCheckboxInput.dataset.boringizerSetting = "preload-shop"

    lockShopRowCheckbox.appendChild(lockShopRowCheckboxInput)
    lockShopRow.appendChild(lockShopRowTitle)
    lockShopRow.appendChild(lockShopRowCheckbox)
    
    const lockShopStatus = localStorage.getItem("boringizer-lock-shop") == "true" ? true : false 
    lockShopRowCheckboxInput.checked = lockShopStatus
    
    lockShopRowCheckboxInput.addEventListener("change", async function() {
        let newStatus = lockShopRowCheckboxInput.checked
        let confirmed = await openDelayPopup(5)
        if (!confirmed) {
            lockShopRowCheckboxInput.checked = !newStatus
            return
        }
        localStorage.setItem("boringizer-lock-shop", newStatus.toString())
    })

    return lockShopRow
}

function settingsSection() { // copied off the Notification Preferences section but changed a bit
    let section = document.createElement("div")
    section.id = "boringizer-settings"

    let sectionContent = document.createElement("div")
    sectionContent.className = "pb-4 border-b-2 border-ds-brown"

    let sectionTitle = document.createElement("h2")
    sectionTitle.className = "text-lg font-bold text-ds-brown mb-2"
    sectionTitle.textContent = "Boringizer settings"

    let sectionDescription = document.createElement("p")
    sectionDescription.className = "text-sm text-ds-brown/70 mb-4"
    sectionDescription.textContent = "placeholder //todo pls fix"


    let settingsTable = document.createElement("table")
    settingsTable.className = "w-full text-sm"

    let settingsTableContent = document.createElement("tbody")






    section.appendChild(sectionContent)
    sectionContent.appendChild(sectionTitle)
    sectionContent.appendChild(sectionDescription)
    sectionContent.appendChild(settingsTable)
    settingsTable.appendChild(settingsTableContent)

    const settings = [grayscaleSetting(), preloadShopSetting(), lockShopSetting()]
    for (const setting of settings) {
        settingsTableContent.appendChild(setting)
    }

    console.log(section)
    return section
}

export function applyToSettingsDiv(settingsDiv: Element) {
    if (settingsDiv.className !== "relative z-10 max-w-4xl mx-auto px-4 pb-12 pt-6 flex flex-col gap-6") { return }
    let existingSettings = settingsDiv.querySelector("#boringizer-settings")
    if (existingSettings?.querySelector('[data-boringizer-setting="grayscale"]')) { return }
    existingSettings?.remove()

    let streakSection = settingsDiv.querySelector("#streak")
    if (!streakSection) { return }
    let settingsSectionElement = settingsSection()

    settingsDiv.appendChild(settingsSectionElement)
    console.log("Applied Boringizer settings")
}


// template for a setting
// <tr class="border-t border-ds-brown/15">
//  <td class="py-3 pr-4 text-ds-brown">
//      Ship decisions (approved, rejected, needs changes)
//  </td>
//  <td class="py-3 px-2 text-center">
//      <input type="checkbox" class="w-4 h-4 accent-ds-brown">
//  </td>
//  <td class="py-3 px-2 text-center">
//      <input type="checkbox" class="w-4 h-4 accent-ds-brown">
//  </td>
// </tr>
