// pages/ProfilPage.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, User, Mail, Phone, MapPin, LogOut, ShieldCheck, ChevronRight } from "lucide-react";
import { BottomNav } from "./CartePage";

const UBA_RED = "#E31E24";
const UBA_DARK = "#8b0000";

export default function ProfilPage({ navigate }) {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("login");
  };

  const infos = [
    { icon: User, label: "Nom complet", value: currentUser?.nom },
    { icon: Mail, label: "Email", value: currentUser?.email },
    { icon: Phone, label: "Téléphone", value: currentUser?.telephone },
    { icon: MapPin, label: "Adresse", value: currentUser?.adresse },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 flex flex-col">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8); }
          70% { transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        .fade-in-up {
          opacity: 0;
          animation: fadeSlideUp 0.5s ease-out forwards;
        }
        .pop-in {
          animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .info-row {
          transition: background-color 0.2s ease, padding-left 0.2s ease;
        }
        .info-row:hover {
          background-color: #fafafa;
          padding-left: 4px;
        }
        .info-row:hover .info-icon {
          transform: scale(1.08) rotate(-4deg);
        }
        .info-icon {
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .logout-btn {
          transition: all 0.2s ease;
        }
        .logout-btn:hover {
          background: ${UBA_RED} !important;
          color: white !important;
        }
        .logout-btn:active {
          transform: scale(0.97);
        }
      `}</style>

      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <button onClick={() => navigate("dashboard")} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <img src="images/L1.jpeg" alt="UBA" className="h-8 w-auto object-contain" />
        </div>
      </header>

      <main className="max-w-lg mx-auto w-full px-4 py-6 space-y-5">
        <h1 className="text-xl font-bold text-gray-900 fade-in-up" style={{ animationDelay: "0ms" }}>
          Mon profil
        </h1>

        {/* Carte d'identité avec avatar animé */}
        <div
          className="relative rounded-2xl p-6 flex items-center gap-4 overflow-hidden fade-in-up shadow-sm"
          style={{
            animationDelay: "60ms",
            background: `linear-gradient(135deg, white 0%, #fff5f5 100%)`,
          }}
        >
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-[0.06]" style={{ background: UBA_RED }} />

          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0 pop-in shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${UBA_RED}, ${UBA_DARK})`,
              animationDelay: "150ms",
              boxShadow: `0 8px 20px -6px ${UBA_RED}80`,
            }}
          >
            {currentUser?.nom?.charAt(0) || "G"}
          </div>
          <div className="relative">
            <p className="font-bold text-gray-900 text-lg">{currentUser?.nom}</p>
            <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-0.5">
              <ShieldCheck size={14} style={{ color: UBA_RED }} />
              Client UBA
            </p>
          </div>
        </div>

        {/* Informations personnelles */}
        <div className="bg-white rounded-2xl shadow-sm p-5 fade-in-up" style={{ animationDelay: "140ms" }}>
          <h2 className="font-bold text-gray-800 mb-2">Informations personnelles</h2>
          {infos.map(({ icon: Icon, label, value }, i) => (
            <div
              key={label}
              className="info-row flex items-center gap-4 py-3 border-b border-gray-100 last:border-0 rounded-lg -mx-1 px-1"
            >
              <div
                className="info-icon w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "#fdecea" }}
              >
                <Icon size={16} style={{ color: UBA_RED }} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-gray-800">{value || "—"}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Informations bancaires */}
        <div className="bg-white rounded-2xl shadow-sm p-5 fade-in-up" style={{ animationDelay: "220ms" }}>
          <h2 className="font-bold text-gray-800 mb-2">Informations bancaires</h2>
          <div className="info-row flex items-center justify-between py-3 border-b border-gray-100 rounded-lg -mx-1 px-1">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">IBAN</p>
              <p className="text-sm font-mono font-semibold text-gray-800">{currentUser?.numeroCompte}</p>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
          <div className="info-row flex items-center justify-between py-3 rounded-lg -mx-1 px-1">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">BIC / SWIFT</p>
              <p className="text-sm font-mono font-semibold text-gray-800">{currentUser?.bic}</p>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        </div>

        {/* Déconnexion */}
        <button
          onClick={handleLogout}
          className="logout-btn w-full bg-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm fade-in-up"
          style={{
            border: `2px solid ${UBA_RED}`,
            color: UBA_RED,
            animationDelay: "300ms",
          }}
        >
          <LogOut size={20} />
          Se déconnecter
        </button>
      </main>

      <BottomNav navigate={navigate} active="profil" />
    </div>
  );
}