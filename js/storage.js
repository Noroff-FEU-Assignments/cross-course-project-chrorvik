import { CART_STORAGE_KEY } from "./constants.js";

export function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function getCart() {
  const cart = getFromLocalStorage(CART_STORAGE_KEY);
  if (cart === null || cart === undefined) {
    return []; // Returnerer en tom array hvis handlekurven ikke finnes i localStorage
  }
  return cart;
}
