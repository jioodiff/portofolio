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

// === Phase 1: Theme Toggle Logic ===
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check Local Storage
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
});

// === Phase 2: Particles JS Initialization ===
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 60,
                "density": { "enable": true, "value_area": 800 }
            },
            "color": { "value": ["#6366f1", "#06b6d4", "#8b5cf6"] },
            "shape": { "type": "circle" },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6366f1",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 200, "line_linked": { "opacity": 0.4 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}

// === Phase 2: 3D Tilt Effect for Profile Card ===
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = (y - centerY) / 10;
        const tiltY = (centerX - x) / 10;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
}

// === Phase 4: Skill Filters Logic ===
const filterBtns = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card-enhanced');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.classList.add('hide');
                    }, 300);
                }
            });
        });
    });
}

// === Phase 5: Project Modal Logic ===
const projectData = {
    "1": {
        title: "Sistem Manajemen Universitas",
        desc: "Aplikasi web komprehensif menggunakan PHP, MySQL, dan JS dengan dashboard modern. Fitur termasuk manajemen mahasiswa, dosen, jadwal kuliah, dan sistem penilaian otomatis. Dikembangkan untuk memenuhi kebutuhan skala besar dengan keamanan data tinggi.",
        tags: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
        icon: "fa-university"
    },
    "2": {
        title: "Aplikasi Desktop AI",
        desc: "Software Windows cerdas menggunakan C# WPF dan terintegrasi dengan Python Machine Learning. Mampu menganalisis data gambar secara real-time dan memberikan prediksi dengan akurasi 95%.",
        tags: ["C#", "Python", "TensorFlow", "WPF"],
        icon: "fa-robot"
    },
    "3": {
        title: "Game Engine 2D",
        desc: "Sebuah game engine kustom berkinerja tinggi yang ditulis murni menggunakan C++ dan OpenGL. Mendukung fisika dasar, sistem partikel, collision detection, dan rendering pada 60 FPS stabil.",
        tags: ["C++", "OpenGL", "GameDev"],
        icon: "fa-gamepad"
    }
};

const projectModal = document.getElementById('project-modal');
const closeModalBtn = document.getElementById('close-modal');
const projectDetailBtns = document.querySelectorAll('.project-detail-btn');

// Modal Elements
const mTitle = document.getElementById('modal-title');
const mTags = document.getElementById('modal-tags');
const mDesc = document.getElementById('modal-desc');
const mIcon = document.getElementById('modal-icon');

if (projectModal && projectDetailBtns) {
    projectDetailBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const data = projectData[projectId];
            
            if (data) {
                // Populate Data
                mTitle.textContent = data.title;
                mDesc.textContent = data.desc;
                mIcon.innerHTML = `<i class="fas ${data.icon}"></i>`;
                
                // Populate Tags
                mTags.innerHTML = '';
                data.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.textContent = tag;
                    mTags.appendChild(span);
                });
                
                // Show Modal
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    // Close Modal
    const closeModal = () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close on backdrop click
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });
}
