// App.jsx
import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import VirementPage from "./pages/VirementPage";
import CartePage from "./pages/CartePage";
import ProfilPage from "./pages/ProfilPage";
import HistoriquePage from "./pages/HistoriquePage";
import NotificationsPage from "./pages/NotificationsPage";
import DocumentsPage from "./pages/DocumentsPage";

function AppContent() {
  const { currentUser } = useAuth();

  // 👉 récupère page sauvegardée
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem("rgc_page");
    return savedPage || "login";
  });

  // 🔥 IMPORTANT : synchroniser page avec login
  useEffect(() => {
    if (!currentUser) {
      setPage("login");
      localStorage.setItem("rgc_page", "login");
    }
  }, [currentUser]);

  const navigate = (destination) => {
    setPage(destination);
    localStorage.setItem("rgc_page", destination);
  };

  if (!currentUser && page !== "login") {
    return <LoginPage navigate={navigate} />;
  }

  switch (page) {
    case "login":
      return <LoginPage navigate={navigate} />;

    case "dashboard":
      return <DashboardPage navigate={navigate} />;

    case "virement":
      return <VirementPage navigate={navigate} />;

    case "carte":
      return <CartePage navigate={navigate} />;

    case "profil":
      return <ProfilPage navigate={navigate} />;

    case "historique":
      return <HistoriquePage navigate={navigate} />;

    case "notifications":
      return <NotificationsPage navigate={navigate} />;

    case "documents":
      return <DocumentsPage navigate={navigate} />;

    default:
      return <LoginPage navigate={navigate} />;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}