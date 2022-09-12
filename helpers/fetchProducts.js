const fetchProducts = async (QUERY) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  const response = await fetch(url);
  const results = await response.json();
  const dados = results.results.map((infos) => {
    const { id, title, thumbnail } = infos;
    return {
      id,
      title,
      thumbnail,
    };
  });
  return dados;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
