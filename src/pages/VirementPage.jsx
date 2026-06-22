// pages/VirementPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, CheckCircle } from "lucide-react";

const UBA_RED = "#E31E24";

export default function VirementPage({ navigate }) {
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    beneficiaire: "",
    iban: "",
    montant: "",
    motif: "",
  });

  const [recu, setRecu] = useState(null);

  const formatMontant = (montant) =>
    new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
    }).format(montant);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transaction = {
      id: Date.now(),
      beneficiaire: form.beneficiaire,
      iban: form.iban,
      montant: form.montant,
      motif: form.motif,
      date: new Date().toLocaleString("fr-FR"),
      expediteur: currentUser?.nom || "Client",
    };

    setRecu(transaction);
  };

  // ====== REÇU ======
  if (recu) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white shadow rounded-2xl p-6 w-full max-w-md text-center">
          <CheckCircle size={50} style={{ color: "green" }} className="mx-auto mb-3" />

          <h2 className="text-xl font-bold mb-4">Reçu de virement</h2>

          <div className="text-left text-sm space-y-2">
            <p><strong>Expéditeur :</strong> {recu.expediteur}</p>
            <p><strong>Bénéficiaire :</strong> {recu.beneficiaire}</p>
            <p><strong>IBAN :</strong> {recu.iban}</p>
            <p><strong>Motif :</strong> {recu.motif}</p>
            <p><strong>Date :</strong> {recu.date}</p>
            <p className="text-lg font-bold mt-3" style={{ color: UBA_RED }}>
              Montant : {formatMontant(recu.montant)} €
            </p>
          </div>

          <button
            onClick={() => navigate("dashboard")}
            className="w-full mt-6 text-white py-3 rounded-full font-bold"
            style={{ background: UBA_RED }}
          >
            Retour au dashboard
          </button>
        </div>
      </div>
    );
  }

  // ====== FORMULAIRE ======
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("dashboard")}>
          <ArrowLeft />
        </button>
        <h1 className="font-bold">Virement bancaire</h1>
      </header>

      <main className="max-w-md mx-auto w-full p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-2xl shadow space-y-4"
        >
          <input
            type="text"
            name="beneficiaire"
            placeholder="Nom du bénéficiaire"
            className="w-full border p-3 rounded-lg"
            value={form.beneficiaire}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="iban"
            placeholder="IBAN"
            className="w-full border p-3 rounded-lg"
            value={form.iban}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="montant"
            placeholder="Montant"
            className="w-full border p-3 rounded-lg"
            value={form.montant}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="motif"
            placeholder="Motif du virement"
            className="w-full border p-3 rounded-lg"
            value={form.motif}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full text-white py-3 rounded-full font-bold"
            style={{ background: UBA_RED }}
          >
            Effectuer le virement
          </button>
        </form>
      </main>
    </div>
  );
}