// Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Category Filter Functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        const carouselView = document.getElementById('carouselView');
        const gridView = document.getElementById('gridView');

        // Product data for grid view
        const allProducts = [
            // Shoes
            { category: 'shoes', name: 'Air Jordan 40 \'The Classic\'', price: '₦575,000', description: 'White leather & black nubuck with Zoom Strobel and ZoomX foam cushioning', frontImg: 'images/Jordan.webp', backImg: 'images/Jordan-back.webp' },
            { category: 'shoes', name: 'Nike Book 1 \'Night\'', price: '₦440,000', description: 'Black mesh with iridescent Swoosh, Cushlon midsole with Zoom Air heel unit', frontImg: 'images/book.webp', backImg: 'images/book-back.webp' },
            { category: 'shoes', name: '2025 LeBron 21 ‘Prime 93’', price: '₦452,000', description: 'White leather & black nubuck with Zoom Strobel and ZoomX foam cushioning', frontImg: 'images/lebron.webp', backImg: 'images/lebron-back.webp' },
            // Slides
            { category: 'slides', name: 'New Season Dolce & Gabbana Fly Slides', price: '₦1,500,000', description: 'Premium cream leather slides with signature D&G styling and luxury Italian craftsmanship', frontImg: 'images/dngslide.webp', backImg: 'images/dngslide-back.webp' },
            {category: 'slides', name: 'Nike Air Max 1 “Alr Brown” Slides', price: '₦198,000', description: 'Premium cream leather slides with signature D&G styling and luxury Italian craftsmanship', frontImg: 'images/nike.webp', backImg: 'images/nike-back.webp' },
            // Caps
            { category: 'caps', name: '2025 Kith & Wilson Polyfoam Nolan Trucker Hat \'Nocturnal\'', price: '₦1,200,000', description: 'White trucker hat with blue front panel, featuring Kith logo and tennis racket design', frontImg: 'images/knw.webp', backImg: 'images/knw-back.webp' },
            { category: 'caps', name: 'Supreme Corduroy Camp Cap', price: '₦267,000', description: 'White trucker hat with blue front panel, featuring Kith logo and tennis racket design', frontImg: 'images/supr.webp', backImg: 'images/supr-back.webp' },
            // Socks
            { category: 'socks', name: 'Supreme x Jordan Crew Socks \'White\'', price: '₦150,000', description: 'Premium white crew socks from the exclusive Supreme x Jordan collaboration', frontImg: 'images/sxj.webp', backImg: 'images/sxj-back.webp' },
            { category: 'socks', name: 'Supreme x Nike Lightweight Crew Socks ‘Black’', price: '₦191,000', description: 'Premium white crew socks from the exclusive Supreme x Jordan collaboration', frontImg: 'images/sxn.webp', backImg: 'images/sxn-back.webp' },
            // Glasses
            { category: 'glasses', name: 'Ray-Ban Round-Frame Sunglasses', price: '₦274,000', description: 'Classic round-frame sunglasses with premium Ray-Ban craftsmanship and UV protection', frontImg: 'images/rayban.webp', backImg: 'images/rayban-back.webp' },
            { category: 'glasses', name: '2023 Oakley Sutro Lite Sweep Sunglasses ’Black’', price: '₦435,000', description: 'Classic round-frame sunglasses with premium Ray-Ban craftsmanship and UV protection', frontImg: 'images/oak.webp', backImg: 'images/oak-back.webp' },
        ];

        function createProductCard(product) {
            return `
                <div class="product-card">
                    <div class="product-images">
                        <img src="${product.frontImg}" alt="${product.name} Front" class="product-image front">
                        <img src="${product.backImg}" alt="${product.name} Back" class="product-image back">
                    </div>
                    <div class="product-info">
                        <h4 class="product-name">${product.name}</h4>
                        <p class="product-price">${product.price}</p>
                        <p class="product-description">${product.description}</p>
                        <button class="whatsapp-btn">Shop on WhatsApp</button>
                    </div>
                </div>
            `;
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');

                if (category === 'all') {
                    // Show carousel view
                    carouselView.style.display = 'block';
                    gridView.classList.remove('active');
                } else {
                    // Show grid view with filtered products
                    carouselView.style.display = 'none';
                    gridView.classList.add('active');

                    const filteredProducts = allProducts.filter(product => product.category === category);
                    gridView.innerHTML = filteredProducts.map(createProductCard).join('');
                }
            });
        });

        // Carousel scroll functionality
        function addCarouselControls() {
            const carousels = document.querySelectorAll('.carousel-container');
            
            carousels.forEach(carousel => {
                // Add touch/swipe support
                let isDown = false;
                let startX;
                let scrollLeft;

                carousel.addEventListener('mousedown', (e) => {
                    isDown = true;
                    carousel.style.cursor = 'grabbing';
                    startX = e.pageX - carousel.offsetLeft;
                    scrollLeft = carousel.scrollLeft;
                });

                carousel.addEventListener('mouseleave', () => {
                    isDown = false;
                    carousel.style.cursor = 'grab';
                });

                carousel.addEventListener('mouseup', () => {
                    isDown = false;
                    carousel.style.cursor = 'grab';
                });

                carousel.addEventListener('mousemove', (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - carousel.offsetLeft;
                    const walk = (x - startX) * 2;
                    carousel.scrollLeft = scrollLeft - walk;
                });

                // Touch events for mobile
                carousel.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].pageX - carousel.offsetLeft;
                    scrollLeft = carousel.scrollLeft;
                }, { passive: true });

                carousel.addEventListener('touchmove', (e) => {
                    const x = e.touches[0].pageX - carousel.offsetLeft;
                    const walk = (x - startX) * 2;
                    carousel.scrollLeft = scrollLeft - walk;
                }, { passive: true });
            });
        }

        // Initialize carousel controls
        addCarouselControls();

        // Product card click toggle for image switching and WhatsApp functionality
        document.addEventListener('click', (e) => {
            if (e.target.closest('.product-images')) {
                const productCard = e.target.closest('.product-card');
                productCard.classList.toggle('toggled');
            }
            
            if (e.target.classList.contains('whatsapp-btn')) {
                const productCard = e.target.closest('.product-card');
                const productName = productCard.querySelector('.product-name').textContent;
                const productPrice = productCard.querySelector('.product-price').textContent;
                
                const message = `Hi! I'm interested in the ${productName} (${productPrice}). Can you provide more details?`;
                const whatsappUrl = `https://wa.me/2347069100604?text=${encodeURIComponent(message)}`;
                
                window.open(whatsappUrl, '_blank');
            }
        });

        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        });

        // Preload images for better performance
        function preloadImages() {
            const imageUrls = allProducts.flatMap(product => [product.frontImg, product.backImg]);
            imageUrls.forEach(url => {
                const img = new Image();
                img.src = url;
            });
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            preloadImages();
            
            // Add intersection observer for product cards
            const productObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.product-card').forEach(card => {
                productObserver.observe(card);
            });
        });