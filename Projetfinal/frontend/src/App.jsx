 
 import { useCallback, useEffect, useState } from "react";
import { ArrowUp, BadgeCheck, Headphones, Truck, ShieldCheck, Mail, MapPin, Phone, Facebook, Instagram, Linkedin } from "lucide-react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Products from "./components/Products.jsx";
import AdminProducts from "./components/AdminProducts.jsx";
import { getProducts } from "./services/productService.js";

const demoProducts = [
  { name:"Ordinateurs", category:"Informatique", price:150000, description:"Ordinateurs portables et de bureau de grandes marques.", image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85", available:true },
  { name:"Imprimantes", category:"Informatique", price:300000, description:"Imprimantes laser, jet d'encre et multifonctions.", image:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1000&q=85", available:true },
  { name:"Réfrigérateurs", category:"Électroménager", price:400000, description:"Des solutions de conservation pour la maison et le bureau.", image:"https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1000&q=85", available:true },
  { name:"Micro-ondes", category:"Électroménager", price:100000, description:"Des appareils pratiques pour réchauffer et préparer vos repas.", image:"https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=1000&q=85", available:true },
  { name:"Chauffe-eaux", category:"Électroménager", price:15000, description:"Des équipements pour le confort au quotidien.", image:"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=85", available:true },
  { name:"Cuisinières", category:"Électroménager", price:450000, description:"Des cuisinières adaptées aux besoins de votre foyer.", image:"https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85", available:true }
];

const services = [
  { icon: <BadgeCheck/>, title:"Produits de qualité", text:"Une sélection d'équipements pensés pour répondre à vos besoins." },
  { icon: <Truck/>, title:"Conseil et disponibilité", text:"Nous vous aidons à choisir une solution adaptée à votre budget." },
  { icon: <Headphones/>, title:"Accompagnement client", text:"Une équipe disponible pour répondre à vos questions." },
  { icon: <ShieldCheck/>, title:"Solutions professionnelles", text:"Des équipements pour les particuliers, bureaux et entreprises." }
];

export default function App() {
  const [products, setProducts] = useState(demoProducts);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const refreshProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setApiError(false);
    } catch {
      setApiError(true);
      setProducts((current) => current.length ? current : demoProducts);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { refreshProducts(); }, [refreshProducts]);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 450);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="app-shell">
    <Header/>
    <main>
      <Hero/>
      <section className="about-section section section-anchor" id="apropos">
        <div className="about-visual"><div className="about-logo">BS3<span>ENTREPRISE MULTISERVICES</span></div><div className="about-note"><strong>À vos côtés</strong><small>pour vos projets du quotidien</small></div></div>
        <div className="about-copy"><span className="eyebrow">QUI SOMMES-NOUS ?</span><h2>Votre partenaire multiservices <span>au Sénégal</span></h2><div className="accent-line"></div><p>BS3 Entreprise Multiservices est spécialisée dans la vente de matériels informatiques, d'appareils électroménagers et d'équipements professionnels. Nous accompagnons les particuliers et les entreprises dans le choix de solutions adaptées à leurs besoins.</p><p>Notre ambition : proposer des produits fiables, un conseil utile et une expérience client simple et professionnelle.</p><ul className="check-list"><li>Produits sélectionnés avec soin</li><li>Prix compétitifs et conseils personnalisés</li><li>Un service client à votre écoute</li><li>Des solutions pour particuliers et professionnels</li></ul><a href="#contact" className="text-link">Parlons de votre besoin →</a></div>
      </section>
      <Products products={products} loading={loading} apiError={apiError}/>
      <section className="section services-section section-anchor" id="services">
        <div className="section-heading"><span className="eyebrow">CE QUI NOUS DISTINGUE</span><h2>Un service pensé <span>pour vous</span></h2><p>Des produits, du conseil et un accompagnement de proximité.</p></div>
        <div className="services-grid">{services.map((service) => <article className="service-card" key={service.title}><div className="service-icon">{service.icon}</div><h3>{service.title}</h3><p>{service.text}</p></article>)}</div>
      </section>
      <section className="cta-band"><div><span className="eyebrow">UN BESOIN PARTICULIER ?</span><h2>Parlons de votre prochain équipement.</h2><p>Contactez-nous pour connaître les disponibilités, les prix et les options adaptées à votre besoin.</p></div><a className="button button-light" href="#contact">Contacter BS3 →</a></section>
      <AdminProducts products={products} onChanged={refreshProducts}/>
      <section className="contact-section section section-anchor" id="contact">
        <div className="contact-copy"><span className="eyebrow">CONTACTEZ-NOUS</span><h2>Nous sommes à votre <span>écoute.</span></h2><p>Une question sur un produit ou besoin d'un devis ? Écrivez-nous ou appelez-nous.</p>
          <div className="contact-item"><div><MapPin/></div><span><strong>Adresse</strong><small>Meckhé, Sénégal</small></span></div>
          <a className="contact-item" href="tel:+221778794493"><div><Phone/></div><span><strong>Téléphone</strong><small>+221 77 879 44 93</small></span></a>
          <a className="contact-item" href="mailto:babacarsambe2022@gmail.com"><div><Mail/></div><span><strong>E-mail</strong><small>babacarsambe2022@gmail.com</small></span></a>
        </div>
        <div className="contact-card"><h3>Demander des informations</h3><p>Le moyen le plus rapide de nous contacter est WhatsApp.</p><a className="button full-button whatsapp-button" href="https://wa.me/221778794493?text=Bonjour%20BS3%2C%20je%20souhaite%20obtenir%20des%20informations." target="_blank" rel="noreferrer">Discuter sur WhatsApp ↗</a><div className="contact-divider"><span></span> ou <span></span></div><a className="email-link" href="mailto:babacarsambe2022@gmail.com">Envoyer un e-mail</a><small className="response-note">Nous vous répondrons dès que possible.</small></div>
      </section>
    </main>
    <footer className="site-footer"><div className="footer-main"><a className="brand footer-brand" href="#accueil"><div className="brand-mark">BS3</div><div><strong>BS3</strong><small>ENTREPRISE MULTISERVICES</small></div></a><p>Des équipements de qualité et des solutions adaptées à vos besoins, partout au Sénégal.</p><div className="social-links"><a href="https://www.facebook.com/" aria-label="Facebook"><Facebook/></a><a href="https://www.instagram.com/" aria-label="Instagram"><Instagram/></a><a href="https://www.linkedin.com/" aria-label="LinkedIn"><Linkedin/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} BS3 Entreprise Multiservices. Tous droits réservés.</span><a href="#accueil">Retour à l'accueil ↑</a></div></footer>
    {showTop && <button className="back-to-top" onClick={() => window.scrollTo({top:0, behavior:"smooth"})} aria-label="Retour en haut"><ArrowUp/></button>}
  </div>;
}
