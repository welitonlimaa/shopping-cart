const itemsCart = Array(0).fill(0);
const saveCartItems = (cartItem) => {
  itemsCart.push(cartItem);
  localStorage.setItem('cartItems', JSON.stringify(itemsCart));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
