import { useState } from "react";
import { Menu, X, Search, Phone } from "lucide-react";

const links = [
  ["Accueil", "#accueil"], ["À propos", "#apropos"], ["Produits", "#produits"],
  ["Services", "#services"], ["Contact", "#contact"]
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="top-bar">
      <span>Bienvenue chez BS3 Entreprise Multiservices</span>
      <div><span>📍 Meckhé, Sénégal</span><a href="tel:+221778794493"><Phone size={14}/> +221 77 879 44 93</a><a href="mailto:babacarsambe2022@gmail.com">✉ babacarsambe2022@gmail.com</a></div>
    </div>
    <header className="site-header">
      <a className="brand" href="#accueil" aria-label="BS3 Accueil">
        <div className="brand-mark">BS3</div>
        <div><strong>BS3</strong><small>ENTREPRISE MULTISERVICES</small></div>
      </a>
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Ouvrir le menu">{open ? <X/> : <Menu/>}</button>
      <nav className={open ? "nav-links open" : "nav-links"}>
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <a className="button button-small header-cta" href="#contact"><Search size={16}/> Nous contacter</a>
    </header>
  </>;
}
