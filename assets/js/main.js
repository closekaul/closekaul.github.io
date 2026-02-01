document.addEventListener('DOMContentLoaded', () => {
    
    // --- Feed Filtering Logic ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const contentItems = document.querySelectorAll('.content-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            contentItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Reset animation
                item.style.animation = 'none';
                item.offsetHeight; /* trigger reflow */

                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'flex';
                    // Apply nice slide-in animation
                    item.style.animation = 'slideInRight 0.4s ease-out forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- Contact Modal Logic ---
    const modal = document.getElementById('contact-modal');
    const contactBtn = document.getElementById('contact-btn');
    const closeBtn = document.querySelector('.close-modal');
    const copyBtn = document.getElementById('copy-btn');
    const emailText = document.getElementById('email-text');
    const copySuccess = document.getElementById('copy-success');

    // Add event listener to nav "Contact" link as well if it exists
    const navContact = document.querySelector('a[href^="mailto"]');
    if (navContact) {
        navContact.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    }

    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            copySuccess.style.display = 'none';
        });
    }

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            copySuccess.style.display = 'none';
        }
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailText.innerText).then(() => {
                copySuccess.style.display = 'block';
                setTimeout(() => {
                    copySuccess.style.display = 'none';
                }, 2000);
            });
        });
    }
});
