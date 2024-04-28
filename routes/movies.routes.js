// Importez express
const express = require("express");

// Exportez une fonction prenant l'application express en argument
module.exports = app => {
    const movies = require("../controllers/movies.controller.js");
    const router = express.Router();

    // Route pour créer un nouveau film
    router.post("/", movies.create);

    // Route pour récupérer tous les films
    router.get("/", movies.findAll);

    // Route pour récupérer un film par son ID
    router.get("/:id", movies.findOne);

    // Route pour mettre à jour un film par son ID
    router.put("/:id", movies.update);

    // Route pour supprimer un film par son ID
    router.delete("/:id", movies.delete);

    // Utilisez le routeur pour gérer les routes sous "/api/movies"
    app.use("/api/movies", router);
};
