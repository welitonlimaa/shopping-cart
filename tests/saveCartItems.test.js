const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Verifique se saveCartItems é uma função.', () => {
    expect.assertions(1);
    expect(typeof saveCartItems).toBe('function');
  });
  it('Verifique se ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', () => {
    expect.assertions(1);
    cartItem = [];
    saveCartItems(cartItem);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Verifique se ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros', () => {
    expect.assertions(1);
    cartItem = [];
    saveCartItems(cartItem);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', cartItem);
  });
});

