
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

function openUrl(url) {
  if (url) {
    window.open(url, '_self'); // Opens the URL in a new tab
  } else {
    console.error("URL is required");
  }
}

function toggleMobileNavBar() {
  $(".mobile-navbar-container").slideToggle('fast')
}

function hideResponseModal() {
  $("#responseMessageModal").hide();
  $('body').css('overflow', 'auto');
}

jQuery(document).ready(function ($) {
  const urlParams = new URLSearchParams(window.location.search);
  const flagValue = urlParams.get('emailSuccess');

  if (flagValue === 'true') {
    $("#responseMessageModal").css("display", "block");
    $("#responseMessageModal .title").html("Success");
    $("#responseMessageModal .message").html("Your message was successfully send, our team will get back to you soon.");
    $("body").css("overflow", "hidden");
  } else if (flagValue === 'false') {
    $("#responseMessageModal .title").html("Failure");
    $("#responseMessageModal .message").html("Failed to send message, please contact us on +91 92811 17171 or contact@tripmeld.com");
    $("#responseMessageModal").css("display", "block");
    $("body").css("overflow", "hidden");
  } else if (flagValue === 'subscribeTrue'){
    $("#responseMessageModal").css("display", "block");
    $("#responseMessageModal .title").html("Success");
    $("#responseMessageModal .message").html("Thank you for subscribing to TripMeld. Stay tune with our updated.");
    $("body").css("overflow", "hidden");
  } else if (flagValue === 'subscribeFalse'){
    $("#responseMessageModal .title").html("Failure");
    $("#responseMessageModal .message").html("Failed to subscribe, please try again.");
    $("#responseMessageModal").css("display", "block");
    $("body").css("overflow", "hidden");
  }

  // Get the current URL without the query parameters
  const baseUrl = window.location.href.split('?')[0];

  // Replace the current state with a new state without the query parameters
  // window.history.replaceState(null, null, baseUrl);
});

