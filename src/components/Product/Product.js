import React, { useEffect, useState } from "react";
import "../../assets/css/product.css";
import Header from "../Common/Header";
import { Puff } from "react-loader-spinner";
import { Link } from "react-router-dom";
function Product() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    fetch("http://localhost:5000/api/products/get")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Store the retrieved products in state
        setIsLoading(false); // Update loading state
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false); // Update loading state in case of an error
      });
  }, []);

  return (
    <>
      <Header />
      <div>
        {isLoading ? (
         <Puff type="Puff" color="#00BFFF" height={100} width={100} />
        ) : (
          <div className="grid-container">
            <div className="grid-x grid-margin-x small-up-1 medium-up-2 large-up-4 grid-x-wrapper">
              {products.map((product, index) => (
                <div className="product-box column" key={index}>
                   <Link to={`/review/${product.id}`}>
                  <a href="#" className="product-item">
                    <div className="product-item-image">
                      <img src={product.profileImageUrl} alt={product.title} />
                      <div className="product-item-image-hover"></div>
                    </div>
                    <div className="product-item-content">
                      <div className="product-item-category">Base Item</div>
                      <div className="product-item-title">{product.title}</div>
                      <div className="product-item-price">{`$${product.price}`}</div>
                      <div className="button-pill">
                        <span>Shop Now</span>
                      </div>
                    </div>
                  </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Product;
