const db = require("../models");
const Movie = db.movies;


// Créer et enregistrer un nouveau film
exports.create = (req, res) => {
  // Valider la requête
  if (!req.body.titre || !req.body.synopsis || !req.body.annee || !req.body.acteur) {
    res.status(400).send({ message: "Tous les champs doivent être remplis !" });
    return;
  }

  // Créer un film
  const movie = new Movie({
    
    titre: req.body.titre,
    synopsis: req.body.synopsis,
    annee: req.body.annee,
    acteur: req.body.acteur
  });

  // Enregistrer le film dans la base de données
  movie.save(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la création du film."
      });
    });
};

// Trouver un film par son ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Movie.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Aucun film trouvé avec l'ID ${id}.` });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: `Erreur lors de la recherche du film avec l'ID ${id}.` });
    });
};

// Récupérer tous les films de la base de données
exports.findAll = (req, res) => {
  const titre = req.query.titre;
  let condition = titre ? { titre: { $regex: new RegExp(titre), $options: "i" } } : {};

  Movie.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération des films."
      });
    });
};

// Mettre à jour un film par son ID
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Les données à mettre à jour ne peuvent pas être vides !"
    });
  }

  const id = req.params.id;

  Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de mettre à jour le film avec l'ID ${id}. Film non trouvé.`
        });
      } else res.send({ message: "Le film a été mis à jour avec succès." });
    })
    .catch(err => {
      res.status(500).send({
        message: `Erreur lors de la mise à jour du film avec l'ID ${id}.`
      });
    });
};

// Supprimer un film par son ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Movie.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de supprimer le film avec l'ID ${id}. Film non trouvé.`
        });
      } else {
        res.send({
          message: "Le film a été supprimé avec succès !"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Impossible de supprimer le film avec l'ID ${id}.`
      });
    });
};
