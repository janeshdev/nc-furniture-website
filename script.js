// Real product data from research
const products = [
    {
        id: 1,
        name: "Cari Living Room Set",
        category: "living-room",
        price: "$2,710.55",
        originalPrice: "$4,065.82",
        description: "2-piece genuine top grain leather living room set with oversized chair",
        specs: "Genuine Top Grain Leather (5760) | Finance Available",
        image: "images/07192025/517947141_1082562863808950_7429659412832626581_n.jpg",
        saleTag: "Current Price"
    },
    {
        id: 2,
        name: "TV Fireplace Bed",
        category: "bedroom",
        price: "$2,499 - $2,299",
        description: "Modern fireplace bed with Bluetooth speakers and heating",
        specs: "King: $2499 | Queen: $2299 | Up to 43\" TV | Black, Grey and Cream | Fireplace with Bluetooth Speakers (Non Heating)",
        image: "images/07192025/518242492_736420055651463_8099676801801431327_n.jpg",
        saleTag: "Finance Available"
    },
    {
        id: 3,
        name: "Lillian Bedroom Group",
        category: "bedroom",
        price: "$2,625 - $2,850",
        description: "5-piece bedroom set with mirror-accented design",
        specs: "Queen: $2625 5pc | King: $2850 5pc | Model: SETB7100 | Fw10492150 / Fw10492330",
        image: "images/07192025/520433136_1376422653423543_3504502697797951919_n.jpg",
        saleTag: "5 Piece Set"
    },
    {
        id: 4,
        name: "Regentry Dining Set",
        category: "dining",
        price: "$1,299",
        description: "6-piece dining set with table, 4 chairs and bench",
        specs: "6pc Set | 4 Chairs Including The Bench | Traditional Design",
        image: "images/07192025/522711409_1292554475561346_4341206774677281592_n.jpg",
        saleTag: "Finance Available"
    },
    {
        id: 5,
        name: "Tufted Round Bed",
        category: "bedroom",
        price: "Call for Price",
        description: "Luxurious grey tufted round platform bed",
        specs: "Round design | Grey tufted upholstery | Platform style",
        image: "images/07192025/517318366_1846725576194186_3835474709818221857_n.jpg",
        saleTag: "Showroom Special"
    },
    {
        id: 6,
        name: "White Dining Set",
        category: "dining",
        price: "Call for Price",
        description: "Clean modern white dining table with matching chairs",
        specs: "Expandable table | Modern white finish | Multiple chair styles",
        image: "images/07192025/518194682_775700305368092_1534359601341839889_n.jpg",
        saleTag: "Modern Style"
    },
    {
        id: 7,
        name: "Light Wood Bedroom Storage",
        category: "bedroom",
        price: "Call for Price",
        description: "Multi-piece light wood bedroom storage collection",
        specs: "Light wood finish | Multiple storage pieces | Contemporary design",
        image: "images/07192025/517985272_1962804264489757_8281414100968080025_n.jpg",
        saleTag: "Storage Solution"
    },
    {
        id: 8,
        name: "Marble Dining Table",
        category: "dining",
        price: "Call for Price",
        description: "Elegant marble-top dining table with gold accents",
        specs: "Marble top | Gold metal base | Contemporary design | Chairs sold separately",
        image: "images/07192025/517996785_2226809177756600_5900466896445261770_n.jpg",
        saleTag: "Luxury Collection"
    },
    {
        id: 9,
        name: "Traditional Living Room Set",
        category: "living-room",
        price: "Call for Price",
        description: "Elegant traditional sectional with ornate details",
        specs: "Traditional design | Ornate carved details | Premium upholstery",
        image: "images/07192025/519535413_633921069733238_8945421876492363776_n.jpg",
        saleTag: "Traditional Style"
    },
    {
        id: 10,
        name: "Accent Chair",
        category: "living-room",
        price: "$60.09",
        description: "Comfortable grey fabric accent chair",
        specs: "Grey fabric upholstery | Modern design | Comfortable seating",
        image: "images/07192025/520092515_626141633322619_5048469165208385099_n.jpg",
        saleTag: "Great Value"
    }
];

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const productsGrid = document.getElementById('products-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contact-form');

// Modal elements
const modal = document.getElementById('product-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDescription = document.getElementById('modal-description');
const modalSpecs = document.getElementById('modal-specs');
const closeModal = document.querySelector('.close');
const shareBtn = document.getElementById('share-product');

// Current product for modal
let currentProduct = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts('all');
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Product filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            renderProducts(category);
        });
    });

    // Contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });

    // Modal event listeners
    closeModal.addEventListener('click', closeProductModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProductModal();
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeProductModal();
        }
    });

    // Share product functionality
    shareBtn.addEventListener('click', shareProduct);

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
}

// Render products based on category
function renderProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}" onclick="openProductModal(${product.id})">
            <div class="product-image">
                ${product.image.startsWith('images/') 
                    ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
                    : `<i class="${product.image}"></i>`
                }
                ${product.saleTag ? `<div class="sale-tag">${product.saleTag}</div>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    <span class="current-price">${product.price}</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-specs">${product.specs}</div>
            </div>
        </div>
    `).join('');
}

// Handle contact form submission
function handleFormSubmission() {
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        inquiryType: formData.get('inquiry-type'),
        message: formData.get('message')
    };

    // Simulate form submission
    showNotification('Thank you for your message! We will contact you within 24 hours to discuss your furniture needs.', 'success');
    contactForm.reset();
    
    // In a real application, you would send this data to your server
    console.log('Form submission data:', data);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1001;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        }
        .notification-success {
            border-left: 4px solid #28a745;
        }
        .notification-content {
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .notification-close {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: #666;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }

    // Add to page
    document.body.appendChild(notification);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Add loading animation for product cards
function addLoadingAnimation() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Call loading animation after products are rendered
const originalRenderProducts = renderProducts;
renderProducts = function(category) {
    originalRenderProducts(category);
    setTimeout(addLoadingAnimation, 50);
};

// Search functionality (bonus feature)
function addSearchFunctionality() {
    const searchContainer = document.querySelector('.product-filters');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search products...';
    searchInput.className = 'product-search';
    searchInput.style.cssText = `
        padding: 10px 15px;
        border: 2px solid #8B4513;
        border-radius: 25px;
        margin-left: 20px;
        font-size: 14px;
        width: 200px;
    `;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-category');
        
        let filteredProducts = activeFilter === 'all' ? products : products.filter(p => p.category === activeFilter);
        
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
        }
        
        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <i class="${product.image}"></i>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">${product.price}</div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-specs">${product.specs}</div>
                </div>
            </div>
        `).join('');
        
        addLoadingAnimation();
    });

    searchContainer.appendChild(searchInput);
}

// Product Modal Functions
function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;

    // Populate modal content
    modalTitle.textContent = currentProduct.name;
    modalImage.src = currentProduct.image;
    modalImage.alt = currentProduct.name;
    
    // Format price
    let priceHTML = '';
    if (currentProduct.originalPrice) {
        priceHTML = `<span class="original-price">$${currentProduct.originalPrice}</span><span class="current-price">${currentProduct.price}</span>`;
    } else {
        priceHTML = `<span class="current-price">${currentProduct.price}</span>`;
    }
    modalPrice.innerHTML = priceHTML;
    
    modalDescription.textContent = currentProduct.description;
    modalSpecs.textContent = currentProduct.specs;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeProductModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
    currentProduct = null;
}

function shareProduct() {
    if (!currentProduct) return;
    
    if (navigator.share) {
        navigator.share({
            title: currentProduct.name,
            text: `Check out this ${currentProduct.name} at NC Furniture - ${currentProduct.price}`,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        const shareText = `Check out this ${currentProduct.name} at NC Furniture - ${currentProduct.price}\n${window.location.href}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Product link copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Unable to copy link. Please share manually.', 'info');
        });
    }
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addSearchFunctionality, 1000);
});