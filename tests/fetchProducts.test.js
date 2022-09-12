require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifique se fetchProducts é uma função.', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });
  it('Verifique se a função fetch foi chamada.', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toBeCalledTimes(1);
  });
  it('Verifique se a função fetch foi chamada com o endpoint correto', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toBeCalledWith(url);
  });
  it('Verifica se ao chamar a função fetchProducts sem argumento retorna um erro', async () => {
    expect.assertions(1);
    try {
      await fetchProducts();
    } catch (error) { 
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
