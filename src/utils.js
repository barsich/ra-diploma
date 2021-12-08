export function sumPrices(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.count, 0).toLocaleString();
}

export function checkActive(match, location) {
  return match.url === location.pathname;
}
