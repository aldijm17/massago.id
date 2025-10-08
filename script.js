// Pilih elemen yang dibutuhkan dari HTML
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const navLinks = document.querySelector('.nav-links');

// Tambahkan 'event listener' untuk klik pada ikon menu
mobileMenuIcon.addEventListener('click', () => {
    // Toggle class 'active' pada kedua elemen
    // Ini akan memicu perubahan di CSS
    navLinks.classList.toggle('active');
    mobileMenuIcon.classList.toggle('active');
});