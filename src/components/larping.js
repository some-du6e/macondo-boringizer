const observer = new MutationObserver(() => {
    const el = document.getElementById("app");
    if (!el) return;

    const raw = el.getAttribute("data-page");
    if (!raw) return;

    let larpadmin = localStorage.getItem("hctg-larp-admin") === "true" ? true : false;
    let larpreviewer = localStorage.getItem("hctg-larp-reviewer") === "true" ? true : false;
    let larpwizard = localStorage.getItem("hctg-larp-wizard") === "true" ? true : false;

    let larpingbal = localStorage.getItem("hctg-larp-balance") === "true" ? true : false;
    
    let newbal = parseInt(localStorage.getItem("hctg-new-balance")) ? parseInt(localStorage.getItem("hctg-new-balance")) : 0

    if (larpadmin && larpreviewer) {
        larpreviewer = false;
    }

    let modified = raw
    // .replace(/"balance":\d+/g, '"balance":6767');

    if (larpreviewer) { 
        modified = modified.replaceAll('"role":"user"', '"role":"reviewer"');
    }
    if (larpadmin) { 
        modified = modified.replaceAll('"role":"user"', '"role":"admin"');
    }

    if (larpwizard) { 
        modified = modified.replaceAll('"wizard":false', '"wizard":true');
    }

    if (larpingbal) {

        let oldbal = modified.match(/"balance":(\d+)/)?.[1] || 0;
        modified = modified.replaceAll(`"balance":${oldbal}`, `"balance":${newbal}`);
    }

    if (modified !== raw) {
        el.setAttribute("data-page", modified);
    }
});

observer.observe(document.documentElement, { childList: true, subtree: true });