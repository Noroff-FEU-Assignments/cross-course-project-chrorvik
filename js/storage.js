import { CART_STORAGE_KEY } from "./constants.js";

/**
 * Saves data to localStorage under the given key after stringifying it.
 * @param {string} key The key under which to store the data.
 * @param {*} data The data to be stored.
 */
export function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving to localStorage", e);
  }
}

/**
 * Retrieves parsed data from localStorage by the given key.
 * @param {string} key The key of the data to be retrieved.
 * @returns {*} The parsed data from localStorage.
 */
export function getFromLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error("Error parsing data from localStorage", e);
    return null;
  }
}

/**
 * Retrieves the shopping cart from localStorage, or returns an empty array if it doesn't exist.
 * @returns {Array} The shopping cart array.
 */
export function getCart() {
  return getFromLocalStorage(CART_STORAGE_KEY) || [];
}
