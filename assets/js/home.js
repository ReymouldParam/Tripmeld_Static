$(document).ready(function () {
    $(".show-contactForm").on("click", function () {
        $("#contactFormModal").show(); // Show the element with the specified id
        $('body').css('overflow', 'hidden');
    });

    // features caorusel


    $('.feature-titles-carousel').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        vertical: true,
        verticalSwiping: true,
        focusOnSelect: true,
        asNavFor: '.feature-details-carousel',
        responsive: [
            {
                breakpoint: 557,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    vertical: false,
                    verticalSwiping: false,
                    dots: false,
                    arrows: false,
                }
            }
        ]
    });
    $('.feature-details-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.feature-titles-carousel',
        autoplay: true,
        autoplaySpeed: 4000,
        dots: false,
        arrows: false,
        fade: true,
        responsive: [
            {
                breakpoint: 557,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    vertical: false,
                    verticalSwiping: false,
                    dots: true,
                    arrows: false,
                }
            }
        ]
    });

    // Subsctibe plan
    $('.subscribe-plan-carousel').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 557,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    vertical: false,
                    verticalSwiping: false,
                    dots: true,
                    arrows: true,
                }
            }
        ]
    });
});

function hideContactFormModal() {
    $("#contactFormModal").hide();
    $('body').css('overflow', 'auto');
}

// FAQS funtions
const faqsData = {
    faqs: [
        {
            question: "What is TripMeld CRM?",
            answer: "TripMeld is a comprehensive travel CRM designed to streamline the management of leads, quotes, itineraries, tasks, meetings, and communication for travel agencies."
        },
        {
            question: "How does TripMeld CRM help increase sales and manage your team?",
            answer: "TripMeld CRM centralizes client and team communication, automates lead tracking, improves quote creation efficiency, and ensures seamless coordination with clients, vendors, and internal teams."
        },
        {
            question: "Who can use TripMeld CRM?",
            answer: "TripMeld CRM is ideal for travel agencies, tour operators, destination management companies (DMCs), and businesses offering travel-related services."
        },
        {
            question: "Can I track and record calls using TripMeld?",
            answer: "Yes, TripMeld includes call tracking and recording features, enabling seamless lead management and client follow-ups."
        },
        {
            question: "What is the purpose of the Quote module in TripMeld CRM?",
            answer: "The Quote module allows you to create, edit, and manage travel quotes for clients, ensuring accuracy and flexibility in travel planning."
        },
        {
            question: "How does TripMeld handle itineraries?",
            answer: "TripMeld’s inventory includes itinerary management, allowing travel agencies to design, store, and share detailed travel plans with clients."
        },
        {
            question: "Does TripMeld integrate with Destination Management Companies (DMCs) and vendors?",
            answer: "Yes, TripMeld integrates with DMCs and vendors, enabling seamless communication, quote sharing, and itinerary planning."
        },
        {
            question: "Can TripMeld CRM capture leads automatically?",
            answer: "Yes, leads are automatically captured when a new inquiry or call is received, ensuring no opportunity is missed."
        },
        {
            question: "What communication features does TripMeld CRM offer?",
            answer: "TripMeld includes a chat module for communication within the team, with DMCs, and external vendors."
        },
        {
            question: "Can I schedule tasks and meetings with TripMeld?",
            answer: "Yes, you can create, assign, and track tasks and meetings with built-in scheduling and reminder functionalities."
        },
        {
            question: "How does TripMeld CRM ensure data integration across modules?",
            answer: "TripMeld CRM synchronizes data across modules like leads, quotes, vouchers, and invoices, ensuring all updates reflect system-wide."
        },
        {
            question: "What role does TripMeld play in payment and invoice management?",
            answer: "TripMeld manages payments and invoices, offering seamless integration with quotes and vouchers for end-to-end transaction tracking."
        },
        {
            question: "How secure is TripMeld CRM?",
            answer: "TripMeld CRM provides role-based access and user-specific permissions, ensuring sensitive data is secure and visible only to authorized users."
        },
        {
            question: "Can I manage group and corporate tours with TripMeld?",
            answer: "Yes, TripMeld is designed to handle group and corporate tours, providing project-specific modules for streamlined operations."
        },
        {
            question: "Does TripMeld CRM have a mobile version?",
            answer: "Yes, TripMeld CRM offers a mobile version with high-level features for on-the-go access to leads and quotes."
        },
        {
            question: "What analytics or dashboards does TripMeld provide?",
            answer: "TripMeld offers dashboards for leads, tasks, calls, payments, invoices, and client activity, providing actionable insights to improve performance."
        },
        {
            question: "How can I onboard my team to TripMeld CRM?",
            answer: "Onboarding is simple with step-by-step tutorials, a user-friendly interface, and dedicated support for setup and training."
        },
        {
            question: "Does TripMeld support multiple travel services?",
            answer: "Yes, TripMeld supports services like tour packages, transportation, hotel bookings, sightseeing, and transfers, making it versatile for various travel needs."
        },
        {
            question: "Can TripMeld send automatic notifications and emails?",
            answer: "Yes, the CRM automates notifications and emails for updates, tasks, client interactions, and more."
        },
        {
            question: "How do I get started with TripMeld CRM?",
            answer: "You can get started by signing up on our website. Our support team will assist you in setting up and tailoring the CRM to meet your business needs."
        }
    ]
}

const defaultFaqCount = 10; // Default number of FAQs to show
let openedFaqs = [];
let showAll = false;
let allExpanded = false; // Tracks whether all FAQs are expanded

// References to HTML elements
const faqsContainer = document.querySelector(".faqs-list-container");
const showMoreText = document.getElementById("show-more-text");
const toggleExpandCollapseBtn = document.querySelector(".toggle-expand-collapse-btn");

// Render FAQs
function updateDisplayedFaqs() {
    const displayedFaqs = showAll
        ? faqsData.faqs
        : faqsData.faqs.slice(0, defaultFaqCount);

    faqsContainer.innerHTML = ""; // Clear previous content

    displayedFaqs.forEach((faq, index) => {
        const faqItem = document.createElement("div");
        faqItem.className = `faq-item ${openedFaqs.includes(index) ? "active" : ""}`;

        // Title container
        const titleContainer = document.createElement("div");
        titleContainer.className = "title-container";
        titleContainer.innerHTML = `
        <div><p class="title">${faq.question}</p></div>
        <div>
          <button class="toggle-btn">
            <ion-icon name="${openedFaqs.includes(index) ? "chevron-up-outline" : "chevron-down-outline"}"></ion-icon>
          </button>
        </div>
      `;
        titleContainer.addEventListener("click", () => toggleAnswer(index));

        // Answer container
        const answerContainer = document.createElement("div");
        answerContainer.className = "answer-container";
        answerContainer.innerHTML = `<p class="text">${faq.answer}</p>`;
        if (!openedFaqs.includes(index)) {
            answerContainer.style.display = "none";
        }

        faqItem.appendChild(titleContainer);
        faqItem.appendChild(answerContainer);
        faqsContainer.appendChild(faqItem);
    });
}

// Toggle FAQ visibility
function toggleAnswer(index) {
    const faqIndex = openedFaqs.indexOf(index);
    if (faqIndex === -1) {
        openedFaqs.push(index); // Open FAQ
    } else {
        openedFaqs.splice(faqIndex, 1); // Close FAQ
    }
    updateDisplayedFaqs();
}

// Toggle Expand/Collapse All
toggleExpandCollapseBtn.addEventListener("click", () => {
    if (allExpanded) {
        // Collapse All
        openedFaqs = [];
        toggleExpandCollapseBtn.textContent = "Expand All";
    } else {
        // Expand All
        openedFaqs = faqsData.faqs.map((_, index) => index);
        toggleExpandCollapseBtn.textContent = "Collapse All";
    }
    allExpanded = !allExpanded; // Toggle state
    updateDisplayedFaqs();
});

// Toggle Show More/Show Less
showMoreText.addEventListener("click", () => {
    showAll = !showAll;
    showMoreText.textContent = showAll ? "Show Less" : "Show More";
    updateDisplayedFaqs();
});

// Initial rendering
updateDisplayedFaqs();