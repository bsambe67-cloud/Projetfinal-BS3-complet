import { MessageCircle, ArrowUpRight } from "lucide-react";

const WHATSAPP_NUMBER = "221778794493";
export default function ProductCard({ product }) {
  const message = encodeURIComponent(`Bonjour BS3, je suis intéressé(e) par : ${product.name}. Pourriez-vous me donner plus d'informations ?`);
  const image = product.image || "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85";
  return <article className="product-card">
    <div className="product-image-wrap">
      <img src={image} alt={product.name} loading="lazy" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85"; }} />
      <span className="product-category">{product.category}</span>
      {!product.available && <span className="unavailable">Indisponible</span>}
    </div>
    <div className="product-content">
      <h3>{product.name}</h3>
      <p>{product.description || "Contactez-nous pour en savoir plus sur ce produit."}</p>
      <div className="product-bottom">
        <strong className="price">{Number(product.price).toLocaleString("fr-FR")} <small>FCFA</small></strong>
        <a className="order-button" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`} target="_blank" rel="noreferrer" aria-label={`Commander ${product.name}`}><MessageCircle size={17}/> Commander <ArrowUpRight size={15}/></a>
      </div>
    </div>
  </article>;
}
