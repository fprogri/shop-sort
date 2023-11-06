//get the data
import products from "./products.js";

function displayProducts(products) {
  products = products.filter((product) => {
    return product.ind_camp_description !== "Problematik";
  });
  // products.splice(50);
  const productCount = document.getElementById("productCount");
  productCount.innerHTML = `<p>(${products.length})</p>`;
  const productList = document.querySelector(".product-list");
  productList.innerHTML = ``;

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
          <img src=${src} loading="lazy">
          <p>${product.sc_id}</p>
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
  console.log(products.length);
}

let products2 = products;

//price filter functionality

const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const applyPriceFilterButton = document.getElementById("apply-price-filter");

function filterByPriceRange(minPrice, maxPrice) {
  products2 = products2.filter((product) => {
    const productPrice = product.fin_price_w_vat;
    return productPrice >= minPrice && productPrice <= maxPrice;
  });

  // Display the filtered products
  displayProducts(products2);
}

applyPriceFilterButton.addEventListener("click", () => {
  const minPrice = parseFloat(minPriceInput.value) || 0;
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

  // Filter products by the specified price range
  filterByPriceRange(minPrice, maxPrice);
});

//dic filter functionality
const minDiscInput = document.getElementById("min-disc");
const maxDiscInput = document.getElementById("max-disc");
const applyDiscFilterButton = document.getElementById("apply-disc-filter");
applyDiscFilterButton.addEventListener("click", () => {
  const minDisc = parseFloat(minDiscInput.value) || 0;
  const maxDisc = parseFloat(maxDiscInput.value) || Infinity;

  // Filter products by the specified price range
  filterByDiscRange(minDisc, maxDisc);
});
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

//price sort functionality
const sortByPriceSelect = document.getElementById("sort-by-price");
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

//dic sort functionality
const sortByDiscSelect = document.getElementById("sort-by-disc");
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

//gold filter functionality
const goldCategoryCheckbox = document.getElementById("gold-category-filter");
goldCategoryCheckbox.addEventListener("change", () => {
  const showGoldCategory = goldCategoryCheckbox.checked;

  // Filter products by the "GOLD" category
  filterByGoldCategory(showGoldCategory);
});
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

//search functionality
const productSearchInput = document.getElementById("product-search");
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
  const searchTerm = productSearchInput.value.trim().toLowerCase();
  console.log(searchTerm);

  // Perform the product search
  performProductSearch(searchTerm);
});
productSearchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const searchTerm = productSearchInput.value.trim().toLowerCase();

    // Perform the product search
    performProductSearch(searchTerm);
  }
});
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

//src sort functionality
const sortByScSelect = document.getElementById("sort-by-sc");
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

displayProducts(products);

////////////////////////////////////////////////////////

// function updateDiv2Margin() {
//   var div1Height = document.querySelector(".filter-controls").offsetHeight;
//   document.querySelector(".product-list").style.marginTop = div1Height + "px";
// }

// // Call the function initially
// updateDiv2Margin();

// // Add an event listener to update the margin if the viewport size changes
// window.addEventListener("resize", updateDiv2Margin);
