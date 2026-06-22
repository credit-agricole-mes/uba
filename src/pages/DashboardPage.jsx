// pages/DashboardPage.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut, Lock, TrendingUp, TrendingDown, Send, Bell } from "lucide-react";
import { BottomNav } from "./CartePage";

const UBA_RED = "#E31E24";
const UBA_DARK = "#8b0000";

export default function DashboardPage({ navigate }) {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("login");
  };

  const formatMontant = (m) =>
    new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2 }).format(m);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 flex flex-col">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes ringPulse {
          0% { box-shadow: 0 0 0 0 rgba(227,30,36,0.35); }
          70% { box-shadow: 0 0 0 8px rgba(227,30,36,0); }
          100% { box-shadow: 0 0 0 0 rgba(227,30,36,0); }
        }
        .fade-in-up {
          opacity: 0;
          animation: fadeSlideUp 0.5s ease-out forwards;
        }
        .solde-card {
          animation: countUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .bell-badge {
          animation: ringPulse 2.2s ease-out infinite;
        }
        .quick-action {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
        }
        .quick-action:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px -8px rgba(0,0,0,0.12);
        }
        .quick-action:active {
          transform: translateY(-1px) scale(0.98);
        }
        .quick-action-icon {
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .quick-action:hover .quick-action-icon {
          transform: scale(1.1) rotate(-6deg);
        }
        .tx-row {
          opacity: 0;
          animation: fadeSlideUp 0.4s ease-out forwards;
          transition: background-color 0.2s ease;
          border-radius: 10px;
        }
        .tx-row:hover {
          background-color: #fafafa;
        }
        .logout-icon-btn {
          transition: transform 0.2s ease;
        }
        .logout-icon-btn:hover {
          transform: rotate(-8deg) scale(1.06);
        }
      `}</style>

      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <img src="images/L1.jpeg" alt="UBA" className="h-8 w-auto object-contain fade-in-up" style={{ animationDelay: "0ms" }} />
          <div className="flex items-center gap-2 fade-in-up" style={{ animationDelay: "60ms" }}>
            <button onClick={() => navigate("notifications")} className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
              <Bell size={22} className="text-gray-600" />
              <span
                className="bell-badge absolute top-1 right-1 w-4 h-4 text-white text-xs font-bold rounded-full flex items-center justify-center"
                style={{ background: UBA_RED }}
              >2</span>
            </button>
            <button
              onClick={handleLogout}
              className="logout-icon-btn w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90"
              style={{ background: UBA_RED }}
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto w-full px-4 py-6 space-y-4">
        <div className="fade-in-up" style={{ animationDelay: "80ms" }}>
          <p className="text-gray-500 text-sm">Bonjour,</p>
          <h1 className="text-xl font-bold text-gray-900">{currentUser?.nom}</h1>
        </div>

        {/* Carte solde */}
        <div
          className="solde-card relative rounded-2xl p-6 text-white shadow-lg overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${UBA_RED} 0%, ${UBA_DARK} 100%)`,
            animationDelay: "140ms",
            boxShadow: "0 20px 40px -16px rgba(139,0,0,0.45)",
          }}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white opacity-[0.06]" />
          <p className="relative text-sm mb-1" style={{ color: "rgba(255,255,255,0.8)" }}>Solde disponible</p>
          <p className="relative text-4xl font-bold tabular-nums">{formatMontant(currentUser?.solde)} {currentUser?.devise}</p>
          <p className="relative text-xs mt-2 font-mono" style={{ color: "rgba(255,255,255,0.6)" }}>{currentUser?.numeroCompte}</p>
        </div>

        {currentUser?.compteBloque && (
          <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: `2px solid ${UBA_RED}` }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#fdecea" }}>
                <Lock size={20} style={{ color: UBA_RED }} />
              </div>
              <div>
                <p className="font-bold" style={{ color: UBA_RED }}>Compte bloqué</p>
                <p className="text-xs text-gray-500">Action requise</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">{currentUser?.blockReason}</p>
            <div className="rounded-xl p-4 text-center" style={{ background: "#fdecea", border: "1px solid #f5c2c2" }}>
              <p className="text-sm mb-1 font-medium" style={{ color: UBA_RED }}>Montant requis pour le déblocage</p>
              <p className="text-3xl font-bold" style={{ color: UBA_RED }}>
                {formatMontant(currentUser?.montantDeblocage)} {currentUser?.devise}
              </p>
              <p className="text-xs text-gray-500 mt-2">Contactez votre conseiller UBA.</p>
            </div>
          </div>
        )}

        {/* Actions rapides */}
        <div className="grid grid-cols-2 gap-3 fade-in-up" style={{ animationDelay: "200ms" }}>
          <button onClick={() => navigate("virement")} className="quick-action bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm">
            <div className="quick-action-icon w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#fdecea" }}>
              <Send size={20} style={{ color: UBA_RED }} />
            </div>
            <p className="text-sm font-semibold text-gray-800">Virement</p>
          </button>
          <button onClick={() => navigate("historique")} className="quick-action bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm">
            <div className="quick-action-icon w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <p className="text-sm font-semibold text-gray-800">Historique</p>
          </button>
        </div>

        {/* Dernières opérations */}
        <div className="bg-white rounded-2xl shadow-sm p-5 fade-in-up" style={{ animationDelay: "260ms" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Dernières opérations</h2>
            <button onClick={() => navigate("historique")} className="text-xs font-semibold hover:underline" style={{ color: UBA_RED }}>Voir tout</button>
          </div>
          <div className="divide-y divide-gray-100">
            {(currentUser?.transactions || []).slice(0, 4).map((op, i) => (
              <div
                key={op.id}
                className="tx-row py-3 px-2 -mx-2 flex items-center justify-between"
                style={{ animationDelay: `${300 + i * 60}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${op.type === "credit" ? "bg-green-100" : "bg-orange-100"}`}>
                    {op.type === "credit"
                      ? <TrendingUp size={16} className="text-green-600" />
                      : <TrendingDown size={16} className="text-orange-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{op.libelle}</p>
                    <p className="text-xs text-gray-400">{new Date(op.date).toLocaleDateString("fr-FR")}</p>
                  </div>
                </div>
                <p className={`font-bold text-sm ${op.type === "credit" ? "text-green-600" : "text-gray-800"}`}>
                  {op.montant > 0 ? "+" : ""}{formatMontant(op.montant)} {currentUser?.devise}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav navigate={navigate} active="dashboard" />
    </div>
  );
}