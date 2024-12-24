function scrollTo(section) {
    console.log(section);

    // $("#" + section).get(0)?.scrollIntoView({ behavior: "smooth" });
}


function openInNewTab(url) {
    if (url) {
        window.open(url, "_blank"); // Opens the URL in a new tab
    } else {
        console.error("URL is required");
    }
}