document.querySelectorAll('[showOnLoading]').forEach(element => {
    element.computedStyleMap.display = "none";
});

async function goTo(url) {
    window.history.pushState({}, '', url);

    const response = await fetch(url);
    const newContent = await response.text();

    document.body.innerHTML = newContent;

    attachLinkHandlers();
}

function attachLinkHandlers() {
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', async (event) => {
            event.preventDefault();
            const url = anchor.href;

            await goTo(url);
        });
    });
}

async function redirect(url) {
    await goTo(url);
}

attachLinkHandlers();

window.addEventListener('popstate', async () => {
    const url = window.location.href;

    const response = await fetch(url);
    const newContent = await response.text();

    document.body.innerHTML = newContent;

    attachLinkHandlers();
});
