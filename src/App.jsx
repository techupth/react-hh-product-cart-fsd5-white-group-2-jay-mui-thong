import { useState } from "react";
import "./App.css";
import products from "./data/products";

function App() {
  const [productInCart, setProductInCart] = useState([]);
  const [totalPirce, setTotalPrice] = useState(0);

  const buttonAddCart = (index) => {
    const newProductInCart = [...productInCart];
    if (!newProductInCart.length) {
      newProductInCart.push({ ...products[index], quantity: 1 });
      setTotalPrice(totalPirce + products[index].price);
      setProductInCart(newProductInCart);
    } else if (
      newProductInCart.filter((item) => products[index].id == item.id) !=
      !newProductInCart.length
    ) {
      newProductInCart.filter((item) => {
        if (products[index].id == item.id) {
          item.quantity += 1;
        }
      });
      setTotalPrice(totalPirce + products[index].price);
      setProductInCart(newProductInCart);
    } else {
      console.log(!newProductInCart.length);
      newProductInCart.push({ ...products[index], quantity: 1 });
      setTotalPrice(totalPirce + products[index].price);
      setProductInCart(newProductInCart);
    }
  };

  const deleteButton = (index) => {
    const prevProductInCart = [...productInCart];
    prevProductInCart.splice(index, 1);
    setTotalPrice(
      totalPirce - productInCart[index].price * productInCart[index].quantity
    );
    setProductInCart(prevProductInCart);
  };

  const BuntonAddQuantity = (index) => {
    const prevProductInCart = [...productInCart];
    prevProductInCart[index].quantity += 1;
    setTotalPrice(totalPirce + prevProductInCart[index].price);
    setProductInCart(prevProductInCart);
  };

  const BuntonSubtractQuantity = (index) => {
    const prevProductInCart = [...productInCart];
    if (prevProductInCart[index].quantity != 0) {
      prevProductInCart[index].quantity -= 1;
      setTotalPrice(totalPirce - prevProductInCart[index].price);
      setProductInCart(prevProductInCart);
    }
  };

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {products.map((item, index) => {
            return (
              <div key={index} className="product">
                <img src={item.image} alt={item.name} />
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <button onClick={() => buttonAddCart(index)}>
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">
          Cart (Total Price is {totalPirce} Baht)
        </h1>
        <div className="cart-item-list">
          {productInCart.map((item, index) => {
            return (
              <div key={index} className="cart-item">
                <h1>Item name: {item.name}</h1>
                <h2>Price: {item.price} Baht</h2>
                <h2>Quantity: {item.quantity}</h2>
                <button
                  className="delete-button"
                  onClick={() => deleteButton(index)}
                >
                  x
                </button>
                <div className="quantity-actions">
                  <button
                    className="add-quantity"
                    onClick={() => BuntonAddQuantity(index)}
                  >
                    +
                  </button>
                  <button
                    className="subtract-quantity"
                    onClick={() => BuntonSubtractQuantity(index)}
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
