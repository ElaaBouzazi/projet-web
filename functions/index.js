const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const { Parser } = require("json2csv");

admin.initializeApp();

// Utilisation de variables d'environnement pour protéger les informations sensibles
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Remplacez par votre variable d'environnement
    pass: process.env.GMAIL_PASS, // Remplacez par votre variable d'environnement
  },
});

// Fonction d'exportation de Firestore en CSV
exports.exportFirestoreToCsv = functions.https.onRequest(async (req, res) => {
  try {
    // Récupération des collections Firestore
    const collections = await admin.firestore().listCollections();
    let allData = [];

    // Parcours de chaque collection pour récupérer les données
    for (const collection of collections) {
      const snapshot = await collection.get();
      const data = snapshot.docs.map((doc) => ({
        collection: collection.id,
        id: doc.id,
        ...doc.data(),
      }));
      allData = allData.concat(data);
    }

    // Vérification si des données ont été récupérées
    if (allData.length === 0) {
      return res.status(404).send("Aucune donnée trouvée dans Firestore.");
    }

    // Conversion des données JSON en CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(allData);

    // Configuration de l'email avec pièce jointe
    const mailOptions = {
      from: process.env.GMAIL_USER, // Utilisation de la variable d'environnement
      to: "sabrinaghezaladjerrad@gmail.com",
      subject: "Export Firestore en CSV",
      text: "Veuillez trouver le fichier CSV contenant toutes les données Firestore en pièce jointe.",
      attachments: [
        {
          filename: "firestore_export.csv",
          content: csv,
        },
      ],
    };

    // Envoi de l'email avec la pièce jointe CSV
    await transporter.sendMail(mailOptions);

    // Réponse de succès
    res.status(200).send("Email avec le fichier CSV envoyé avec succès !");
  } catch (error) {
    // Gestion des erreurs
    console.error("Erreur lors de l'exportation :", error);
    res.status(500).send("Erreur lors de l'exportation.");
  }
});
