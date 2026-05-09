(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initKeyboardNavigation();
        initReducedMotionCheck();
        initExternalLinks();
        initPageReveal();
    }

    function initKeyboardNavigation() {
        // Track if user is using keyboard
        let isKeyboardUser = false;

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Tab') {
                isKeyboardUser = true;
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', function () {
            isKeyboardUser = false;
            document.body.classList.remove('keyboard-nav');
        });

        // Allow Escape key to blur focused elements
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && document.activeElement) {
                document.activeElement.blur();
            }
        });
    }

    function initReducedMotionCheck() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        function handleMotionPreference(e) {
            if (e.matches) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        }

        // Initial check
        handleMotionPreference(mediaQuery);

        // Listen for changes
        mediaQuery.addEventListener('change', handleMotionPreference);
    }

    function initExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');

        externalLinks.forEach(function (link) {
            if (!link.hasAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }

            if (!link.querySelector('.sr-only')) {
                const srText = document.createElement('span');
                srText.className = 'sr-only';
                srText.textContent = ' (opens in new tab)';
                link.appendChild(srText);
            }
        });
    }

    function initPageReveal() {
        window.requestAnimationFrame(function () {
            document.body.classList.add('is-ready');
        });
    }

})();
