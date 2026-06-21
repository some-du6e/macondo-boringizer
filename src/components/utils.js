// window.dispatchEvent(new Event('pageChange'));

// const observer = new MutationObserver((mutations) => {
//     // We call it on every mutation, but makeSidebarBetter is fast
//     console.log("Carnival+: location changed via DOM mutation")
//     window.dispatchEvent(new Event('pageChange'));
// });

// observer.observe(document.body, {
//     childList: true,
//     subtree: true
// });


// // function testinsmth() {
// //     document.createElement("script").content = `
// //     console.log("Carnival+: testinsmth ran")`

// // }


// // document.addEventListener("DOMContentLoaded", () => {
// //     testinsmth()
// // })



const originalPushState = history.pushState;
history.pushState = function() {
    originalPushState.apply(this, arguments);
    window.dispatchEvent(new Event('locationchange'));
};

const originalReplaceState = history.replaceState;
history.replaceState = function() {
    originalReplaceState.apply(this, arguments);
    window.dispatchEvent(new Event('locationchange'));
};

function alittlebitofgoop() {
    // Fire only when Inertia has mounted page data.
    const appDiv = document.getElementById("app");
    const hasPageData = appDiv?.getAttribute("data-page");
    if (appDiv && hasPageData) {
        window.dispatchEvent(new Event('pageChange'));
    }
}
window.addEventListener('locationchange', function() {
    alittlebitofgoop();
});
window.addEventListener('popstate', function() {
    alittlebitofgoop();
});


function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

if (!window.HCTG) {
    window.HCTG = {}
}
if (!window.HCTG.utils) {
    window.HCTG.utils = {}
}


window.HCTG.utils.changeTag = (element, newTagName) => {
    // 1. Create the new element
    const newElement = document.createElement(newTagName);

    // 2. Copy attributes (id, class, etc.)
    for (const attr of element.attributes) {
        newElement.setAttribute(attr.name, attr.value);
    }

    // 3. Move the children (content) from the old to the new
    while (element.firstChild) {
        newElement.appendChild(element.firstChild);
    }

    // 4. Replace the old element with the new one
    element.replaceWith(newElement);
    
    return newElement;
}