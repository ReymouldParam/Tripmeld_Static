
function scrollToSectionId(sectionId) {
    const section = $("#" + sectionId);
    if (section.length) {
      const sectionTop = section.offset().top - 60; // Calculate position with offset
      $("html, body").animate({ scrollTop: sectionTop }, "smooth"); // Smooth scrolling
      $(".mobile-navbar-container").slideUp('fast')
    } else {
      console.error(`Section with id "${sectionId}" not found.`);
    }
  }

function openInNewTab(url) {
    if (url) {
        window.open(url, "_blank"); // Opens the URL in a new tab
    } else {
        console.error("URL is required");
    }
}

function toggleMobileNavBar(){
    $(".mobile-navbar-container").slideToggle('fast')
}

