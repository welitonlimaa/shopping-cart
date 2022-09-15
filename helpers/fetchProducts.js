const fetchProducts = async (QUERY) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
    const response = await fetch(url);
    const results = await response.json();
    const dados = results.results.map((infos) => {
      const { id, title, thumbnail, price } = infos;
      return {
        id,
        title,
        thumbnail,
        price,
      };
    });
    return dados;
 } catch (error) {
  throw new Error('You must provide an url');
 }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
