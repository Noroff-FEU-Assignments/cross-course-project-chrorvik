export async function fetchProducts() {
  try {
    const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
