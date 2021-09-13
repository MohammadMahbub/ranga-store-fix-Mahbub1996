const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3 class="title-color">${product.title}</h3>
      <p class="category">Category: ${product.category}</p>
      <h2 class="price-style">Price: $ ${product.price}</h2>
      <h4 class="rating-rate">Rating : ${product.rating.rate}</h4>
      <h5 id="star-color">
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="far fa-star"></i>
      </h5>
      <h4 class="rating-count">${product.rating.count} Person rated our product</h4>

      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
      

      <!-- Button trigger modal -->
<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter">
  Details
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Here All Details</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h4>${product.description}</h4>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// 
let count = 0;
  const addToCart = (id, price) => {
    count = count + 1;
    updatePrice("price", price);

    updateTaxAndCharge();
    document.getElementById("total-Products").innerText = count;
    updateTotal()
  };

  const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
  };

  // main price update function
  const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    console.log(total);

    document.getElementById(id).innerText = total.toFixed(2);
  };

  // set innerText function
  const setInnerText = (id, value) => {
    // console.log(value);
    document.getElementById(id).innerText = value.toFixed(2);
  };

  // update delivery charge and total Tax
  const updateTaxAndCharge = () => {
    const priceConverted = getInputValue("price");
    if (priceConverted > 200) {
      setInnerText("delivery-charge", 30);
      setInnerText("total-tax", priceConverted * 0.2);
    }
    if (priceConverted > 400) {
      setInnerText("delivery-charge", 50);
      setInnerText("total-tax", priceConverted * 0.3);
    }
    if (priceConverted > 500) {
      setInnerText("delivery-charge", 60);
      setInnerText("total-tax", priceConverted * 0.4);
    }
  };

  //grandTotal update function
  const updateTotal = () => {
    const grandTotal =
      getInputValue("price") + getInputValue("delivery-charge") +
      getInputValue("total-tax");
    document.getElementById("total").innerText = grandTotal.toFixed(2);
  };
  loadProducts();