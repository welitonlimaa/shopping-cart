const getSavedCartItems = () => {
  const cartProducts = document.getElementsByClassName('cart__items');
  const cartSavedItemClickListener = (event) => {
    const dadoSaved = JSON.parse(localStorage.getItem('cartItems')) || 0;
    const items = dadoSaved.filter((texto) => texto !== event.target.innerText);
    localStorage.setItem('cartItems', JSON.stringify(items));
    cartProducts[0].removeChild(event.target);
  };
  const dados = JSON.parse(localStorage.getItem('cartItems')) || 0;
  for (let i = 0; i < dados.length; i += 1) {
    const li = document.createElement('li');
    li.addEventListener('click', cartSavedItemClickListener);
    li.innerText = dados[i];
    cartProducts[0].appendChild(li);
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
