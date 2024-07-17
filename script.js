document.addEventListener("DOMContentLoaded", function () {
  const productContainer = document.getElementById("productContainer");
  const toggleBoxes = document.querySelectorAll(".toggleBox");

  function displayProducts(products) {
    productContainer.innerHTML = "";
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";
      productDiv.innerHTML = `
        <div class="productImageBox">
        ${
            product.badge_text ? `<span class="badge">${product.badge_text}</span>` :""
          }
          <img src="${product.image}" alt="${product.title}">

          
        </div>
        <div class="productTitleBox">
          <p class="title">${product.title}</p>
          <p>•</p>
          <span> ${product.vendor}</span>
        </div>
        <div class="productPriceBox">
          <p>Rs ${product.price}.00</p>
          <p class="price">${product.compare_at_price}.00</p>
          <p class="discount">${Math.round(((product.compare_at_price - product.price)/product.compare_at_price)*100)}% Off</p>
         </div>
         <div class="cart">
         <button>Add to Cart</button>
         </div>
        `;
      productContainer.appendChild(productDiv);
    });
  }

  function handleCategoryChange(categories, categoryName) {
    const category = categories.find(
      (cat) => cat.category_name === categoryName
    );
    if (category) {
      displayProducts(category.category_products);
    }
  }

  function fetchAndDisplayData() {
    fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        toggleBoxes.forEach((toggleBox,index) => {
          if(index == 0){
            toggleBox.classList.add("active");
          }
          toggleBox.addEventListener("click", () => {

           
              toggleBoxes.forEach((box) => box.classList.remove("active"));
            
            
              toggleBox.classList.add("active");
              
            const categoryName = toggleBox.getAttribute("category");
            handleCategoryChange(data.categories, categoryName);
          });
        });
        handleCategoryChange(data.categories, "Men");
      
        
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  fetchAndDisplayData();
});
