// pages/CartePage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  ArrowLeft, CreditCard, ShieldCheck, Eye, EyeOff, Shield,
  Home, User, FileText, Bell, Wifi,
} from "lucide-react";

const UBA_RED = "#E31E24";
const UBA_DARK = "#B01018";
const UBA_GREEN = "#16A34A";

export default function CartePage({ navigate }) {
  const { currentUser } = useAuth();
  const [showCvv, setShowCvv] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <button onClick={() => navigate("dashboard")} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <img src="images/L1.jpeg" alt="UBA" className="h-8 w-auto object-contain" />
        </div>
      </header>

      <main className="max-w-lg mx-auto w-full px-4 py-6 space-y-5">
        <h1 className="text-xl font-bold text-gray-900">Ma carte bancaire</h1>

        {/* Carte premium avec relief et texture */}
        <div
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 hover:-translate-y-1"
          style={{
            background: `linear-gradient(135deg, ${UBA_RED} 0%, #8b0000 100%)`,
            aspectRatio: "1.586",
            boxShadow: "0 25px 50px -12px rgba(139, 0, 0, 0.45)",
          }}
        >
          {/* Décor texturé en fond */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-white opacity-[0.06] rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-white opacity-[0.06] rounded-full translate-y-10 -translate-x-10" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 12px)",
            }}
          />

          <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
            <div className="flex justify-between items-start">
              <span className="text-xl font-bold tracking-wide drop-shadow-sm">UBA</span>
              <span className="bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                <ShieldCheck size={12} /> ACTIVE
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Puce */}
              <div className="w-11 h-8 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-400 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-px p-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-yellow-600/30 rounded-[1px]" />
                  ))}
                </div>
              </div>
              <Wifi size={20} className="rotate-90 text-white/70" />
            </div>

            <div>
              <p className="text-lg font-mono tracking-[0.2em] mb-3 drop-shadow-sm">
                •••• •••• •••• {currentUser?.carte || "4298"}
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/60 text-[10px] mb-1 tracking-wide">TITULAIRE</p>
                  <p className="font-semibold text-sm uppercase tracking-wide">{currentUser?.nom}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-[10px] mb-1 tracking-wide">EXPIRE</p>
                  <p className="font-semibold">{currentUser?.exp || "12/27"}</p>
                </div>
                <div className="text-2xl font-bold italic opacity-90 drop-shadow-sm">VISA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Détails de la carte */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-1">
          <h2 className="font-bold text-gray-800 mb-3">Détails de la carte</h2>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
                <CreditCard size={16} className="text-gray-400" />
              </div>
              <span className="text-sm text-gray-600">Numéro</span>
            </div>
            <span className="font-mono font-semibold text-gray-800">
              •••• •••• •••• {currentUser?.carte || "4298"}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
                <Shield size={16} className="text-gray-400" />
              </div>
              <span className="text-sm text-gray-600">CVV</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-semibold text-gray-800">{showCvv ? "742" : "•••"}</span>
              <button onClick={() => setShowCvv(!showCvv)} className="text-gray-400 hover:text-gray-600 transition">
                {showCvv ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
                <CreditCard size={16} className="text-gray-400 rotate-90" />
              </div>
              <span className="text-sm text-gray-600">Date d'expiration</span>
            </div>
            <span className="font-semibold text-gray-800">{currentUser?.exp || "12/27"}</span>
          </div>

          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
                <ShieldCheck size={16} className="text-gray-400" />
              </div>
              <span className="text-sm text-gray-600">Statut</span>
            </div>
            <span
              className="font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"
              style={{ background: "#ecfdf3", color: UBA_GREEN }}
            >
              <ShieldCheck size={12} /> Active
            </span>
          </div>
        </div>
      </main>

      <BottomNav navigate={navigate} active="carte" />
    </div>
  );
}

function BottomNav({ navigate, active }) {
  const items = [
    { id: "dashboard", label: "Accueil", Icon: Home },
    { id: "carte", label: "Carte", Icon: CreditCard },
    { id: "profil", label: "Profil", Icon: User },
    { id: "documents", label: "Documents", Icon: FileText },
    { id: "notifications", label: "Alertes", Icon: Bell },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="max-w-lg mx-auto flex justify-around py-2">
        {items.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => navigate(id)}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors"
              style={{ color: isActive ? UBA_RED : "#9ca3af" }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.4 : 2} fill={isActive ? `${UBA_RED}1A` : "none"} />
              <span className="text-[11px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { BottomNav };