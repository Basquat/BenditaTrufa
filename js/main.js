document.addEventListener('DOMContentLoaded', function() {
    console.log('Bendita Doçeria website loaded!');

    // Mobile menu functions
    const setupMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');

        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');

        header.querySelector('.container').insertBefore(mobileMenuBtn, nav);

        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!header.contains(event.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    };

    const enhanceProductCards = () => {
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            // Add "add to cart" button to each product card
            const addToCartBtn = document.createElement('div');
            addToCartBtn.classList.add('add-to-cart');
            addToCartBtn.innerHTML = '+';
            card.appendChild(addToCartBtn);

            // Add click event to "add to cart" button
            addToCartBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const productName = card.querySelector('h3').textContent;
                alert(`${productName} adicionado ao carrinho!`);
            });

            // Hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
            });
        });
    };

    // Setup category filters
    const setupCategoryFilters = () => {
        const productSections = document.querySelectorAll('.products h3, .featured-products h2');
        if (productSections.length === 0) return;

        // Create category filters container
        const categoryFiltersContainer = document.createElement('div');
        categoryFiltersContainer.classList.add('category-filters');

        // Add "Todos" filter
        const allFilter = document.createElement('div');
        allFilter.classList.add('category-filter', 'active');
        allFilter.textContent = 'Todos';
        categoryFiltersContainer.appendChild(allFilter);

        // Add filter for each product category
        const categories = [];
        productSections.forEach(section => {
            const categoryName = section.textContent;
            if (!categories.includes(categoryName) && categoryName !== 'Produtos em Destaque') {
                categories.push(categoryName);

                const filter = document.createElement('div');
                filter.classList.add('category-filter');
                filter.textContent = categoryName;
                categoryFiltersContainer.appendChild(filter);
            }
        });

        // Insert filters before the first product section
        const firstProductSection = document.querySelector('.products, .featured-products');
        if (firstProductSection) {
            firstProductSection.insertBefore(categoryFiltersContainer, firstProductSection.firstChild);

            // Add click event to filters
            const filters = document.querySelectorAll('.category-filter');
            filters.forEach(filter => {
                filter.addEventListener('click', function() {
                    // Remove active class from all filters
                    filters.forEach(f => f.classList.remove('active'));
                    // Add active class to clicked filter
                    this.classList.add('active');

                    const category = this.textContent;

                    // Show/hide product sections based on selected category
                    productSections.forEach(section => {
                        const sectionContainer = section.closest('section');
                        const productGrid = section.nextElementSibling;

                        if (category === 'Todos' || section.textContent === category) {
                            section.style.display = 'block';
                            productGrid.style.display = 'grid';
                        } else {
                            section.style.display = 'none';
                            productGrid.style.display = 'none';
                        }
                    });
                });
            });
        }
    };

    const setupSmoothScrolling = () => {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    setupMobileMenu();
    enhanceProductCards();
    setupCategoryFilters();
    setupSmoothScrolling();
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    createDarkModeButton();
    const contactForm = document.querySelector('form.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            if (isValid) {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                this.reset();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }
    // Exemplo de integração com backend Node.js
    fetch('http://localhost:3000/api/usuarios')
        .then(response => response.json())
        .then(data => {
            console.log('Usuários do banco de dados:', data);
        })
        .catch(error => {
            console.error('Erro ao buscar usuários da API:', error);
        });
});

// Função para alternar modo escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Cria botão de modo escuro
function createDarkModeButton() {
    const btn = document.createElement('button');
    btn.className = 'dark-mode-toggle';
    btn.innerHTML = '<span>🌙</span>';
    btn.style.position = 'fixed';
    btn.style.bottom = '24px';
    btn.style.right = '24px';
    btn.style.zIndex = '999';
    btn.style.background = 'var(--primary)';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '50%';
    btn.style.width = '48px';
    btn.style.height = '48px';
    btn.style.fontSize = '1.5rem';
    btn.style.cursor = 'pointer';
    btn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.12)';
    btn.style.transition = 'background 0.3s';
    btn.title = 'Alternar modo escuro';
    btn.onclick = toggleDarkMode;
    document.body.appendChild(btn);
}
