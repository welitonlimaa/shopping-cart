const getSavedCartItems = () => {
  const dados = JSON.parse(localStorage.getItem('cartItems')) || 0;
  return dados;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
