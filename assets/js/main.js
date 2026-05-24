// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links li a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Scroll Animation with Intersection Observer
const faders = document.querySelectorAll('.fade-in, .skill-card');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');

            // If it's a skill card, animate the progress bar
            if (entry.target.classList.contains('skill-card')) {
                const progress = entry.target.querySelector('.progress');
                if (progress) {
                    const width = progress.style.width;
                    progress.style.width = '0';
                    setTimeout(() => {
                        progress.style.transition = 'width 1s ease-in-out';
                        progress.style.width = width;
                    }, 200);
                }
            }

            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Form Submission with FormSubmit API (Sends notification to zioadriann@gmail.com)
const contactForm = document.querySelector('.contact-form-enhanced');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalContent = btn.innerHTML;

        btn.innerHTML = 'Mengirim... <i class="fas fa-spinner fa-spin" style="margin-left:8px;"></i>';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Tambahkan subject untuk email dari FormSubmit
        data['_subject'] = 'Diskusi Baru dari Portofolio Web!';

        fetch('https://formsubmit.co/ajax/zioadriann@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal mengirim pesan.');
            }
            return response.json();
        })
        .then(res => {
            btn.innerHTML = 'Terkirim! <i class="fas fa-check" style="margin-left:8px;"></i>';
            btn.style.background = '#10b981'; // Warna hijau sukses
            contactForm.reset();
            
            // Notifikasi aktivasi untuk pertama kali
            alert('Pesan berhasil terkirim! \n\nCatatan: Jika ini pengiriman pertama kali, cek email Anda di (zioadriann@gmail.com) dan klik link aktivasi dari FormSubmit agar pesan selanjutnya dapat otomatis masuk.');
        })
        .catch(err => {
            console.error(err);
            btn.innerHTML = 'Gagal Mengirim <i class="fas fa-exclamation-triangle" style="margin-left:8px;"></i>';
            btn.style.background = '#ef4444'; // Warna merah error
        })
        .finally(() => {
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = ''; // Reset style default
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 6000);
        });
    });
}
