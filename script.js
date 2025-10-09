// --- FUNGSI UNTUK MENU MOBILE ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// --- FUNGSI UNTUK ANIMASI FADE-IN SAAT SCROLL ---
const scrollElements = document.querySelectorAll(".scroll-reveal");

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add("animate");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    })
}

window.addEventListener("scroll", () => { 
    handleScrollAnimation();
});

// --- FUNGSI UNTUK NAVBAR AKTIF SAAT SCROLL (SCROLLSPY) ---
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5 
};

const observer = new IntersectionObserver((entries) => {
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
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});


// --- FUNGSI BARU UNTUK FORM ORDER POP-UP (MODAL) ---
const orderModal = document.getElementById('order-modal');
const openOrderModalBtn = document.getElementById('open-order-modal');
const openOrderModalBtn2 = document.getElementById('open-order-modal-2'); // Tombol kedua
const closeOrderModalBtn = document.getElementById('close-order-modal');
const whatsappForm = document.getElementById('whatsapp-form');

// Fungsi untuk membuka modal
const openModal = () => {
    orderModal.classList.remove('hidden');
};

// Fungsi untuk menutup modal
const closeModal = () => {
    orderModal.classList.add('hidden');
};

// Event listener untuk tombol-tombol
openOrderModalBtn.addEventListener('click', openModal);
openOrderModalBtn2.addEventListener('click', openModal);
closeOrderModalBtn.addEventListener('click', closeModal);

// Menutup modal jika klik di luar area form
orderModal.addEventListener('click', (event) => {
    if (event.target === orderModal) {
        closeModal();
    }
});

// Event listener untuk form submission
whatsappForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Mencegah form reload halaman

    // Ambil data dari form
    const nama = document.getElementById('nama').value;
    const telepon = document.getElementById('telepon').value;
    const alamat = document.getElementById('alamat').value;

    // Nomor WhatsApp tujuan
    const noTujuan = '085173356206';

    // Format pesan untuk WhatsApp
    const pesan = `Halo Massago, saya ingin memesan layanan pijat.

Nama : ${nama}
No. Telepon : ${telepon}
Alamat : ${alamat}

Mohon informasinya lebih lanjut. Terima kasih.`;

    // Buat URL WhatsApp
    const urlWA = `https://wa.me/${noTujuan}?text=${encodeURIComponent(pesan)}`;

    // Arahkan ke WhatsApp
    window.open(urlWA, '_blank');

    // Tutup modal setelah submit
    closeModal();
});