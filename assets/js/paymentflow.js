// Initialize intl-tel-input
const phoneInput = document.querySelector('.phone-input input');
const iti = window.intlTelInput(phoneInput, {
    initialCountry: "auto", // Automatically detects the user's country
    geoIpLookup: function (callback) {
        fetch('https://ipinfo.io/json?token=1d99c0fb742a46')
            .then(res => res.json())
            .then(data => callback(data.country))
            .catch(() => callback("IN")); // Default to India if there's an issue with IP lookup
    },
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
    separateDialCode: true, // This ensures the dial code is visible and separate
});

// Update phone input display with proper placeholder format
function updatePhoneInputDisplay() {
    const countryData = iti.getSelectedCountryData();
    const dialCode = countryData.dialCode;

    // // Set the placeholder to include the dial code and leave room for the phone number
    // phoneInput.placeholder = `+${dialCode}  ${phoneInput.placeholder.split(' ')[1] || ''}`;
}

// Call this function initially to set the correct placeholder
updatePhoneInputDisplay();

// Listen for changes to update the flag and dial code dynamically
phoneInput.addEventListener('input', updatePhoneInputDisplay);


// ----- COUNTRY & STATE DROPDOWNS -----
const countrySelect = document.querySelector('#country-select');
const stateSelect = document.querySelector('#state-select');

// Load countries from API and make searchable with Choices.js
fetch("https://countriesnow.space/api/v0.1/countries/positions")
    .then(res => res.json())
    .then(data => {
        const countries = data.data.map(c => ({ value: c.name, label: c.name }));

        const countryChoices = new Choices(countrySelect, {
            searchEnabled: true,
            itemSelectText: '',
            shouldSort: true,
            position: 'bottom' // ⬅️ Force dropdown to open downward
        });

        countryChoices.setChoices(countries, 'value', 'label', true);

        // Load states for initially selected country
        if (countries.length > 0) loadStates(countries[0].value);

        // Handle country change
        countrySelect.addEventListener('change', () => {
            const selectedCountry = countrySelect.value;
            loadStates(selectedCountry);
        });
    });

// Load states dynamically from API
function loadStates(countryName) {
    stateSelect.innerHTML = '<option>Loading...</option>';
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: countryName })
    })
        .then(res => res.json())
        .then(data => {
            stateSelect.innerHTML = "";

            if (data.data?.states?.length) {
                data.data.states.forEach(state => {
                    const option = document.createElement("option");
                    option.value = state.name;
                    option.textContent = state.name;
                    stateSelect.appendChild(option);
                });
            } else {
                const option = document.createElement("option");
                option.textContent = "No states found";
                stateSelect.appendChild(option);
            }
        });
}
