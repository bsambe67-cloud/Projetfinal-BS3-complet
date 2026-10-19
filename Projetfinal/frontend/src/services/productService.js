// Adresse de l'API backend
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

// Récupérer le jeton de connexion de l'administrateur
function getAuthHeaders() {
  const token = sessionStorage.getItem("bs3_admin_token");

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}

// Charger tous les produits
export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.message || "Impossible de charger les produits depuis l'API."
    );
  }

  return result.data || [];
}

// Ajouter un produit
export async function createProduct(product) {
  return request("/products", "POST", product);
}

// Modifier un produit
export async function updateProduct(id, product) {
  return request(`/products/${id}`, "PUT", product);
}

// Supprimer un produit
export async function deleteProduct(id) {
  return request(`/products/${id}`, "DELETE");
}

// Fonction commune pour envoyer les requêtes au backend
async function request(path, method, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        "Accès refusé. Vérifiez votre connexion administrateur."
      );
    }

    throw new Error(result.message || "La requête a échoué.");
  }

  return result.data;
}