export function sumPrices(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.count, 0).toLocaleString();
}

export function checkActive(match, location) {
  return match.url === location.pathname;
}

export function pickSearch(query) {
  if (!query) {
    return '';
  }
  const splittedQuery = query.split('&');
  return decodeURI(splittedQuery[0].substring(3));
}

export function pickCategory(query) {
  if (!query || !query.includes('categoryId')) {
    return '';
  }
  const splittedQuery = query.split('&');
  return splittedQuery[1].substring(11);
}
