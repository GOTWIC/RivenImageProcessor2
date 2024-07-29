const options = [
    "Multishot", "Impact Damage", "Chance To Gain Extra Combo Count", "Critical Damage", "Toxin Damage", "Damage Vs Corpus",
    "Channeling Efficiency", "Slash Damage", "Cold Damage", "Fire Rate / Attack Speed", "Chance To Gain Combo Count", 
    "Base Damage / Melee Damage", "Electric Damage", "Magazine Capacity", "Zoom", "Reload Speed", "Status Duration", 
    "Projectile Speed", "Recoil", "Combo Duration", "Finisher Damage", "Ammo Maximum", "Damage Vs Grineer", "Puncture Damage", 
    "Status Chance", "Critical Chance On Slide Attack", "Heat Damage", "Damage Vs Infested", "Punch Through", "Range", 
    "Critical Chance", "Channeling Damage", "Multishot Neg", "Impact Damage Neg", "Chance To Gain Extra Combo Count Neg", 
    "Critical Damage Neg", "Toxin Damage Neg", "Damage Vs Corpus Neg", "Channeling Efficiency Neg", "Slash Damage Neg", 
    "Cold Damage Neg", "Fire Rate / Attack Speed Neg", "Chance To Gain Combo Count Neg", "Base Damage / Melee Damage Neg", 
    "Electric Damage Neg", "Magazine Capacity Neg", "Zoom Neg", "Reload Speed Neg", "Status Duration Neg", 
    "Projectile Speed Neg", "Recoil Neg", "Combo Duration Neg", "Finisher Damage Neg", "Ammo Maximum Neg", 
    "Damage Vs Grineer Neg", "Puncture Damage Neg", "Status Chance Neg", "Critical Chance On Slide Attack Neg", 
    "Heat Damage Neg", "Damage Vs Infested Neg", "Punch Through Neg", "Range Neg", "Critical Chance Neg", "Channeling Damage Neg"
];

// Store the state of selected buttons for each tab
const tabState = {};

document.addEventListener('DOMContentLoaded', (event) => {
    const dropdowns = [document.getElementById('dropdown1'), document.getElementById('dropdown2'), document.getElementById('dropdown3'), document.getElementById('dropdown4')];
    
    dropdowns.forEach(dropdown => {
        options.forEach(option => {
            let opt = document.createElement('option');
            opt.value = option.toLowerCase().replace(/ /g, '_');
            opt.innerHTML = option;
            dropdown.appendChild(opt);
        });
    });

    document.getElementById('search-bar').addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        const buttons = document.querySelectorAll('.grid-button');
        buttons.forEach(button => {
            const text = button.textContent.toLowerCase();
            button.style.display = text.includes(filter) ? 'block' : 'none';
        });
    });
});

document.getElementById('add-roll-btn').addEventListener('click', function() {
    document.getElementById('roll-popup').style.display = 'flex';
});

document.getElementById('cancel-btn').addEventListener('click', function() {
    document.getElementById('roll-popup').style.display = 'none';
});

document.getElementById('done-btn').addEventListener('click', function() {
    const selectedOptions = [
        document.getElementById('dropdown1').value,
        document.getElementById('dropdown2').value,
        document.getElementById('dropdown3').value,
        document.getElementById('dropdown4').value
    ];

    const rollCard = document.createElement('div');
    rollCard.classList.add('roll-card');
    rollCard.innerHTML = `
        <p>${document.getElementById('dropdown1').selectedOptions[0].text}</p>
        <p>${document.getElementById('dropdown2').selectedOptions[0].text}</p>
        <p>${document.getElementById('dropdown3').selectedOptions[0].text}</p>
        <p>${document.getElementById('dropdown4').selectedOptions[0].text}</p>
    `;

    const rollsContainer = document.getElementById('rolls-container');
    rollsContainer.appendChild(rollCard);

    // Create corresponding tab content
    const tabContent = document.createElement('div');
    tabContent.classList.add('tab-content');
    const tabId = 'tab-' + Date.now();
    tabContent.dataset.tabId = tabId;
    tabContent.innerHTML = `
        <div class="button-grid">
            <button class="grid-button">Rubico</button>
            <button class="grid-button">Quellor</button>
            <button class="grid-button">Dual Ether</button>
            <button class="grid-button">Spectra</button>
            <button class="grid-button">Convectrix</button>
            <button class="grid-button">Hate</button>
            <button class="grid-button">Dread</button>
            <button class="grid-button">Vectis</button>
            <button class="grid-button">Lanka</button>
            <button class="grid-button">Ignis</button>
            <button class="grid-button">Amprex</button>
            <button class="grid-button">Orthos</button>
            <!-- Add more buttons as needed -->
        </div>
    `;
    tabContent.style.display = 'none'; // Initially hide all tabs

    const tabContainer = document.getElementById('tab-container');
    tabContainer.appendChild(tabContent);

    // Add click event to the roll card to show its tab content
    rollCard.addEventListener('click', function() {
        // Hide all other tab contents
        const allTabs = document.querySelectorAll('.tab-content');
        allTabs.forEach(tab => tab.style.display = 'none');
        
        // Show the clicked tab content
        tabContent.style.display = 'block';

        // Initialize grid button functionality
        initializeGridButtons(tabContent, tabId);
    });

    // Scroll to the bottom of the rolls container
    rollsContainer.scrollTop = rollsContainer.scrollHeight;

    document.getElementById('roll-popup').style.display = 'none';
});

// Initialize grid button functionality and restore state
function initializeGridButtons(container, tabId) {
    const buttons = container.querySelectorAll('.grid-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            button.classList.toggle('selected');
            saveTabState(tabId, buttons);
        });
    });

    // Restore button states if they exist
    if (tabState[tabId]) {
        tabState[tabId].forEach((state, index) => {
            if (state) {
                buttons[index].classList.add('selected');
            } else {
                buttons[index].classList.remove('selected');
            }
        });
    }
}

// Save the state of buttons for a given tab
function saveTabState(tabId, buttons) {
    tabState[tabId] = Array.from(buttons).map(button => button.classList.contains('selected'));
}

// Placeholder functions for the new buttons
document.getElementById('generate-config-btn').addEventListener('click', function() {
    alert('Generate Config Code functionality goes here.');
});

document.getElementById('load-config-btn').addEventListener('click', function() {
    alert('Load Config Code functionality goes here.');
});
