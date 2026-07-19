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

async function fatDelayThingIdkHowToNameThis(secs: number, container: Element) {
    let bigboy = document.createElement("div")
    bigboy.className = 'w-full h-full min-h-6xl'
    bigboy.style.backgroundColor = "#924860"
    bigboy.style.minHeight = "73rem"



    container.appendChild(bigboy)

    await new Promise(resolve => setTimeout(resolve, 5000));
    return 

}
async function openDelayPopup(secs: number) { // inspired by onesec
    let popupBg = document.createElement("div")
    popupBg.className = "fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"

    popupBg.addEventListener("click", function() {
        popupBg?.remove()
        popup?.remove()
    })


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
    ;(thingamajigContainer as HTMLElement).style.backgroundColor = "#924860"

    await fatDelayThingIdkHowToNameThis(secs, thingamajigContainer)

    console.log("poo")

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
    
    lockShopRowCheckboxInput.addEventListener("change", function() {
        openDelayPopup(10)
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
