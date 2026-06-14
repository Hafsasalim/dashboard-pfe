import React, { useState, useEffect } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler 
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

export default function Dashboard() {
  const [data, setData] = useState(null);
  // 💡 PASSÉ À FALSE ICI POUR ÉVITER LE CHARGEMENT INFINI SANS BACKEND
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    // Tentative de connexion en arrière-plan sans bloquer l'interface
    fetch('http://localhost:5000/api/dashboard-data') 
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.warn("Mode déconnecté : Affichage des données locales par défaut.");
      });
  }, []);

  if (loading) return <div style={styles.loading}>Initialisation du pipeline décisionnel SalesBI...</div>;

  // --- CONFIGURATION DES VISUELS (Données statiques de secours) ---
  const salesData = {
    labels: ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'],
    datasets: [
      {
        label: 'Ventes réelles',
        data: [58000, 62000, 55000, 71000, 68000, 80000, null, null, null, null, null, null],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Prédiction ML (ARIMA)',
        data: [null, null, null, null, null, null, 84000, 89000, 94800, null, null, null],
        borderColor: '#8b5cf6',
        borderDash: [6, 3],
        tension: 0.4,
        fill: false
      }
    ]
  };

  const donutData = {
    labels: ['Électronique', 'Vêtements', 'Alimentation', 'Autres'],
    datasets: [{
      data: [38, 24, 21, 17],
      backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
      borderWidth: 0
    }]
  };

  return (
    <div style={styles.container}>
      {/* MENU LATÉRAL */}
      <aside style={styles.sidebar}>
        <div style={styles.logoBox}>
          <h2 style={styles.logoText}>📊 SalesBI</h2>
          <p style={styles.logoSub}>Tableau de bord décisionnel</p>
        </div>
        <nav style={styles.nav}>
          <div style={styles.navItemActive}>Vue Générale</div>
          <div style={styles.navItem}>Prédictions ML</div>
        </nav>
        <div style={styles.footer}>Hafsa Salim</div>
      </aside>

      {/* ZONE COMMERCIALE PRINCIPALE */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.title}>Tableau de Bord — Vue Générale</h1>
          <span style={styles.badge}>Données visuelles</span>
        </header>

        {/* INDICATEURS KPI */}
        <section style={styles.kpiGrid}>
          <div style={styles.kpiCard}>
            <div style={styles.kpiLabel}>Chiffre d'affaires</div>
            <div style={styles.kpiValue}>842 500 MAD</div>
            <div style={styles.trendUp}>▲ +18.4% vs mois précédent</div>
          </div>
          <div style={styles.kpiCard}>
            <div style={styles.kpiLabel}>Commandes Totales</div>
            <div style={styles.kpiValue}>1 247</div>
            <div style={styles.trendUp}>▲ +9.2% ce trimestre</div>
          </div>
        </section>

        {/* GRAPHIQUES */}
        <section style={styles.chartGrid}>
          <div style={styles.chartCard}>
            <h3>Évolution des Ventes + Prédictions (ARIMA)</h3>
            <div style={{ height: '220px' }}><Line data={salesData} options={{ responsive: true, maintainAspectRatio: false }} /></div>
          </div>
          <div style={styles.chartCard}>
            <h3>Ventes par Catégorie</h3>
            <div style={{ height: '180px' }}><Doughnut data={donutData} options={{ responsive: true, maintainAspectRatio: false }} /></div>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#0b0f1a', color: '#f1f5f9', fontFamily: '"DM Sans", sans-serif', width: '100%' },
  sidebar: { width: '220px', backgroundColor: '#111827', borderRight: '1px solid #1e3a5f', padding: '24px 0', display: 'flex', flexDirection: 'column' },
  logoBox: { padding: '0 20px 24px', borderBottom: '1px solid #1e3a5f' },
  logoText: { fontSize: '17px', color: '#3b82f6', fontFamily: 'Space Grotesk', fontWeight: 'bold' },
  logoSub: { fontSize: '11px', color: '#475569' },
  nav: { padding: '16px 12px', flex: 1 },
  navItem: { padding: '10px 12px', fontSize: '13px', color: '#94a3b8', cursor: 'pointer' },
  navItemActive: { padding: '10px 12px', fontSize: '13px', color: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.15)', borderRadius: '8px', fontWeight: 500 },
  footer: { padding: '16px', borderTop: '1px solid #1e3a5f', fontSize: '12px', color: '#475569', textAlign: 'center' },
  main: { flex: 1, padding: '24px 28px', backgroundColor: '#0b0f1a' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  title: { fontSize: '20px', fontFamily: 'Space Grotesk', fontWeight: '600' },
  badge: { backgroundColor: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '4px 10px', borderRadius: '20px', fontSize: '11px' },
  kpiGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' },
  kpiCard: { backgroundColor: '#111827', border: '1px solid #1e3a5f', padding: '20px', borderRadius: '12px' },
  kpiLabel: { fontSize: '11px', color: '#475569', textTransform: 'uppercase' },
  kpiValue: { fontSize: '26px', fontWeight: '700', margin: '8px 0', color: '#3b82f6', fontFamily: 'Space Grotesk' },
  trendUp: { color: '#10b981', fontSize: '12px' },
  chartGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' },
  chartCard: { backgroundColor: '#111827', border: '1px solid #1e3a5f', padding: '20px', borderRadius: '12px' },
  loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0b0f1a', color: '#f1f5f9' }
};