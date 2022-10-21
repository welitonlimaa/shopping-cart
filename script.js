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

const createProductItemElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'itemsContent';
  const sectionInfos = document.createElement('section');
  sectionInfos.className = 'item';
  sectionInfos.appendChild(createCustomElement('span', 'item_id', id));
  sectionInfos.appendChild(createProductImageElement(thumbnail));
  sectionInfos.appendChild(createCustomElement('span', 'item__title', title));
  sectionInfos.appendChild(createCustomElement('p', 'item__price estiloVal',
   `${price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`));
  section.appendChild(sectionInfos);
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const items = document.getElementsByClassName('items');

const p = document.createElement('p');
p.className = 'loading';
p.innerText = 'carregando...';
items[0].appendChild(p);

const insertProducts = async (product) => {
  const dados = await fetchProducts(product);
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
    itemsArray.push(products[i].innerHTML);
  }
  saveCartItems(JSON.stringify(itemsArray));
};

const pTotal = document.getElementsByClassName('total-price');
pTotal[0].innerHTML = `<span class="estiloPrice"> Subtotal: </span> <span class="estiloVal"> 
  ${Number(localStorage.getItem('sumCart'))
  .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </span>`;

const sumItemsCart = async () => {
  const products = cart[0].childNodes;
  let soma = 0;
  // const num = /\d+/g;
  if (products.length === 0) {
    pTotal[0].innerHTML = `<span class="estiloPrice"> Subtotal: </span> <span class="estiloVal"> 
    ${0
      .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </span>`;
  }
  for (let i = 0; i < products.length; i += 1) {
    const numberString = products[i].innerText.split('$');
    const number = numberString[1].split('\n');
    soma += Number(number[0]);
    pTotal[0].innerHTML = `<span class="estiloPrice"> Subtotal: </span> <span class="estiloVal">
     ${soma
      .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </span>`;
  }
  localStorage.setItem('sumCart', JSON.stringify(soma));
};

const cartItemClickListener = (event) => {
  const pai = event.target.parentNode;
  cart[0].removeChild(pai);
  saveCart();
  sumItemsCart();
};

const createCartItemElement = ({ id, title, price, thumbnail }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  const img = document.createElement('img');
  img.className = 'imageCart';
  img.src = thumbnail;
  const icon = document.createElement('i');
  icon.className = 'material-icons';
  icon.innerText = 'clear';
  icon.style = 'color: red; padding-left: 15px; font-size: 15px; font-weight: 600';
  icon.addEventListener('click', cartItemClickListener);
  const infos = document.createElement('p');
  infos.className = 'cart_title';
  infos.innerHTML = `<span> ${title} </span> <br><br> <span class="estilo"> R$${price} </span>`;
  li.appendChild(img);
  li.appendChild(infos);
  li.appendChild(icon);
  return li;
};

const setItemsCart = async (event) => {
  const product = event.target.parentNode;
  const idItem = getIdFromProductItem(product);
  const { id, title, price, thumbnail } = await fetchItem(idItem);
  const object = { id, title, price, thumbnail };
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
    li.className = 'cart__item';
    li.innerHTML = dados[i];
    cart[0].appendChild(li);
  }
};

const emptyCart = () => {
  cart[0].innerHTML = '';
  saveCart();
  sumItemsCart();
};

const noneCart = (event) => {
  const icon = event.target;
  const fullCart = document.querySelector('.cart');
  const myCart = document.querySelector('.container-cartTitle');
  const cartNone = document.querySelectorAll('.none');
  if (cartNone.length !== 0) {
    fullCart.classList.remove('none');
    icon.style = 'font-size:45px;color:white';
    myCart.classList.remove('none');
  } else {
    fullCart.classList.add('none');
    icon.style = 'font-size:45px;color:white;padding-right: 20px';
    myCart.classList.add('none');
  }
};

const capSearch = async () => {
  items[0].innerHTML = '';
  p.className = 'loading';
  p.innerText = 'carregando...';
  items[0].appendChild(p);
  const inputSearch = document.getElementById('inputProduct').value;
  await insertProducts(inputSearch);
  const buttonProduct = document.querySelectorAll('.item__add');
  for (let i = 0; i < buttonProduct.length; i += 1) {
    buttonProduct[i].addEventListener('click', setItemsCart);
  }
  items[0].removeChild(p);
}; 

window.onload = async () => {
  await insertProducts('computador');
  items[0].removeChild(p);
  savedsCartItems();
  const buttonSearch = document.querySelector('#searchB');
  buttonSearch.addEventListener('click', capSearch); 
  const buttonProduct = document.querySelectorAll('.item__add');
  for (let i = 0; i < buttonProduct.length; i += 1) {
    buttonProduct[i].addEventListener('click', setItemsCart);
  }
  const buttonEmptyCart = document.querySelector('.empty-cart');
  buttonEmptyCart.addEventListener('click', emptyCart);

  const iconCart = document.querySelector('.material-icons');
  iconCart.addEventListener('click', noneCart);
};
