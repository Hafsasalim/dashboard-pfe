# Dashboard BI — Prédiction des Ventes
## Hafsa Salim — Frontend React
### ISMONTIC Tanger — PFE 2024

---

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Layout.jsx       # Layout principal (Sidebar + Topbar + Outlet)
│   ├── Sidebar.jsx      # Navigation latérale
│   ├── Topbar.jsx       # Barre supérieure
│   ├── KPICard.jsx      # Carte d'indicateur clé
│   ├── SalesChart.jsx   # Graphique ventes + prédictions (Chart.js)
│   ├── CategoryDonut.jsx# Graphique donut catégories
│   ├── PredictionPanel.jsx # Panel ML avec métriques
│   ├── TransactionTable.jsx# Tableau transactions filtrable
│   ├── TopProducts.jsx  # Top 5 produits
│   ├── AlertBanner.jsx  # Bannière d'alerte
│   └── PrivateRoute.jsx # Protection des routes
├── pages/               # Pages principales
│   ├── Login.jsx        # Page de connexion JWT
│   ├── Dashboard.jsx    # Vue générale (page principale)
│   ├── Ventes.jsx       # Analyse des ventes + régions
│   ├── Clients.jsx      # Gestion clients
│   ├── Produits.jsx     # Catalogue produits
│   ├── Predictions.jsx  # Prédictions ML détaillées
│   └── Rapports.jsx     # Rapports BI
├── services/
│   ├── api.js           # Instance Axios + interceptors JWT
│   └── salesService.js  # Appels API (avec mock data fallback)
├── context/
│   └── AuthContext.jsx  # Gestion authentification JWT
├── hooks/
│   └── useData.js       # Hooks personnalisés pour les données
└── utils/
    └── helpers.js       # Fonctions utilitaires
```

---

## 🚀 Installation et démarrage

```bash
# Installer les dépendances
npm install

# Démarrer en développement
npm start

# Builder pour production
npm run build
```

---

## 🔌 Configuration API

Dans le fichier `.env` :
```
REACT_APP_API_URL=http://localhost:5000/api
```

Si l'API Python n'est pas disponible, le frontend utilise automatiquement des **données mock** intégrées.

---

## 🔐 Authentification

- Login par email/mot de passe → token JWT
- Token stocké dans `localStorage`
- Toutes les requêtes API incluent `Authorization: Bearer <token>`
- Redirection auto vers `/login` si token expiré (401)

**Compte démo :** `admin@salesbi.ma` / `admin123`

---

## 📊 Endpoints API consommés

| Méthode | Endpoint             | Composant           |
|---------|----------------------|---------------------|
| POST    | `/auth/login`        | Login.jsx           |
| GET     | `/kpis`              | KPICard             |
| GET     | `/sales/monthly`     | SalesChart          |
| GET     | `/predictions`       | PredictionPanel     |
| GET     | `/sales/categories`  | CategoryDonut       |
| GET     | `/transactions`      | TransactionTable    |
| GET     | `/products/top`      | TopProducts         |
| GET     | `/clients`           | Clients.jsx         |
| GET     | `/sales/regional`    | Ventes.jsx          |

---

## 📦 Technologies

- **React 18** + React Router v6
- **Chart.js 4** + react-chartjs-2
- **Axios** pour les appels API
- **CSS Modules** pour le style
- **react-hot-toast** pour les notifications
- **DM Sans** + **Space Grotesk** (Google Fonts)

---

*Développé par Hafsa Salim — Partie Frontend React du projet PFE*
