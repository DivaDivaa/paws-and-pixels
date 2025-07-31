// Product data definition. Each product belongs to one of the defined categories.
const products = [
  // Pets category
  {
    id: 1,
    name: 'Interactive Cat Puzzle Toy',
    category: 'pets',
    price: 19.99,
    description: 'Motion-activated puzzle toy with feathers and treats that keeps indoor cats engaged and reduces boredom.',
    icon: 'fa-cat',
    color: '#fbbf24'
  },
  {
    id: 2,
    name: 'Indestructible Dog Chew Toy',
    category: 'pets',
    price: 17.99,
    description: 'Durable rubber chew toy designed for power chewers. Built to withstand aggressive gnawing.',
    icon: 'fa-bone',
    color: '#e879f9'
  },
  {
    id: 3,
    name: 'No-Pull Dog Harness',
    category: 'pets',
    price: 24.99,
    description: 'Breathable harness with front-clip design to stop pulling and reflective strips for night safety.',
    icon: 'fa-dog',
    color: '#6ee7b7'
  },
  {
    id: 4,
    name: 'Pet Grooming Gloves',
    category: 'pets',
    price: 12.99,
    description: 'Silicone grooming gloves that remove loose fur while massaging your pet during brushing or bath time.',
    icon: 'fa-hand-sparkles',
    color: '#fcd34d'
  },
  {
    id: 5,
    name: 'Slow-Feeder Dog Bowl',
    category: 'pets',
    price: 14.99,
    description: 'Bowl with obstacles that slows down eating to prevent choking and aid digestion.',
    icon: 'fa-utensils',
    color: '#34d399'
  },
  {
    id: 6,
    name: 'Portable Pet Water Bottle',
    category: 'pets',
    price: 21.99,
    description: '3-in-1 water bottle with built-in bowl, food compartment and waste-bag holder. Perfect for travel.',
    icon: 'fa-droplet',
    color: '#60a5fa'
  },
  {
    id: 7,
    name: 'LED Rechargeable Dog Collar',
    category: 'pets',
    price: 16.99,
    description: 'USB-rechargeable collar with bright LED lights and multiple modes for safe night walks.',
    icon: 'fa-lightbulb',
    color: '#f472b6'
  },
  {
    id: 8,
    name: 'Dog Training Clicker Kit',
    category: 'pets',
    price: 9.99,
    description: 'Kit including clicker, whistle and mini guide for positive reinforcement training.',
    icon: 'fa-bell',
    color: '#93c5fd'
  },
  {
    id: 9,
    name: 'Dog Snuffle Mat',
    category: 'pets',
    price: 21.99,
    description: 'Washable fleece mat with pockets for hiding treats to stimulate your dog’s natural foraging instincts.',
    icon: 'fa-puzzle-piece',
    color: '#fca5a5'
  },
  // Eco-friendly category
  {
    id: 10,
    name: 'Biodegradable Poop Bags',
    category: 'eco',
    price: 10.99,
    description: 'Roll of 120 eco-friendly cornstarch bags with dispenser. Breaks down naturally in landfills.',
    icon: 'fa-leaf',
    color: '#a3e635'
  },
  // Digital category
  {
    id: 11,
    name: 'Digital Planner Bundle',
    category: 'digital',
    price: 9.99,
    description: 'Instant-download planner set with daily, weekly and monthly pages for tablets or printable use.',
    icon: 'fa-calendar-days',
    color: '#38bdf8'
  },
  {
    id: 12,
    name: 'Social Media Template Pack',
    category: 'digital',
    price: 14.99,
    description: 'Canva-ready templates for polished Instagram posts, stories and reels. Boost your brand visuals.',
    icon: 'fa-file-lines',
    color: '#0ea5e9'
  },
  {
    id: 13,
    name: 'Custom Pet Art Print',
    category: 'digital',
    price: 24.99,
    description: 'Commission a digital illustration of your pet. Receive a high-resolution file to print or share.',
    icon: 'fa-palette',
    color: '#7dd3fc'
  }
];

// State for cart items. Each entry: { id, quantity }
let cart = [];

// Render product cards based on category filter
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    // Icon container
    const iconWrap = document.createElement('div');
    iconWrap.className = 'product-icon';
    iconWrap.style.background = product.color;
    const iconEl = document.createElement('i');
    iconEl.className = `fa-solid ${product.icon}`;
    iconWrap.appendChild(iconEl);
    // Product name
    const nameEl = document.createElement('h4');
    nameEl.textContent = product.name;
    // Description
    const descEl = document.createElement('p');
    descEl.textContent = product.description;
    // Price
    const priceEl = document.createElement('div');
    priceEl.className = 'price';
    priceEl.textContent = `$${product.price.toFixed(2)}`;
    // Add button
    const btn = document.createElement('button');
    btn.textContent = 'Add to cart';
    btn.setAttribute('data-id', product.id);
    btn.addEventListener('click', () => addToCart(product.id));
    // Assemble card
    card.appendChild(iconWrap);
    card.appendChild(nameEl);
    card.appendChild(descEl);
    card.appendChild(priceEl);
    card.appendChild(btn);
    grid.appendChild(card);
  });
}

// Add product to cart
function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }
  updateCartCount();
}

// Remove product from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartCount();
  updateCartModal();
}

// Update cart count displayed on cart icon
function updateCartCount() {
  const countEl = document.getElementById('cartCount');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  countEl.textContent = totalItems;
}

// Build the cart modal UI
function updateCartModal() {
  const list = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  list.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;
    const li = document.createElement('li');
    li.innerHTML = `<span>${product.name} x${item.quantity}</span><span>$${(product.price * item.quantity).toFixed(2)}</span>`;
    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-item';
    removeBtn.textContent = 'remove';
    removeBtn.addEventListener('click', () => removeFromCart(item.id));
    li.appendChild(removeBtn);
    list.appendChild(li);
    total += product.price * item.quantity;
  });
  totalEl.textContent = `$${total.toFixed(2)}`;
}

// Open cart modal
function openCart() {
  updateCartModal();
  document.getElementById('cartModal').style.display = 'flex';
}

// Close cart modal
function closeCart() {
  document.getElementById('cartModal').style.display = 'none';
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartCount();
  // Filter button handlers
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      renderProducts(category);
    });
  });
  // Cart open/close
  document.getElementById('cartButton').addEventListener('click', openCart);
  document.getElementById('closeCartBtn').addEventListener('click', closeCart);
  // Checkout button
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Add some products before checking out.');
      return;
    }
    alert('Thank you for your interest! Checkout functionality will be handled by ChatGPT. For now, note your order details and contact us to proceed.');
    // Optionally clear cart after checkout
    cart = [];
    updateCartCount();
    updateCartModal();
    closeCart();
  });
});