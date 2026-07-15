function getCurrentTourStage(onboarding: Element): number {
    const stageElement = onboarding.querySelector(".mu-onboarding-progress")
    const stage = stageElement?.textContent?.match(/Step\s+(\d+)\s+of/)?.[1]

    return stage ? Number(stage) : 0
}

function handleTourStageChange(onboarding: Element, newStage: number) {
    console.log(`boringizer: mcu tour stage changed to ${newStage}`)
    if (newStage === 2) {
        if (window.location.pathname !== "/profile") {
            window.location.href = "/profile"
        }
    }
    if (newStage === 3) {
        if (window.location.pathname !== "/shop") {
            window.location.href = "/shop"
        }
    }

    if (newStage === 8) { // TODO: add compat somehow 
        let onboardingDescription = onboarding.querySelector(".mu-onboarding-body")
        let onboardingTitle = onboarding.querySelector(".mu-onboarding-title")
        if (onboardingDescription && onboardingTitle) {
            onboardingTitle.textContent = "pls skip me"
            onboardingDescription.textContent = "hey buddy, seems that theres no tiles (since you have macondo boringizer installed) so you can just ignore this step"
        }
    }
}

export function interceptTour() {
    window.macondo = window.macondo || {}
    if (window.macondo.tourObserver) { return }

    let currentStage = 0

    function syncTourStage() {
        const onboarding = document.getElementById("macondo-utils-onboarding")
        if (!onboarding) {
            currentStage = 0
            return
        }

        const newStage = getCurrentTourStage(onboarding)
        if (!newStage || newStage === currentStage) { return }

        currentStage = newStage
        handleTourStageChange(onboarding, newStage)
    }

    syncTourStage()

    window.macondo.tourObserver = new MutationObserver(syncTourStage)
    window.macondo.tourObserver.observe(document.body, {
        childList: true,
        characterData: true,
        subtree: true,
    })
}
