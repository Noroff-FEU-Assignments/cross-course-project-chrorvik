export async function fetchProducts() {
  const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");
  const data = await response.json();
  return data;
}
