function settingsSection() { // copied off the Notification Preferences section but changed a bit
    let section = document.createElement("div")

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



    let grayscaleRow = document.createElement("tr")
    grayscaleRow.className = "bg-[#ffffff]"



    section.appendChild(sectionContent)
    sectionContent.appendChild(sectionTitle)
    sectionContent.appendChild(sectionDescription)
    sectionContent.appendChild(settingsTable)
    settingsTable.appendChild(settingsTableContent)

    return section
}

export function applyToSettingsDiv(settingsDiv: Element) {
    console.log("is this even being called?")
    if (settingsDiv.className !== "relative z-10 max-w-4xl mx-auto px-4 pb-12 pt-6 flex flex-col gap-6") { return }

    let streakSection = settingsDiv.querySelector("#streak")
    if (!streakSection) { return }
    let settingsSectionElement = settingsSection()

    // hack bc js sucks ass and they didnt make a intertAfter tool
    let afterStreakSection = streakSection.nextSibling
    if (afterStreakSection == null) {return}
    console.log(settingsDiv)
    settingsDiv.insertBefore(settingsSectionElement, afterStreakSection)
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