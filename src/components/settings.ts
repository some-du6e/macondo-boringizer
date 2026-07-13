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

    const settings = [grayscaleSetting(), preloadShopSetting()]
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
