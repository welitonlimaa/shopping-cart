const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

afterEach(() => {
  const dados = JSON.parse(localStorage.getItem('cartItems'));
  dados.splice(0, dados.length - 1);
  localStorage.setItem('cartItems', JSON.stringify(dados));
});

describe('3 - Teste a função saveCartItems', () => {
  it('Verifique se saveCartItems é uma função.', () => {
    expect.assertions(1);
    expect(typeof saveCartItems).toBe('function');
  });
  it('Verifique se ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', () => {
    expect.assertions(1);
    cartItem = {};
    saveCartItems(cartItem);
    const dados = JSON.parse(localStorage.getItem('cartItems')) || 0;
    expect(dados).not.toBe(0);
  });
  it('Verifique se ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', () => {
    expect.assertions(1);
    cartItem = {};
    saveCartItems(cartItem);
    const dados = JSON.parse(localStorage.getItem('cartItems'));
    expect(dados).toContain(cartItem);
  });
});
