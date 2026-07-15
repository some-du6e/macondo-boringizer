function getCurrentTourStage(onboarding: Element): number {
    const stageElement = onboarding.querySelector(".mu-onboarding-progress")
    const stage = stageElement?.textContent?.match(/Step\s+(\d+)\s+of/)?.[1]

    return stage ? Number(stage) : 0
}   

function handleTourStageChange(onboarding: Element, newStage: number) {
    if (newStage === 2) {
        if (window.location.pathname !== "/profile") {
            window.location.href = "/profile"
        }
    }
}



function interceptTour() {
    // tysm Hridya for using ids
    const onboarding = document.getElementById("macondo-utils-onboarding")
    if (!onboarding) { return }

    let currentStage = getCurrentTourStage(onboarding)
    handleTourStageChange(onboarding, currentStage)

    const observer = new MutationObserver(() => {
        const newStage = getCurrentTourStage(onboarding)
        if (newStage === currentStage) { return }

        currentStage = newStage
        handleTourStageChange(onboarding, newStage)
    })

    observer.observe(onboarding, {
        childList: true,
        characterData: true,
        subtree: true,
    })
}
