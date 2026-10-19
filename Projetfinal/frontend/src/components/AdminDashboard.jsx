import {
  Package,
  CheckCircle2,
  Tags,
  Wallet,
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#64748b",
];

function formatPrice(value) {
  return `${Number(value).toLocaleString("fr-FR")} FCFA`;
}

export default function AdminDashboard({ products = [] }) {
  const totalProducts = products.length;

  const availableProducts = products.filter(
    (product) => product.available !== false
  ).length;

  const categories = products.reduce((result, product) => {
    const category = product.category || "Autre";

    result[category] = (result[category] || 0) + 1;

    return result;
  }, {});

  const totalCategories = Object.keys(categories).length;

  const totalValue = products.reduce((total, product) => {
    if (product.available === false) {
      return total;
    }

    const price = Number(product.price);

    return total + (Number.isFinite(price) ? price : 0);
  }, 0);

  const chartData = Object.entries(categories).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const recentProducts = [...products]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();

      return dateB - dateA;
    })
    .slice(0, 5);

  const stats = [
    {
      title: "Total des produits",
      value: totalProducts,
      icon: Package,
      description: "Produits dans le catalogue",
    },
    {
      title: "Produits disponibles",
      value: availableProducts,
      icon: CheckCircle2,
      description: "Produits proposés à la vente",
    },
    {
      title: "Catégories",
      value: totalCategories,
      icon: Tags,
      description: "Catégories représentées",
    },
    {
      title: "Valeur du catalogue",
      value: formatPrice(totalValue),
      icon: Wallet,
      description: "Somme des prix disponibles",
    },
  ];

  return (
    <section className="dashboard">
      <div className="dashboard-heading">
        <div>
          <span className="dashboard-eyebrow">
            <TrendingUp size={16} />
            ESPACE ADMINISTRATEUR
          </span>

          <h2>Tableau de bord</h2>

          <p>
            Bienvenue dans l'espace de gestion de BS3 Entreprise
            Multiservices.
          </p>
        </div>
      </div>

      <div className="dashboard-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article className="dashboard-stat" key={stat.title}>
              <div className="dashboard-stat-top">
                <span>{stat.title}</span>

                <span className="dashboard-icon">
                  <Icon size={22} />
                </span>
              </div>

              <strong className="dashboard-stat-value">
                {stat.value}
              </strong>

              <small>{stat.description}</small>
            </article>
          );
        })}
      </div>

      <div className="dashboard-grid">
        <article className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h3>Répartition par catégorie</h3>

              <p>Nombre de produits dans chaque catégorie</p>
            </div>
          </div>

          {chartData.length > 0 ? (
            <div className="dashboard-chart">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={95}
                    innerRadius={55}
                    paddingAngle={3}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) => [
                      `${value} produit(s)`,
                      "Quantité",
                    ]}
                  />

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="dashboard-empty">
              <Package size={35} />

              <p>Aucun produit à afficher pour le moment.</p>
            </div>
          )}
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h3>Derniers produits</h3>

              <p>Les cinq produits les plus récents</p>
            </div>
          </div>

          {recentProducts.length > 0 ? (
            <div className="dashboard-recent-list">
              {recentProducts.map((product, index) => (
                <div
                  className="dashboard-recent-item"
                  key={product._id || `${product.name}-${index}`}
                >
                  <div className="dashboard-product-icon">
                    <Package size={20} />
                  </div>

                  <div className="dashboard-recent-info">
                    <strong>{product.name}</strong>

                    <small>{product.category || "Autre"}</small>
                  </div>

                  <span className="dashboard-product-price">
                    {formatPrice(product.price)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="dashboard-empty">
              <Package size={35} />

              <p>Le catalogue est vide.</p>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}