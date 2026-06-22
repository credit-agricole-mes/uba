// services/UserService.js

export const usersDB = {
  "07893516": {
    id: 1,
    code: "07893516",
    password: "260826",
    nom: "Tehe Alexandre",
    email: "tehe.alexandre@gmail.com",
    telephone: "+225 07 68 93 51 69",
    adresse: "ABIDJAN, COCODY, RIVIERA 2",
    solde: 3250000000,
    devise: "FCFA",
    compteBloque: false,
    montantDeblocage: 92400,
    blockReason: "Votre compte a été temporairement bloqué pour des raisons de sécurité. Veuillez contacter votre conseiller.",
    numeroCompte: "CI93 CI059 0101 0100 0768 9300 018",
    bic: "UNAFCIABXXX",
    carte: "4298",
    exp: "12/27",
    decouvertAutorise: 0,
    decouvertUtilise: 0,
    transactions: [
      { id: 1, date: "2026-05-20", libelle: "Virement reçu - UBA", montant: 924607, type: "credit", categorie: "Virement" },
      { id: 2, date: "2026-04-15", libelle: "Achat en ligne - Amazon", montant: -89.99, type: "debit", categorie: "Achat" },
      { id: 3, date: "2026-04-10", libelle: "Retrait DAB", montant: -200, type: "debit", categorie: "Retrait" },
      { id: 4, date: "2026-03-28", libelle: "Virement reçu", montant: 3500, type: "credit", categorie: "Virement" },
      { id: 5, date: "2026-03-05", libelle: "Prélèvement loyer", montant: -850, type: "debit", categorie: "Logement" },
    ]
  }
};

export const loginUser = (code, password) => {
  const user = usersDB[code];
  if (!user) return { success: false, message: "Code client incorrect" };
  if (user.password !== password) return { success: false, message: "Mot de passe incorrect" };
  const { password: _, ...userSafe } = user;
  return { success: true, user: userSafe };
};