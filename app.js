const express = require('express');
const app = express();
const db = require('./database');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


  
  //  ajouter un produit de type Livre
app.post('/add-livre', (req, res) => {
    const { idProduit, isbn, dateParution, editeur, auteurs } = req.body;
    const query = 'INSERT INTO Livres (idProduit, isbn, dateParution, editeur, auteurs) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [idProduit, isbn, dateParution, editeur, auteurs], (error) => {
      if (error) res.status(500).send('Erreur lors de l\'ajout du livre');
      else res.status(201).send('Livre ajouté avec succès');
    });
  });
  
    //  ajouter un produit de type Film
  app.post('/add-film', (req, res) => {
    const { idProduit, acteurs, realisateur, format, videoExtrait } = req.body;
    const queryFilm = 'INSERT INTO Films (idProduit, acteurs, realisateur, format, videoExtrait) VALUES (?, ?, ?, ?, ?)';
    
    db.query(queryFilm, [idProduit, acteurs, realisateur, format, videoExtrait], (error) => {
      if (error) res.status(500).send('Erreur lors de l\'ajout du film');
      else res.status(201).send('Film ajouté avec succès');
    });
  });
  
    //  ajouter un produit de type Jeux
  app.post('/add-jeu', (req, res) => {
    const { idProduit, auteurs, collection } = req.body;
    const queryJeu = 'INSERT INTO Jeux (idProduit, auteurs, collection) VALUES (?, ?, ?)';
    
    db.query(queryJeu, [idProduit, auteurs, collection], (error) => {
      if (error) res.status(500).send('Erreur lors de l\'ajout du jeu');
      else res.status(201).send('Jeu ajouté avec succès');
    });
  });
  

  // Liste tous les produits
app.get('/Produits', (req, res) => {
    db.query('SELECT * FROM Produits', (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
  
  // Détails d'un produit par son ID
  app.get('/produit/:id', (req, res) => {
    const { id } = req.params;
    
    let table;
    if (id.startsWith('LIV')) {
      table = 'Livres';
    } else if (id.startsWith('FIL')) {
      table = 'Films';
    } else if (id.startsWith('JEU')) {
      table = 'Jeux';
    } else {
      res.status(400).send('ID de produit non valide');
      return;
    }
  
    const query = `SELECT * FROM ${table} WHERE idProduit = ?`;
    db.query(query, [id], (error, results) => {
      if (error) res.status(500).send('Erreur lors de la récupération du produit');
      else res.json(results);
    });
  });
  
//  Listez un produit de type Livres
  app.get('/livres', (req, res) => {
    db.query('SELECT * FROM Livres', (error, results) => {
      if (error) res.status(500).send('Erreur lors de la récupération des livres');
      else res.json(results);
    });
  });
  
//  Listez un produit de type Films
  app.get('/films', (req, res) => {
    db.query('SELECT * FROM Films', (error, results) => {
      if (error) res.status(500).send('Erreur lors de la récupération des films');
      else res.json(results);
    });
  });
  
//  Listez un produit de type Jeux
  app.get('/jeux', (req, res) => {
    db.query('SELECT * FROM Jeux', (error, results) => {
      if (error) res.status(500).send('Erreur lors de la récupération des jeux');
      else res.json(results);
    });
  });
  

// suivi des commandes 
  app.get('/suivi-commandes', (req, res) => {
    // Supposons une table Commande avec des informations sur les commandes
    db.query('SELECT * FROM Commande', (error, results) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération des commandes');
      } else {
        res.json(results);
      }
    });
  });
  


  // Mise à Jour de Profil

  app.put('/update-profil/:id', (req, res) => {
    const { id } = req.params;
    const { nom, prenom, courriel, telephone, adresse, photo } = req.body;
  
    const query = 'UPDATE Client SET nom = ?, prenom = ?, courriel = ?, telephone = ?, adresse = ?, photo = ? WHERE id = ?';
    db.query(query, [nom, prenom, courriel, telephone, adresse, photo, id], (error) => {
      if (error) res.status(500).send('Erreur lors de la mise à jour du profil');
      else res.send('Profil mis à jour avec succès');
    });
  });
  
    // Réinitialisation de Mot de Passe

    app.put('/reset-password/:id', (req, res) => {
        const { id } = req.params;
        const { newPassword } = req.body; // Assurez-vous de hacher le mot de passe
      
        const query = 'UPDATE Client SET password = ? WHERE id = ?';
        db.query(query, [newPassword, id], (error) => {
          if (error) res.status(500).send('Erreur lors de la réinitialisation du mot de passe');
          else res.send('Mot de passe réinitialisé avec succès');
        });
      });
      

          // Mise à Jour des Produits

          app.put('/update-produit/:id', (req, res) => {
            const { id } = req.params;
            const { titre, prix, description, image, quantiteEnStock, quantiteMinStock, etat } = req.body;
          
            const query = 'UPDATE Produits SET titre = ?, prix = ?, description = ?, image = ?, quantiteEnStock = ?, quantiteMinStock = ?, etat = ? WHERE id = ?';
            db.query(query, [titre, prix, description, image, quantiteEnStock, quantiteMinStock, etat, id], (error) => {
              if (error) res.status(500).send('Erreur lors de la mise à jour du produit');
              else res.send('Produit mis à jour avec succès');
            });
          });
          



       