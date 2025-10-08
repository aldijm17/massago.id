const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    // Toggle class 'hidden' untuk menampilkan/menyembunyikan menu
    mobileMenu.classList.toggle('hidden');
});