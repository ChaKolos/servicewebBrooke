const express = require('express');
const app = express();
const db = require('./database');

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/////////////////// Get //////////////////////////////////////////////////////////////////


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
  

//  Liste des livres
  app.get('/livres', (req, res) => {
    db.query('SELECT * FROM Livres', (error, results) => {
      if (error) res.status(500).send('Erreur lors de la récupération des livres');
      else res.json(results);
    });
  });


// Liste Livres par idProduit
app.get('/livres/:idProduit', (req, res) => {
    const livreIdProduit = req.params.idProduit;

    db.query('SELECT * FROM Livres WHERE idProduit = ?', [livreIdProduit], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    });
  });
  
  

//  Liste des films
  app.get('/films', (req, res) => {
    db.query('SELECT * FROM Films', (error, results) => {
      if (error) res.status(500).send('Erreur lors de la récupération des films');
      else res.json(results);
    });
  });


// Liste films par idProduit
app.get('/films/:idProduit', (req, res) => {
    const filmIdProduit = req.params.idProduit;
    db.query('SELECT * FROM Films WHERE idProduit = ?', [filmIdProduit], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Film not found' });
      }
    });
  });
  
  

//  Liste des jeux
  app.get('/jeux', (req, res) => {
    db.query('SELECT * FROM Jeux', (error, results) => {
      if (error) res.status(500).send('Erreur lors de la récupération des jeux');
      else res.json(results);
    });
  });


// Liste jeux par idProduit
app.get('/jeux/:idProduit', (req, res) => {
    const jeuxIdProduit = req.params.idProduit;
    db.query('SELECT * FROM Jeux WHERE idProduit = ?', [jeuxIdProduit], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Game not found' });
      }
    });
  });
  

// Liste de tout les Commandes
  app.get('/suivi-commandes', (req, res) => {
    db.query('SELECT * FROM Commande', (error, results) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération des commandes');
      } else {
        res.json(results);
      }
    });
  });


// Commande par numero
app.get('/commandes/:numero', (req, res) => {
    const numeroCommande = req.params.numero;

    db.query('SELECT * FROM Commande WHERE numero = ?', [numeroCommande], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Commande non trouvé' });
      }
    });
  });


  // Liste Clients par ID
app.get('/clients/:id', (req, res) => {
    const clientId = req.params.id;

    db.query('SELECT * FROM Client WHERE id = ?', [clientId], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Client non trouvé' });
      }
    });
  });


  // Liste Tout les Clients
app.get('/clients', (req, res) => {
    db.query('SELECT * FROM Client', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  
  // Employe par Matricules
app.get('/employes/:matricule', (req, res) => {
    const employeeMatricule = req.params.matricule;
    db.query('SELECT * FROM Employe WHERE matricule = ?', [employeeMatricule], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    });
  });
  

  // Fournisseurs par numero
app.get('/fournisseurs/:numero', (req, res) => {
    const fournisseursNumero = req.params.numero;
    db.query('SELECT * FROM Fournisseurs WHERE numero = ?', [fournisseursNumero], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Supplier not found' });
      }
    });
  });


  // Liste de tout les fournisseurs
  app.get('/fournisseurs', (req, res) => {
    db.query('SELECT * FROM Fournisseurs', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });


  
/////////////////// Post //////////////////////////////////////////////////////////////////

  //  ajouter un produit
  app.post('/addProduit', (req, res) => {
    const { id, titre, prix, description, image, quantiteEnStock, quantiteMinStock, etat} = req.body;
    const query = 'INSERT INTO Produits (id, titre, prix, description, image, quantiteEnStock, quantiteMinStock, etat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [id, titre, prix, description, image, quantiteEnStock, quantiteMinStock, etat], (error) => {
      if (error) res.status(500).send("Erreur lors de l'ajout du Produit");
      else res.status(201).send('Produit ajouté avec succès');
    });
  });

  //  ajouter un produit de type Livre
  app.post('/addLivre', (req, res) => {
    const { idProduit, isbn, dateParution, editeur, auteurs } = req.body;
    const query = 'INSERT INTO Livres (idProduit, isbn, dateParution, editeur, auteurs) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [idProduit, isbn, dateParution, editeur, auteurs], (error) => {
      if (error) res.status(500).send("Erreur lors de l'ajout du Livre");
      else res.status(201).send('Livre ajouté avec succès');
    });
  });
  
    //  ajouter un produit de type Film
  app.post('/addFilm', (req, res) => {
    const { idProduit, acteurs, realisateur, format, videoExtrait } = req.body;
    const queryFilm = 'INSERT INTO Films (idProduit, acteurs, realisateur, format, videoExtrait) VALUES (?, ?, ?, ?, ?)';
    
    db.query(queryFilm, [idProduit, acteurs, realisateur, format, videoExtrait], (error) => {
      if (error) res.status(500).send("Erreur lors de l'ajout du Film");
      else res.status(201).send('Film ajouté avec succès');
    });
  });
  
    //  ajouter un produit de type Jeux
  app.post('/addJeu', (req, res) => {
    const { idProduit, auteurs, collection } = req.body;
    const queryJeu = 'INSERT INTO Jeux (idProduit, auteurs, collection) VALUES (?, ?, ?)';
    
    db.query(queryJeu, [idProduit, auteurs, collection], (error) => {
      if (error) res.status(500).send("Erreur lors de l'ajout du Jeu");
      else res.status(201).send('Jeu ajouté avec succès');
    });
  });


  //  ajouter un nouveau client
  app.post('/addClient', (req, res) => {
    const { id, nom, prenom, courriel, telephone, adresse, photo, password } = req.body;
    const query = 'INSERT INTO Client (id, nom, prenom, courriel, telephone, adresse, photo, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [id, nom, prenom, courriel, telephone, adresse, photo, password], (error) => {
      if (error) res.status(500).send("Erreur lors de l'ajout du Client");
      else res.status(201).send('Client ajouté avec succès');
    });
  });

  // Ajouter une nouvelle commande
  app.post('/addCommande', (req, res) => {
    const { numero, date, idClient, etat } = req.body;
    const query = 'INSERT INTO Commande (numero, date, idClient, etat) VALUES (?, ?, ?, ?)';
    db.query(query, [numero, date, idClient, etat], (error) => {
      if (error) res.status(500).send("Erreur lors de l'ajout du Commande");
      else res.status(201).send('Commande ajoutée avec succès');
    });
  });

  // Ajouter une nouveau employe
  app.post('/addEmploye', (req, res) => {
    const { matricule, nom, prenom, courriel, password } = req.body;
    const query = 'INSERT INTO Employe (matricule, nom, prenom, courriel, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [matricule, nom, prenom, courriel, password], (error) => {
      if (error) res.status(500).send("Erreur lors de l'ajout du Employé");
      else res.status(201).send('Employé ajouté avec succès');
    });
  });
  

    // Ajouter une nouveau fournisseur
    app.post('/addFournisseur', (req, res) => {
      const { numero, entreprise, adresse } = req.body;
      const query = 'INSERT INTO Fournisseurs (numero, entreprise, adresse) VALUES (?, ?, ?)';
      db.query(query, [numero, entreprise, adresse], (error) => {
        if (error) res.status(500).send("Erreur lors de l'ajout du Fournisseur");
        else res.status(201).send('Fournisseur ajouté avec succès');
      });
    });
    

  
  


/////////////////// Put //////////////////////////////////////////////////////////////////

  // Mise à Jour de Profil
  app.put('/updateProfil/:id', (req, res) => {
    const { id } = req.params;
    const { nom, prenom, courriel, telephone, adresse, photo } = req.body;
  
    const query = 'UPDATE Client SET nom = ?, prenom = ?, courriel = ?, telephone = ?, adresse = ?, photo = ? WHERE id = ?';
    db.query(query, [nom, prenom, courriel, telephone, adresse, photo, id], (error) => {
      if (error) res.status(500).send('Erreur lors de la mise à jour du profil');
      else res.send('Profil mis à jour avec succès');
    });
  });
  
  // Réinitialisation de Mot de Passe
  app.put('/resetPassword/:id', (req, res) => {
      const { id } = req.params;
      const { newPassword } = req.body; // Assurez-vous de hacher le mot de passe
    
      const query = 'UPDATE Client SET password = ? WHERE id = ?';
      db.query(query, [newPassword, id], (error) => {
        if (error) res.status(500).send('Erreur lors de la réinitialisation du mot de passe');
        else res.send('Mot de passe réinitialisé avec succès');
      });
    });
      

  // Mise à Jour des Produits
  app.put('/updateProduit/:id', (req, res) => {
    const { id } = req.params;
    const { titre, prix, description, image, quantiteEnStock, quantiteMinStock, etat } = req.body;
  
    const query = 'UPDATE Produits SET titre = ?, prix = ?, description = ?, image = ?, quantiteEnStock = ?, quantiteMinStock = ?, etat = ? WHERE id = ?';
    db.query(query, [titre, prix, description, image, quantiteEnStock, quantiteMinStock, etat, id], (error) => {
      if (error) res.status(500).send('Erreur lors de la mise à jour du produit');
      else res.send('Produit mis à jour avec succès');
    });
  });

  // Mise à Jour etat commande
  app.put('/updateCommande/:numero', (req, res) => {
    const { numero } = req.params;
    const { date, idClient, etat } = req.body;
  
    const query = 'UPDATE Commande SET date = ?, idClient = ?, etat = ? WHERE numero = ?';
    db.query(query, [date, idClient, etat, numero], (error) => {
      if (error) res.status(500).send('Erreur lors de la mise à jour de la commande');
      else res.send('Commande mise à jour avec succès');
    });
  });
  



/////////////////// Delete //////////////////////////////////////////////////////////////////
  

  // Delete produits par id
app.delete('/deleteProduit/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Produits WHERE id = ?';
  db.query(query, [id], (error) => {
    if (error) res.status(500).send('Erreur lors de la suppression du produit');
    else res.send('Produit supprimé avec succès');
  });
});


  



          