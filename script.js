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
        const noTujuan = '6282386604721';
        const pesan = `Halo Massago, saya ingin memesan layanan pijat.\n\nNama : ${nama}\nNo. Telepon : ${telepon}\nAlamat : ${alamat}\n\nMohon informasinya lebih lanjut. Terima kasih.`;
        const urlWA = `https://wa.me/${noTujuan}?text=${encodeURIComponent(pesan)}`;
        
        window.open(urlWA, '_blank');
        closeModal();
    });
});
// --- TESTIMONIAL CAROUSEL ---
const carousel = document.getElementById('testimonial-carousel');
const slides = carousel.children;
const totalSlides = slides.length;
const nextBtn = document.getElementById('next-testimonial');
const prevBtn = document.getElementById('prev-testimonial');
const indicators = document.querySelectorAll('.carousel-indicator');

let index = 0;

function updateCarousel() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
  indicators.forEach((dot, i) => {
    dot.classList.toggle('bg-brand-teal', i === index);
    dot.classList.toggle('bg-slate-400', i !== index);
    dot.classList.toggle('opacity-70', i === index);
    dot.classList.toggle('opacity-50', i !== index);
  });
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % totalSlides;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

// Klik indikator manual
indicators.forEach(dot => {
  dot.addEventListener('click', () => {
    index = parseInt(dot.dataset.slide);
    updateCarousel();
  });
});

// Auto slide setiap 6 detik
setInterval(() => {
  index = (index + 1) % totalSlides;
  updateCarousel();
}, 6000);

// --- EFEK PARALAKS UNTUK HERO SECTION ---
// --- EFEK PARALAKS UNTUK HERO SECTION ---
window.addEventListener('scroll', () => {

    // Cek apakah layar lebih besar dari 768px (bukan mobile)
    if (window.innerWidth > 768) { 
        const hero = document.querySelector('.hero-bg');
        if (!hero) return;

        // Ambil nilai scroll dan sesuaikan kecepatan
        const offset = window.scrollY * 0.4; // kecepatan efek
        hero.style.backgroundPositionY = `${offset}px`;

    } else {
        // Jika di mobile, kembalikan posisi background ke default
        const hero = document.querySelector('.hero-bg');
        if (hero) {
            // Setel kembali ke 'center' agar tidak bergeser
            hero.style.backgroundPositionY = 'center'; 
        }
    }
});
// --- NAVBAR SHRINK ON SCROLL ---
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('shadow-md', 'py-2');
  } else {
    header.classList.remove('shadow-md', 'py-2');
  }
});
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('bg-white/90', 'backdrop-blur-sm');
  } else {
    header.classList.remove('bg-white/90', 'backdrop-blur-sm');
  }
});
// --- BARU: FUNGSI UNTUK MODAL "JOIN US" ---
    const joinUsModal = document.getElementById('join-us-modal');
    const openJoinModalBtn = document.getElementById('open-join-modal');
    const closeJoinModalBtn = document.getElementById('close-join-modal');
    const joinUsForm = document.getElementById('join-us-form');

    // Definisikan fungsi closeJoinModal di scope ini agar keydown listener bisa akses
    let closeJoinModal = () => {};

    // Pastikan elemen-elemen ada sebelum menambahkan event listener
    if (joinUsModal && openJoinModalBtn && closeJoinModalBtn && joinUsForm) {
        
        const openJoinModal = () => {
            joinUsModal.classList.remove('hidden');
            joinUsModal.classList.add('show');
            document.body.classList.add('no-scroll');
        };

        // Assign fungsi ke variabel di scope luar
        closeJoinModal = () => {
            joinUsModal.classList.remove('show');
            joinUsModal.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        };

        openJoinModalBtn.addEventListener('click', openJoinModal);
        closeJoinModalBtn.addEventListener('click', closeJoinModal);

        joinUsModal.addEventListener('click', (event) => {
            if (event.target === joinUsModal) {
                closeJoinModal();
            }
        });

        joinUsForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nama = document.getElementById('nama_join').value;
            const telepon = document.getElementById('telepon_join').value;
            const npwp = document.getElementById('npwp_join').value || 'Tidak diisi';
            const pengalaman = document.getElementById('pengalaman_join').value;
            
            // Nomor WA tujuan (sama dengan yang di 'Join Us' a href)
            const noTujuan = '6282386908721';
            
            const pesan = `Halo Massago, saya tertarik untuk bergabung sebagai praktisi.\n\nNama: ${nama}\nNo. Telepon: ${telepon}\nNPWP: ${npwp}\nPengalaman: ${pengalaman}\n\n dan berikut foto saya. Mohon informasinya lebih lanjut. Terima kasih.`;
            
            const urlWA = `https://wa.me/${noTujuan}?text=${encodeURIComponent(pesan)}`;
            
            window.open(urlWA, '_blank');
            closeJoinModal();
        });
    }
    
    // --- MODIFIKASI: Close modal with Escape key (Handles both) ---
    // Hapus listener keydown yang lama jika ada, dan ganti dengan ini
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (orderModal.classList.contains('show')) {
                closeModal(); // Fungsi lama untuk order modal
            }
            // Pastikan joinUsModal ada sebelum cek classList
            if (joinUsModal && joinUsModal.classList.contains('show')) {
                closeJoinModal(); // Fungsi baru untuk join modal
            }
        }
    });
