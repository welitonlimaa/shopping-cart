const cartProducts = document.getElementsByClassName('cart__items');
const cartItemSavedClickListener = (event) => {
  cartProducts[0].removeChild(event.target);
};

const createSavedCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemSavedClickListener);
  return li;
};

const getSavedCartItems = () => {
  const dados = JSON.parse(localStorage.getItem('cartItems')) || 0;
  for (let i = 0; i < dados.length; i += 1) {
    const selectProd = createSavedCartItemElement(dados[i]);
    cartProducts[0].appendChild(selectProd);
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
