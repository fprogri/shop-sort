//get the data
import products from "./products.js";

const itemsPerPage = 90; // Number of items per page
let currentPage = 1;
let products2 = products;
const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
// const applyPriceFilterButton = document.getElementById("apply-price-filter");
const minDiscInput = document.getElementById("min-disc");
const maxDiscInput = document.getElementById("max-disc");
const applyDiscFilterButton = document.getElementById("apply-disc-filter");
const sortByPriceSelect = document.getElementById("sort-by-price");
const sortByDiscSelect = document.getElementById("sort-by-disc");
const goldCategoryCheckbox = document.getElementById("gold-category-filter");
const productSearchInput = document.getElementById("product-search");
// const searchButton = document.getElementById("search-button");
const sortByScSelect = document.getElementById("sort-by-sc");

function displayProducts(products, page = 1) {
  products = products.filter((product) => {
    return product.ind_camp_description !== "Problematik";
    // return !product.ind_camp_description.toLowerCase().includes("problematik");
  });

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  const productCount = document.getElementById("productCount");
  productCount.innerHTML = `<p>(${products.length})</p>`;
  const productList = document.querySelector(".product-list");
  productList.innerHTML = ``;

  paginatedProducts.forEach((product) => {
    const link = "https://jysk.al/public/ck/prd/" + product.clickkon_product_id;
    const src = `https://jysk.al/public/clickkon/product/${product.clickkon_product_id}/image/small/download`;
    const discount = parseInt(
      ((product.price_w_vat - product.fin_price_w_vat) / product.price_w_vat) *
        100
    );

    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
            <img src=${src} loading="lazy">
            <p>${product.sc_id}</p>
            <a href=${link} target="_blank" class="path">${product.name}</a>
            <p>Ishte: ${product.price_w_vat} Lek</p>
            <p class="after-price">${product.fin_price_w_vat} Lek</p>
            <p>${discount}%</p>
            <p>${product.gen_cat.n}</p>
            <p class="path">${product.gen_cat.f_r_n}</p>
            <p>${product.ind_camp_description}</p>
        `;

    productList.appendChild(productCard);
  });

  updatePaginationControls(products, page);
}
function updatePaginationControls(products, page) {
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const pageInfo = document.getElementById("page-info");
  pageInfo.textContent = `Page ${page} of ${totalPages}`;

  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");

  prevPageButton.disabled = page === 1;
  nextPageButton.disabled = page === totalPages;
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
function performProductSearch(searchTerm) {
  function searchInObject(obj, searchTerm) {
    for (const key in obj) {
      if (
        obj[key] !== null &&
        typeof obj[key] === "string" &&
        obj[key].toLowerCase().includes(searchTerm)
      ) {
        return true; // If the searchTerm is found in a string property, return true.
      } else if (
        typeof obj[key] === "object" &&
        searchInObject(obj[key], searchTerm)
      ) {
        return true; // Recursively search within nested objects.
      }
    }
    return false; // If the searchTerm is not found in any string property, return false.
  }

  products2 = products2.filter((product) =>
    searchInObject(product, searchTerm)
  );

  // Display the search results
  displayProducts(products2);
  console.log(products2);
}
function sortByScAscending() {
  products2 = [...products2];
  products2.sort((a, b) => a.sc_id - b.sc_id);

  // Display the sorted products
  displayProducts(products2);
}
function sortByScDescending() {
  products2 = [...products2];
  products2.sort((a, b) => b.sc_id - a.sc_id);

  // Display the sorted products
  displayProducts(products2);
}

document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayProducts(products2, currentPage);
  }
});
document.getElementById("next-page").addEventListener("click", () => {
  const totalPages = Math.ceil(products2.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayProducts(products2, currentPage);
    window.scrollTo(0, 0);
  }
});
// applyPriceFilterButton.addEventListener("click", () => {

// });
applyDiscFilterButton.addEventListener("click", () => {
  const minDisc = parseFloat(minDiscInput.value) || 0;
  const maxDisc = parseFloat(maxDiscInput.value) || Infinity;

  // Filter products by the specified price range
  filterByDiscRange(minDisc, maxDisc);
  if (minPriceInput.value.trim() !== "" || maxPriceInput.value.trim() !== "") {
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

    // Filter products by the specified price range
    filterByPriceRange(minPrice, maxPrice);
  }
  if (productSearchInput.value.trim() !== "") {
    const searchTerm = productSearchInput.value.trim().toLowerCase();
    // console.log(searchTerm);

    // Perform the product search
    performProductSearch(searchTerm);
  }
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
// searchButton.addEventListener("click", () => {
//
// });
productSearchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const searchTerm = productSearchInput.value.trim().toLowerCase();

    // Perform the product search
    performProductSearch(searchTerm);
  }
});
sortByScSelect.addEventListener("change", () => {
  const selectedOption = sortByScSelect.value;

  if (selectedOption === "low-to-high") {
    // Sort products by price in ascending order (lowest to highest)
    sortByScAscending();
  } else if (selectedOption === "high-to-low") {
    // Sort products by price in descending order (highest to lowest)
    sortByScDescending();
  }
});
displayProducts(products);
