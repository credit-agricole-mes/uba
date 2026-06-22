// pages/NotificationsPage.jsx
import React from "react";
import { ArrowLeft, TrendingUp, TrendingDown, Info, Bell, ShieldCheck } from "lucide-react";
import { BottomNav } from "./CartePage";

const UBA_RED = "#E31E24";

const notifications = [
  {
    id: 1, type: "success",
    titre: "Virement reçu",
    message: "Vous avez reçu un virement de 924 607 FCFA sur votre compte.",
    date: "Aujourd'hui, 09:14", icon: TrendingUp, lu: false,
  },
  {
    id: 2, type: "info",
    titre: "Paiement effectué",
    message: "Un paiement de 45 000 FCFA a été débité de votre compte.",
    date: "Aujourd'hui, 08:02", icon: TrendingDown, lu: false,
  },
  {
    id: 3, type: "info",
    titre: "Relevé disponible",
    message: "Votre relevé de compte du mois de mai est désormais disponible dans Documents.",
    date: "20 mai 2026", icon: Info, lu: true,
  },
  {
    id: 4, type: "success",
    titre: "Connexion sécurisée",
    message: "Une nouvelle connexion à votre compte a été vérifiée avec succès depuis votre appareil habituel.",
    date: "19 mai 2026", icon: ShieldCheck, lu: true,
  },
];

const typeStyles = {
  success: "bg-green-50 border-green-200 text-green-700",
  info: "bg-blue-50 border-blue-200 text-blue-700",
};

const iconStyles = {
  success: "bg-green-100 text-green-600",
  info: "bg-blue-100 text-blue-600",
};

export default function NotificationsPage({ navigate }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <button onClick={() => navigate("dashboard")} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <img src="images/L1.jpeg" alt="UBA" className="h-8 w-auto object-contain" />
        </div>
      </header>

      <main className="max-w-lg mx-auto w-full px-4 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
          <span className="text-white text-xs font-bold px-2 py-1 rounded-full" style={{ background: UBA_RED }}>
            {notifications.filter(n => !n.lu).length} nouvelles
          </span>
        </div>

        <div className="space-y-3">
          {notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                className={`border rounded-2xl p-4 flex gap-3 ${typeStyles[notif.type]} ${!notif.lu ? "shadow-sm" : "opacity-70"}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconStyles[notif.type]}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-sm">{notif.titre}</p>
                    {!notif.lu && <span className="w-2 h-2 rounded-full" style={{ background: UBA_RED }} />}
                  </div>
                  <p className="text-xs leading-relaxed mb-1">{notif.message}</p>
                  <p className="text-xs opacity-60">{notif.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNav navigate={navigate} active="notifications" />
    </div>
  );
}