require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verifique se fetchItem é uma função.', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });
  it('Verifique se a função fetch foi chamada.', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledTimes(1);
  });
  it('Verifique se a função fetch foi chamada com o endpoint correto', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toBeCalledWith(url);
  });
  it('Verifique se a função fetch foi chamada com o endpoint correto', async () => {
    expect.assertions(1);
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  });
  it('Verifica se ao chamar a função fetchItem sem argumento retorna um erro', async () => {
    expect.assertions(1);
    try {
      await fetchItem();
    } catch (error) { 
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
