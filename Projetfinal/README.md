# Projetfinal — BS3 Entreprise Multiservices

Application vitrine e-commerce légère pour BS3 Entreprise Multiservices :
- Frontend React + Vite
- Backend Node.js + Express
- MongoDB + Mongoose
- API CRUD des produits
- Recherche et filtre des produits
- Commande WhatsApp
- Interface de gestion des produits (démo, sans authentification)

## Prérequis
- Node.js récent (LTS recommandé)
- npm
- Un compte MongoDB Atlas ou une instance MongoDB accessible

## 1. Installer le backend

Dans un terminal VS Code :

```powershell
cd backend
npm install
```

Copiez `.env.example` vers `.env`, puis renseignez `MONGO_URI` et `PORT`.

```powershell
Copy-Item .env.example .env
```

Démarrer le serveur en développement :

```powershell
npm run dev
```

API : `http://localhost:5000/api`
Vérification : `http://localhost:5000/api/health`
Produits : `http://localhost:5000/api/products`

Pour charger les produits de démonstration (facultatif) :

```powershell
npm run seed
```

## 2. Installer le frontend

Ouvrez un deuxième terminal :

```powershell
cd frontend
npm install
```

Créez `frontend/.env` à partir de `.env.example` :

```powershell
Copy-Item .env.example .env
```

Démarrer React :

```powershell
npm run dev
```

Ouvrez l'adresse affichée par Vite, généralement `http://localhost:5173`.

## 3. Tester le CRUD avec Postman

- `GET http://localhost:5000/api/products`
- `GET http://localhost:5000/api/products/ID_DU_PRODUIT`
- `POST http://localhost:5000/api/products` avec Body > raw > JSON :
```json
{
  "name": "Ordinateur portable HP",
  "category": "Informatique",
  "price": 250000,
  "description": "Ordinateur portable pour le travail et les études",
  "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  "available": true
}
```
- `PUT http://localhost:5000/api/products/ID_DU_PRODUIT` avec les champs à modifier
- `DELETE http://localhost:5000/api/products/ID_DU_PRODUIT`

Pour POST/PUT, sélectionner `Content-Type: application/json`.

## 4. Images et identité visuelle

Les images de démonstration utilisent des URL d'images externes. Pour mettre le vrai logo et les images de BS3 :
1. Copiez vos images dans `frontend/public/images/`.
2. Utilisez des chemins tels que `/images/logo-babs.png` ou `/images/fond.png`.
3. Évitez les chemins Windows absolus comme `C:\\Users\\...`, qui ne fonctionneront pas après déploiement.

## 5. Déploiement

- MongoDB : créer une base sur MongoDB Atlas, autoriser l'adresse IP du serveur de déploiement et copier l'URI de connexion dans `MONGO_URI`.
- Backend : déployer le dossier `backend` sur un hébergeur Node (par exemple Render). Ajouter `MONGO_URI`, `CLIENT_URL` et `NODE_ENV=production` dans les variables d'environnement de l'hébergeur.
- Frontend : déployer le dossier `frontend` sur un hébergeur statique (par exemple Vercel ou Netlify). Définir `VITE_API_URL` avec l'URL publique du backend, en terminant par `/api`.
- Ajouter le domaine frontend dans `CLIENT_URL` côté backend.
- Ne jamais publier le fichier `.env` ni son URI MongoDB.

## Sécurité avant une mise en production réelle
La page de gestion est volontairement une démo pédagogique et n'est pas protégée par une connexion administrateur. Avant un usage public, ajouter une authentification, des rôles, une validation plus stricte et une protection contre les abus. Ne pas utiliser de données confidentielles dans la démo.
