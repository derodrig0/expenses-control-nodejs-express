// app.get("/transactions", (request, response) => {
//   console.log("GET transactions");
//   response.json([{ id: 1 }]);
// });
//GET    (Recupera uma transação expecífica) http://api.controle-de-gastos.com/transactions/:id
//POST   (Cria uma nova transação)           http://api.controle-de-gastos.com/transactions
//PUT    (Atualiza uma transação existente)  http://api.controle-de-gastos.com/transactions/:id
//DELETE (Apaga uma transação existente)     http://api.controle-de-gastos.com/transactions/:id

// --------------------------------------------------------------------------------------------------------- //

import express from "express";
import admin from "firebase-admin";

//REST API (Faz as chamadas HTTP entre o frontend e o backend) http://api.controle-de-gastos.com/transactions
const app = express();

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json"),
});

//GET (Recupera uma lista de transações)  http://api.controle-de-gastos.com/transactions
app.get("/transactions", (request, response) => {
  admin
    .firestore()
    .collection("transactions")
    .get()
    .then((snapshot) => {
      const transactions = snapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }));
      response.json(transactions);
    });
});

app.listen(3000, () =>
  console.log("API REST iniciada em http://localhost:3000")
);
