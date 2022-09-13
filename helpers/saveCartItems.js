const saveCartItems = (cartItem) => {
  const itemsCart = Array(0).fill(0);
  itemsCart.push(cartItem);
  localStorage.setItem('cartItems', JSON.stringify(itemsCart));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
