/*script.js*/
// Simulação de um catálogo de produtos
const products = [
  { id: 1, name: "Placa de Vídeo RTX 4060", price: 2599.99, image: "placeholder_gpu.png" },
  { id: 2, name: "Processador Intel i5 13ª Gen", price: 1550.00, image: "placeholder_cpu.png" },
  { id: 3, name: "Memória RAM DDR5 16GB", price: 450.50, image: "placeholder_ram.png" },
  { id: 4, name: "SSD NVMe 1TB", price: 350.90, image: "placeholder_ssd.png" }
];

let cart = []; // Array para armazenar os itens do carrinho

// Função para renderizar os produtos na tela
function renderProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; // Limpa a lista antes de adicionar

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
            <img src="https://via.placeholder.com/200x180" alt="${product.name}" class="product-image">
            <h4>${product.name}</h4>
            <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
            <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
        `;
    productList.appendChild(card);
  });
}

// Função para adicionar um produto ao carrinho
function addToCart(productId) {
  const product = products.find(p => p.id === productId);

  if (product) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
    alert(`${product.name} adicionado ao carrinho!`);
  }
}

// Função para atualizar o contador e o modal do carrinho
function updateCartDisplay() {
  const cartCount = document.getElementById('cart-count');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartTotal = document.getElementById('cart-total');

  // 1. Contador do Carrinho
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // 2. Itens no Modal
  cartItemsList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    li.textContent = `${item.name} (x${item.quantity}) - R$ ${itemTotal.toFixed(2).replace('.', ',')}`;
    cartItemsList.appendChild(li);
  });

  // 3. Total do Carrinho
  cartTotal.textContent = total.toFixed(2).replace('.', ',');
}

// --- Event Listeners e Inicialização ---

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();

  // Evento para adicionar ao carrinho
  document.getElementById('product-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
      const productId = parseInt(event.target.getAttribute('data-id'));
      addToCart(productId);
    }
  });

  // --- Lógica do Modal do Carrinho ---
  const cartIcon = document.querySelector('.cart-icon');
  const modal = document.getElementById('cart-modal');
  const closeButton = document.querySelector('.close-button');

  cartIcon.onclick = function () {
    modal.style.display = "block";
    updateCartDisplay(); // Garante que o modal esteja atualizado ao abrir
  }

  closeButton.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Ação do botão Finalizar Compra
  document.querySelector('.checkout-button').onclick = function () {
    if (cart.length > 0) {
      alert("Parabéns, sua compra foi finalizada! O total foi de R$ " + document.getElementById('cart-total').textContent);
      cart = []; // Limpa o carrinho
      updateCartDisplay();
      modal.style.display = "none";
    } else {
      alert("Seu carrinho está vazio!");
    }
  }

});