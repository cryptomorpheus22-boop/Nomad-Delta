document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileDrawerClose = document.getElementById('mobileDrawerClose');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openDrawer() {
        mobileDrawer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openDrawer);
    if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeDrawer);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // --- Smooth Scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Secondary CTA in hero custom smooth scroll
    const scrollTriggers = document.querySelectorAll('.scroll-trigger');
    scrollTriggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- AI Safari Planner Logic ---
    let selectedDuration = null;
    const durationSelectors = document.querySelectorAll('.pill-btn');
    const safariInput = document.getElementById('safariInput');
    const plannerSubmitBtn = document.getElementById('plannerSubmitBtn');

    const resultContainer = document.getElementById('plannerResultContainer');
    const loadingState = document.getElementById('plannerLoading');
    const outputState = document.getElementById('plannerOutput');
    const generatedTextEl = document.getElementById('generatedItineraryText');
    const refineWhatsappBtn = document.getElementById('refineWhatsappBtn');

    // Handle duration selection
    durationSelectors.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            durationSelectors.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            selectedDuration = btn.getAttribute('data-value');
            checkSubmitState();
        });
    });

    // Handle text input
    safariInput.addEventListener('input', () => {
        checkSubmitState();
    });

    // Enable/disable submit
    function checkSubmitState() {
        const textValue = safariInput.value.trim();
        if (selectedDuration && textValue.length > 2) {
            plannerSubmitBtn.removeAttribute('disabled');
        } else {
            plannerSubmitBtn.setAttribute('disabled', 'true');
        }
    }

    // Submit Action
    plannerSubmitBtn.addEventListener('click', () => {
        const textValue = safariInput.value.trim();
        if (!selectedDuration || !textValue) return;

        // UI Updates: Show Loading
        resultContainer.classList.remove('hidden');
        loadingState.classList.remove('hidden');
        outputState.classList.add('hidden');
        plannerSubmitBtn.setAttribute('disabled', 'true');

        // Simulate network delay for "AI generation"
        setTimeout(() => {
            // Generate a simple contextualized response based on selection
            const itinerary = `For your ${selectedDuration} adventure, we'd recommend starting at our Moremi mobile camp for prime leopard sightings, then moving to a fly-in luxury camp on Chief's Island. Your final days would be spent on a private mokoro trail through the papyrus channels.`;

            generatedTextEl.textContent = itinerary;

            const waBaseUrl = 'https://wa.me/26771849133';
            const waText = `Hi! I used the Planner.\n\nDuration: ${selectedDuration}\nDreams: ${textValue}\n\nSuggested Plan: ${itinerary}\n\nI'd like to officially plan this journey.`;
            refineWhatsappBtn.href = `${waBaseUrl}?text=${encodeURIComponent(waText)}`;

            // Hide Loading, Show Output
            loadingState.classList.add('hidden');
            outputState.classList.remove('hidden');
            plannerSubmitBtn.removeAttribute('disabled');
        }, 1500); // 1.5 second fake delay
    });

    // Optional: Submit on Enter key
    safariInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !plannerSubmitBtn.hasAttribute('disabled')) {
            plannerSubmitBtn.click();
        }
    });

});
