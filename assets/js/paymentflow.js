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



// Modal pop-up
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modalOverlay = document.getElementById('modalOverlay');

openModalBtn.addEventListener('click', (e) => {
    e.preventDefault(); // prevent navigation
    modalOverlay.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

// Optional: close when clicking outside the modal
window.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});

//  download button
async function inlineCSS(doc) {
    const styles = [];

    // Handle <link rel="stylesheet">
    const links = doc.querySelectorAll('link[rel="stylesheet"]');
    for (const link of links) {
      const href = link.href;
      try {
        const cssText = await fetch(href).then(res => res.text());
        styles.push(`<style>${cssText}</style>`);
      } catch (e) {
        console.warn('Failed to load stylesheet:', href, e);
      }
    }

    // Handle <style> tags
    const inlineStyles = doc.querySelectorAll('style');
    inlineStyles.forEach(style => styles.push(`<style>${style.innerHTML}</style>`));

    return styles.join('\n');
  }

  document.getElementById('downloadPolicy').addEventListener('click', async () => {
    const iframe = document.getElementById('policyFrame');

    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;

      const htmlClone = doc.documentElement.cloneNode(true);
      const header = htmlClone.querySelector('header');
      const footer = htmlClone.querySelector('footer');
      if (header) header.remove();
      if (footer) footer.remove();

      const cssText = await inlineCSS(doc);

      const finalHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Privacy Policy</title>
          ${cssText}
        </head>
        <body>
          ${htmlClone.querySelector('body').innerHTML}
        </body>
        </html>
      `;

      const blob = new Blob([finalHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'privacy-policy.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Failed to download:', err);
      alert('Unable to access iframe. Make sure this is running on localhost or a deployed server.');
    }
  });