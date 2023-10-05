import products from "./products.js";

const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const applyPriceFilterButton = document.getElementById("apply-price-filter");
const minDiscInput = document.getElementById("min-disc");
const maxDiscInput = document.getElementById("max-disc");
const applyDiscFilterButton = document.getElementById("apply-disc-filter");
const sortByPriceSelect = document.getElementById("sort-by-price");
const sortByDiscSelect = document.getElementById("sort-by-disc");
const goldCategoryCheckbox = document.getElementById("gold-category-filter");
let products2 = products;
// Function to display products
function displayProducts(products) {
  const productList = document.querySelector(".product-list");
  productList.innerHTML = `<p>Product count: ${products2.length}</p>`;

  products.forEach((product) => {
    const link = "https://jysk.al/public/ck/prd/" + product.clickkon_product_id;
    const src = `https://jysk.al/public/clickkon/product/${product.clickkon_product_id}/image/small/download`;
    const discount = parseInt(
      ((product.price_w_vat - product.fin_price_w_vat) / product.price_w_vat) *
        100
    );
    // Create a product card element for each product
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    // Customize the content of the product card using the product object properties
    productCard.innerHTML = `
          <img src=${src}>
          <a href=${link} target="_blank" class="path">${product.name}</a>
          <p>Ishte: ${product.price_w_vat} Lek</p>
          <p class="after-price">${product.fin_price_w_vat} Lek</p>
          <p>${discount}%</p>
          <p>${product.gen_cat.n}</p>
          <p class="path">${product.gen_cat.f_r_n}
          <p>${product.ind_camp_description}</p>
          <!-- Add more product details as needed -->
      `;

    // Append the product card to the product list container
    productList.appendChild(productCard);
  });
}
function filterByPriceRange(minPrice, maxPrice) {
  products2 = products2.filter((product) => {
    const productPrice = product.fin_price_w_vat;
    return productPrice >= minPrice && productPrice <= maxPrice;
  });

  // Display the filtered products
  displayProducts(products2);
}
function filterByDiscRange(minDisc, maxDisc) {
  products2 = products2.filter((product) => {
    const productDisc = parseInt(
      ((product.price_w_vat - product.fin_price_w_vat) / product.price_w_vat) *
        100
    );
    return productDisc >= minDisc && productDisc <= maxDisc;
  });

  // Display the filtered products
  displayProducts(products2);
}
function sortByPriceAscending() {
  products2 = [...products2];
  products2.sort((a, b) => a.fin_price_w_vat - b.fin_price_w_vat);

  // Display the sorted products
  displayProducts(products2);
}
function sortByPriceDescending() {
  products2 = [...products2];
  products2.sort((a, b) => b.fin_price_w_vat - a.fin_price_w_vat);

  // Display the sorted products
  displayProducts(products2);
}
function sortByDiscAscending() {
  products2 = [...products2];
  products2.sort(
    (a, b) =>
      (a.price_w_vat - a.fin_price_w_vat) / a.price_w_vat -
      (b.price_w_vat - b.fin_price_w_vat) / b.price_w_vat
  );

  // Display the sorted products
  displayProducts(products2);
}
function sortByDiscDescending() {
  products2 = [...products2];
  products2.sort(
    (a, b) =>
      (b.price_w_vat - b.fin_price_w_vat) / b.price_w_vat -
      (a.price_w_vat - a.fin_price_w_vat) / a.price_w_vat
  );

  // Display the sorted products
  displayProducts(products2);
}
function filterByGoldCategory(showGoldCategory) {
  if (showGoldCategory) {
    products2 = products2.filter((product) => product.gen_cat.n === "GOLD");
    // Display only products in the "GOLD" category
    displayProducts(products2);
  } else {
    // Display all products when the checkbox is unchecked
    displayProducts(products2);
  }
}
displayProducts(products);

applyPriceFilterButton.addEventListener("click", () => {
  const minPrice = parseFloat(minPriceInput.value) || 0;
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

  // Filter products by the specified price range
  filterByPriceRange(minPrice, maxPrice);
});
applyDiscFilterButton.addEventListener("click", () => {
  const minDisc = parseFloat(minDiscInput.value) || 0;
  const maxDisc = parseFloat(maxDiscInput.value) || Infinity;

  // Filter products by the specified price range
  filterByDiscRange(minDisc, maxDisc);
});
sortByPriceSelect.addEventListener("change", () => {
  const selectedOption = sortByPriceSelect.value;

  if (selectedOption === "low-to-high") {
    // Sort products by price in ascending order (lowest to highest)
    sortByPriceAscending();
  } else if (selectedOption === "high-to-low") {
    // Sort products by price in descending order (highest to lowest)
    sortByPriceDescending();
  }
});
sortByDiscSelect.addEventListener("change", () => {
  const selectedOption = sortByDiscSelect.value;

  if (selectedOption === "low-to-high") {
    // Sort products by price in ascending order (lowest to highest)
    sortByDiscAscending();
  } else if (selectedOption === "high-to-low") {
    // Sort products by price in descending order (highest to lowest)
    sortByDiscDescending();
  }
});
goldCategoryCheckbox.addEventListener("change", () => {
  const showGoldCategory = goldCategoryCheckbox.checked;

  // Filter products by the "GOLD" category
  filterByGoldCategory(showGoldCategory);
});

///////////////////////////////////////////////////////////////////////////

const productSearchInput = document.getElementById("product-search");
const searchButton = document.getElementById("search-button");

// Add an event listener to the search button
searchButton.addEventListener("click", () => {
  const searchTerm = productSearchInput.value.trim().toLowerCase();
  console.log(searchTerm);

  // Perform the product search
  performProductSearch(searchTerm);
});

// Add an event listener to the search input field to trigger the search on "Enter" key press
productSearchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const searchTerm = productSearchInput.value.trim().toLowerCase();

    // Perform the product search
    performProductSearch(searchTerm);
  }
});

// Function to perform the product search
function performProductSearch(searchTerm) {
  console.log("in function");
  products2 = products2.filter(
    (product) =>
      Object.values(product).some(
        (value) =>
          value !== null &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm)
      )

    // const productName = product.name.toLowerCase();
    // let productDescription = "";
    // if (product.ind_camp_description == true) {
    //   productDescription = product.ind_camp_description.toLowerCase();
    // }
    // return (
    //   productName.includes(searchTerm) ||
    //   productDescription.includes(searchTerm)
    // );
  );

  // Display the search results
  displayProducts(products2);
  console.log(products2);
}
