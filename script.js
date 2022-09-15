// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const items = document.getElementsByClassName('items');

const p = document.createElement('p');
p.className = 'loading';
p.innerText = 'carregando...';
items[0].appendChild(p);

const insertProducts = async () => {
  const dados = await fetchProducts('computador');
  for (let i = 0; i < dados.length; i += 1) {
    const section = createProductItemElement(dados[i]);
    items[0].appendChild(section);
  }
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
let dados = getSavedCartItems() || 0;

if (dados === [] || dados === undefined) {
  localStorage.setItem('cartItems', []);
}

const cart = document.getElementsByClassName('cart__items');

const saveCart = () => {
  const itemsArray = Array(0).fill(0);
  localStorage.clear();
  const products = cart[0].childNodes;
  for (let i = 0; i < products.length; i += 1) {
    itemsArray.push(products[i].innerText);
  }
  saveCartItems(JSON.stringify(itemsArray));
};

const pTotal = document.getElementsByClassName('total-price');
pTotal[0].innerText = localStorage.getItem('sumCart');

const sumItemsCart = async () => {
  const products = cart[0].childNodes;
  soma = 0;
  if (products.length === 0) {
    pTotal[0].innerText = 0;
  }
  for (let i = 0; i < products.length; i += 1) {
    const number = products[i].innerText.split('$');
    soma += Number(number[1]);
    pTotal[0].innerText = soma;
  }
  localStorage.setItem('sumCart', JSON.stringify(soma));
};

const cartItemClickListener = (event) => {
  cart[0].removeChild(event.target);
  saveCart();
  sumItemsCart();
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const setItemsCart = async (event) => {
  const product = event.target.parentNode;
  const idItem = getIdFromProductItem(product);
  const { id, title, price } = await fetchItem(idItem);
  const object = { id, title, price };
  const selectProd = createCartItemElement(object);
  cart[0].appendChild(selectProd);
  saveCart();
  sumItemsCart();
};

const savedsCartItems = () => {
  dados = JSON.parse(dados);
  for (let i = 0; i < dados.length; i += 1) {
    const li = document.createElement('li');
    li.addEventListener('click', cartItemClickListener);
    li.innerText = dados[i];
    cart[0].appendChild(li);
  }
};

const emptyCart = () => {
  cart[0].innerHTML = '';
  saveCart();
  sumItemsCart();
};

window.onload = async () => {
  await insertProducts();
  items[0].removeChild(p);
  savedsCartItems(); 
  const buttonProduct = document.querySelectorAll('.item__add');
  for (let i = 0; i < buttonProduct.length; i += 1) {
    buttonProduct[i].addEventListener('click', setItemsCart);
  }
  const buttonEmptyCart = document.querySelector('.empty-cart');
  buttonEmptyCart.addEventListener('click', emptyCart);
};
