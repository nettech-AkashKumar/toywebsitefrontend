import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>
        <span className="original-price">₹{product.originalPrice}</span>
        <span className="price">₹{product.price}</span>
      </p>
      <p>⭐ {product.stars}</p>
      <p>Level: {product.level}</p>
      <button>Add to cart</button>
    </div>
  );
}

export default ProductCard;
