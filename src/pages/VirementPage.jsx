import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

const UBA_RED = "#E31E24";

const EMAILJS_SERVICE_ID = "service_cjaxn39";
const EMAILJS_TEMPLATE_ID = "template_xd6542w";
const EMAILJS_PUBLIC_KEY = "njMn_oOGEC89lGj7j";

export default function VirementPage({ navigate }) {
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    beneficiaire: "",
    iban: "",
    montant: "",
    motif: "",
    emailBeneficiaire: "",
  });

  const [recu, setRecu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const formatMontant = (montant) =>
    new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2 }).format(montant);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailError("");

    const transaction = {
      id: Date.now(),
      beneficiaire: form.beneficiaire,
      iban: form.iban,
      montant: form.montant,
      motif: form.motif,
      emailBeneficiaire: form.emailBeneficiaire,
      date: new Date().toLocaleString("fr-FR"),
      expediteur: currentUser?.nom || "Client",
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: transaction.emailBeneficiaire,
          beneficiaire: transaction.beneficiaire,
          expediteur: transaction.expediteur,
          montant: `${formatMontant(transaction.montant)} FCFA`,
          motif: transaction.motif || "—",
          date: transaction.date,
          iban: transaction.iban,
        },
        EMAILJS_PUBLIC_KEY
      );

      setRecu(transaction);
    } catch (err) {
      console.error("Erreur EmailJS :", err);
      setEmailError("Échec de l'envoi de l'email. Le virement a quand même été enregistré.");
      setRecu(transaction);
    } finally {
      setLoading(false);
    }
  };

  // ====== REÇU ======
  if (recu) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white shadow rounded-2xl p-6 w-full max-w-md text-center">
          <CheckCircle size={50} style={{ color: "green" }} className="mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-1">Reçu de virement</h2>

          {emailError && (
            <p className="text-xs text-orange-500 mb-3">{emailError}</p>
          )}
          {!emailError && (
            <p className="text-xs text-green-600 mb-3">
              ✅ Email envoyé à {recu.emailBeneficiaire}
            </p>
          )}

          <div className="text-left text-sm space-y-2">
            <p><strong>Expéditeur :</strong> {recu.expediteur}</p>
            <p><strong>Bénéficiaire :</strong> {recu.beneficiaire}</p>
            <p><strong>IBAN :</strong> {recu.iban}</p>
            <p><strong>Motif :</strong> {recu.motif || "—"}</p>
            <p><strong>Date :</strong> {recu.date}</p>
            <p className="text-lg font-bold mt-3" style={{ color: UBA_RED }}>
              Montant : {formatMontant(recu.montant)} FCFA
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
            type="email"
            name="emailBeneficiaire"
            placeholder="Email du bénéficiaire"
            className="w-full border p-3 rounded-lg"
            value={form.emailBeneficiaire}
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
            placeholder="Montant (FCFA)"
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
            disabled={loading}
            className="w-full text-white py-3 rounded-full font-bold flex items-center justify-center gap-2"
            style={{ background: UBA_RED, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Effectuer le virement"
            )}
          </button>
        </form>
      </main>
    </div>
  );
}