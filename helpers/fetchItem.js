const fetchItem = async (ItemID) => {
  try {
    const url = `https://api.mercadolibre.com/items/${ItemID}`;
    const response = await fetch(url);
    const results = await response.json();
    return results;
 } catch (error) {
  throw new Error('You must provide an url');
 }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
