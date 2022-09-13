const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Verifique se getSavedCartItems é uma função.', () => {
    expect.assertions(1);
    expect(typeof getSavedCartItems).toBe('function');
  });
  it('Verifique se getSavedCartItems está retornando um array com produtos', () => {
    expect.assertions(1);
    expect(typeof getSavedCartItems()).toBe('object');
  });
  it('Verifique se ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(JSON.parse(localStorage.getItem)).toHaveBeenCalled();
  });
  it('Verifique se ao executar getSavedCartItems, o método localStorage.getItem é chamado com o cartItems como parâmetro.', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
