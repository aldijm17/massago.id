document.addEventListener('DOMContentLoaded', () => {

    // --- FUNGSI UNTUK MENU MOBILE ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Auto-close mobile menu on link click
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- SCROLL ANIMATION & LAZY LOADING DENGAN INTERSECTION OBSERVER ---
    const animatedElements = document.querySelectorAll(".scroll-reveal");
    const lazyLoadImages = document.querySelectorAll(".lazy-load");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate elements
                if (entry.target.classList.contains('scroll-reveal')) {
                    entry.target.classList.add("animate");
                }
                
                // Lazy load images
                if (entry.target.classList.contains('lazy-load')) {
                    const image = entry.target;
                    const skeleton = image.nextElementSibling;
                    
                    image.src = image.dataset.src;
                    image.onload = () => {
                        image.style.display = 'block';
                        skeleton.style.display = 'none';
                    };
                }
                
                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
    lazyLoadImages.forEach(img => observer.observe(img));

    // --- FUNGSI UNTUK NAVBAR AKTIF SAAT SCROLL (SCROLLSPY) ---
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-links .nav-link");

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, { rootMargin: "-50% 0px -50% 0px" });

    sections.forEach(section => spyObserver.observe(section));

    // --- FUNGSI BARU UNTUK FORM ORDER POP-UP (MODAL) ---
    const orderModal = document.getElementById('order-modal');
    const openOrderButtons = document.querySelectorAll('#open-order-modal, #open-order-modal-2');
    const closeOrderModalBtn = document.getElementById('close-order-modal');
    const whatsappForm = document.getElementById('whatsapp-form');

    const openModal = () => {
        orderModal.classList.remove('hidden');
        orderModal.classList.add('show');
        document.body.classList.add('no-scroll'); // Background scroll lock
    };

    const closeModal = () => {
        orderModal.classList.remove('show');
        orderModal.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    };

    openOrderButtons.forEach(btn => btn.addEventListener('click', openModal));
    closeOrderModalBtn.addEventListener('click', closeModal);

    orderModal.addEventListener('click', (event) => {
        if (event.target === orderModal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && orderModal.classList.contains('show')) {
            closeModal();
        }
    });

    whatsappForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nama = document.getElementById('nama').value;
        const telepon = document.getElementById('telepon').value;
        const alamat = document.getElementById('alamat').value;
        const noTujuan = '6285173356206';
        const pesan = `Halo Massago, saya ingin memesan layanan pijat.\n\nNama : ${nama}\nNo. Telepon : ${telepon}\nAlamat : ${alamat}\n\nMohon informasinya lebih lanjut. Terima kasih.`;
        const urlWA = `https://wa.me/${noTujuan}?text=${encodeURIComponent(pesan)}`;
        
        window.open(urlWA, '_blank');
        closeModal();
    });
});