export function sumPrices(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.count, 0).toLocaleString();
}

export function checkActive(match, location) {
  return match.url === location.pathname;
}

export function getQuery() {
  const params = new URLSearchParams(window.location.search);
  const decodedQuery = params.get('q') && decodeURI(params.get('q'));
  const category = params.get('categoryId');

  return {decodedQuery, category}
}
