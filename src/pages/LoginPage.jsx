// pages/LoginPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Lock, Check } from "lucide-react";

const UBA_RED = "#E31E24";
const UBA_RED_DARK = "#A4151A";

export default function LoginPage({ navigate }) {
  const { login } = useAuth();
  const [step, setStep] = useState("code");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (code.length < 6) {
      setError("Le code client doit contenir au moins 6 chiffres");
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("password"); }, 700);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const result = login(code, password);
      setLoading(false);
      if (result.success) { navigate("dashboard"); } else { setError(result.message); }
    }, 800);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{
        background: `linear-gradient(160deg, ${UBA_RED} 0%, ${UBA_RED_DARK} 100%)`,
      }}
    >
      {/* Logo + nom banque au-dessus de la carte */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-white rounded-2xl p-2 shadow-lg">
          <img src="images/L1.jpeg" alt="UBA" className="h-10 w-auto object-contain" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">
          United Bank for Africa
        </span>
      </div>

      {/* Carte blanche flottante */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl px-7 py-9 sm:px-10 sm:py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {step === "code" ? "Connexion" : "Code secret"}
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          {step === "code" ? "Saisissez votre code client" : "Saisissez votre code secret"}
        </p>

        {step === "code" ? (
          <form onSubmit={handleCodeSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Code client</label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3.5 px-4 pr-11 text-xl tracking-widest font-semibold text-gray-900 focus:outline-none focus:bg-white transition-colors"
                  style={{
                    borderColor: error ? UBA_RED : code.length >= 6 ? "#16A34A" : undefined,
                  }}
                  onFocus={(e) => { if (!error && code.length < 6) e.target.style.borderColor = UBA_RED; }}
                  onBlur={(e) => { if (!error && code.length < 6) e.target.style.borderColor = ""; }}
                  placeholder="••••••••"
                  maxLength="10"
                  autoFocus
                />
                {code.length >= 6 && (
                  <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-600" size={20} />
                )}
              </div>
              {error && (
                <p className="text-sm mt-2 font-medium" style={{ color: UBA_RED }}>{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || code.length < 6}
              className="w-full text-white font-bold py-4 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg"
              style={{ background: UBA_RED, boxShadow: `0 8px 20px -6px ${UBA_RED}80` }}
            >
              {loading ? "Vérification..." : "Continuer"}
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Code secret</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  inputMode="numeric"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3.5 px-4 pr-11 text-xl tracking-widest font-semibold text-gray-900 focus:outline-none focus:bg-white transition-colors"
                  style={{
                    borderColor: error ? UBA_RED : password.length >= 4 ? "#16A34A" : undefined,
                  }}
                  onFocus={(e) => { if (!error && password.length < 4) e.target.style.borderColor = UBA_RED; }}
                  onBlur={(e) => { if (!error && password.length < 4) e.target.style.borderColor = ""; }}
                  placeholder="••••••"
                  maxLength="6"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && (
                <p className="text-sm mt-2 font-medium" style={{ color: UBA_RED }}>{error}</p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setStep("code"); setError(""); setPassword(""); }}
                className="flex-1 border-2 border-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-50 transition active:scale-[0.98]"
              >
                Retour
              </button>
              <button
                type="submit"
                disabled={loading || password.length < 4}
                className="flex-1 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg"
                style={{ background: UBA_RED, boxShadow: `0 8px 20px -6px ${UBA_RED}80` }}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-400 text-xs">
          <Lock size={14} />
          <span>Connexion sécurisée SSL 256 bits</span>
        </div>
      </div>

      <p className="text-center mt-6 text-xs text-white/70">
        © 2015 United Bank for Africa (UBA) – Tous droits réservés
      </p>
    </div>
  );
}