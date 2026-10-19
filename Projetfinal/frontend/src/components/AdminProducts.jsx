import AdminDashboard from "./AdminDashboard.jsx";
import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  LockKeyhole,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService.js";

const API_URL = "http://localhost:5000/api";

const emptyForm = {
  name: "",
  category: "Informatique",
  price: "",
  description: "",
  image: "",
  available: true,
};

export default function AdminProducts({ products, onChanged }) {
  const [token, setToken] = useState(
    () => sessionStorage.getItem("bs3_admin_token") || ""
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginBusy, setLoginBusy] = useState(false);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm(emptyForm);
      setEditingId(null);
    }
  }, [open]);

  // Connexion de l'administrateur
  async function handleLogin(event) {
    event.preventDefault();
    setLoginBusy(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Adresse e-mail ou mot de passe incorrect."
        );
      }

      if (!data.token) {
        throw new Error("Le serveur n'a pas retourné de jeton de connexion.");
      }

      sessionStorage.setItem("bs3_admin_token", data.token);
      setToken(data.token);
      setPassword("");
      setMessage("Connexion réussie !");
    } catch (error) {
      setMessage(error.message || "Impossible de se connecter au serveur.");
    } finally {
      setLoginBusy(false);
    }
  }

  // Déconnexion
  function handleLogout() {
    sessionStorage.removeItem("bs3_admin_token");
    setToken("");
    setEmail("");
    setPassword("");
    setOpen(false);
    setMessage("Vous êtes déconnecté.");
  }

  // Préparer la modification d'un produit
  function edit(product) {
    setEditingId(product._id);

    setForm({
      name: product.name || "",
      category: product.category || "Informatique",
      price: product.price ?? "",
      description: product.description || "",
      image: product.image || "",
      available: product.available !== false,
    });

    setOpen(true);
    setMessage("");
  }

  // Ajouter ou modifier un produit
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      const payload = {
        ...form,
        price: Number(form.price),
      };

      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }

      setMessage(editingId ? "Produit modifié." : "Produit ajouté.");
      setOpen(false);
      await onChanged();
    } catch (error) {
      setMessage(error.message || "Erreur lors de l'enregistrement.");
    } finally {
      setBusy(false);
    }
  }

  // Supprimer un produit
  async function remove(product) {
    if (!product._id) {
      setMessage(
        "Ce produit de démonstration n'est pas enregistré dans MongoDB."
      );
      return;
    }

    if (!window.confirm(`Supprimer « ${product.name} » ?`)) {
      return;
    }

    setMessage("");

    try {
      await deleteProduct(product._id);
      setMessage("Produit supprimé.");
      await onChanged();
    } catch (error) {
      setMessage(error.message || "Impossible de supprimer ce produit.");
    }
  }

  // Formulaire de connexion
  if (!token) {
    return (
      <section className="admin-section" id="gestion">
        <div className="product-modal admin-login-card">
          <div className="modal-heading">
            <div>
              <span className="eyebrow">
                <LockKeyhole size={14} /> ESPACE SÉCURISÉ
              </span>

              <h2>Connexion administrateur</h2>

              <p>
                Connectez-vous pour gérer le catalogue de BS3 Entreprise
                Multiservices.
              </p>
            </div>
          </div>

          {message && (
            <p className="admin-message" role="status">
              {message}
            </p>
          )}

          <form onSubmit={handleLogin} className="product-form">
            <label>
              Adresse e-mail
              <input
                type="email"
                autoComplete="username"
                placeholder="admin@bs3.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label>
              Mot de passe
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button
                  type="button"
                  className="icon-button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <button
              className="button full-button"
              type="submit"
              disabled={loginBusy}
            >
              {loginBusy ? "Connexion en cours…" : "Se connecter"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  // Tableau de bord après connexion
  return (
    <section className="admin-section" id="gestion">
      <div className="admin-title">
        <div>
          <span className="eyebrow">
            <LockKeyhole size={14} /> ESPACE ADMINISTRATEUR
          </span>

          <h2>Gérer le catalogue</h2>

          <p>
            Ajoutez, modifiez ou supprimez les produits enregistrés dans
            MongoDB.
          </p>
        </div>

        <div className="admin-actions">
          <button
            className="button"
            onClick={() => {
              setMessage("");
              setOpen(true);
            }}
          >
            <Plus size={18} /> Ajouter un produit
          </button>

          <button className="button" onClick={handleLogout}>
            <LogOut size={18} /> Déconnexion
          </button>
        </div>
      </div>

            <AdminDashboard products={products} />{message && (

        <p className="admin-message" role="status">
          {message}
        </p>
      )}

      <div className="admin-list">
        {products.map((product) => (
          <div
            className="admin-row"
            key={product._id || product.name}
          >
            <div>
              <strong>{product.name}</strong>

              <small>
                {product.category} ·{" "}
                {Number(product.price).toLocaleString("fr-FR")} FCFA
              </small>
            </div>

            <div className="admin-actions">
              <button
                className="icon-button"
                onClick={() => edit(product)}
                aria-label={`Modifier ${product.name}`}
              >
                <Pencil size={17} />
              </button>

              <button
                className="icon-button danger"
                onClick={() => remove(product)}
                aria-label={`Supprimer ${product.name}`}
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div
          className="modal-backdrop"
          onClick={() => setOpen(false)}
        >
          <div
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Formulaire produit"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <span className="eyebrow">CATALOGUE BS3</span>

                <h3>
                  {editingId ? "Modifier le produit" : "Ajouter un produit"}
                </h3>
              </div>

              <button
                className="icon-button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
              >
                <X />
              </button>
            </div>

            <form onSubmit={submit} className="product-form">
              <label>
                Nom du produit
                <input
                  required
                  maxLength="120"
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                />
              </label>

              <label>
                Catégorie
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm({ ...form, category: event.target.value })
                  }
                >
                  <option>Informatique</option>
                  <option>Électroménager</option>
                  <option>Équipement professionnel</option>
                  <option>Bureautique</option>
                  <option>Autre</option>
                </select>
              </label>

              <label>
                Prix (FCFA)
                <input
                  required
                  min="0"
                  type="number"
                  value={form.price}
                  onChange={(event) =>
                    setForm({ ...form, price: event.target.value })
                  }
                />
              </label>

              <label>
                URL de l'image
                <input
                  type="url"
                  placeholder="https://…"
                  value={form.image}
                  onChange={(event) =>
                    setForm({ ...form, image: event.target.value })
                  }
                />
              </label>

              <label>
                Description
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                />
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(event) =>
                    setForm({ ...form, available: event.target.checked })
                  }
                />
                Produit disponible
              </label>

              <button
                className="button full-button"
                type="submit"
                disabled={busy}
              >
                {busy
                  ? "Enregistrement…"
                  : editingId
                    ? "Enregistrer les modifications"
                    : "Créer le produit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}