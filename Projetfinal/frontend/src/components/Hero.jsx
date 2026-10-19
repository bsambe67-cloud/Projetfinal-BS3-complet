import { ArrowRight, BadgeCheck, Truck } from "lucide-react";

export default function Hero() {
  return <section className="hero section-anchor" id="accueil">
    <div className="hero-copy">
      <span className="eyebrow"><span className="eyebrow-dot"/> VOTRE PARTENAIRE DE CONFIANCE</span>
      <h1>Des équipements fiables.<br/><span>Des solutions pour tous.</span></h1>
      <p>BS3 Entreprise Multiservices vous accompagne dans l'achat de matériels informatiques, d'appareils électroménagers et d'équipements professionnels, partout au Sénégal.</p>
      <div className="hero-actions">
        <a className="button" href="#produits">Découvrir nos produits <ArrowRight size={18}/></a>
        <a className="button button-outline" href="#contact">Demander un devis</a>
      </div>
      <div className="hero-trust">
        <span><BadgeCheck size={18}/> Qualité et fiabilité</span>
        <span><Truck size={18}/> Service client disponible</span>
      </div>
    </div>
    <div className="hero-visual">
      <div className="hero-orb"></div>
      <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=90" alt="Matériel informatique professionnel" />
      <div className="floating-card"><span className="floating-icon">✓</span><div><strong>Votre satisfaction</strong><small>Notre priorité au quotidien</small></div></div>
      <div className="hero-badge"><strong>BS3</strong><span>Qualité • Conseil • Service</span></div>
    </div>
  </section>;
}
