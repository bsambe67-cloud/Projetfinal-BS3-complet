import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p>Chargement des produits...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (products.length === 0) {
    return <p>Aucun produit disponible pour le moment.</p>;
  }

  return (
    <section className="products-section" id="produits">
      <h2>Nos produits</h2>

      <div className="products-grid">
        {products.map((product) => (
          <article className="product-card" key={product._id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <div className="product-info">
              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <p className="product-price">
                {new Intl.NumberFormat("fr-FR").format(product.price)} FCFA
              </p>

              <button
                type="button"
                onClick={() => {
                  const message = `Bonjour BS3, je souhaite commander : ${product.name}, au prix de ${new Intl.NumberFormat("fr-FR").format(product.price)} FCFA.`;

                  const whatsappUrl =
                    `https://wa.me/221778794493?text=${encodeURIComponent(message)}`;

                  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                }}
              >
                Commander sur WhatsApp
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductList;