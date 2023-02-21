import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import LivreService from "../../Services/LivreServices";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function FormulaireLivre() {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setIsbn] = useState("");
  const [editeur, setEditeur] = useState("");
  const [dateEdition, setDateEdition] = useState("");
  const [image, setImage] = useState("");
  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");
  const [categorieId, setCategorieId] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const newLivre = {
      nom: nom,
      titre: titre,
      description: description,
      isbn: isbn,
      auteur: auteur,
      editeur: editeur,
      dateEdition: dateEdition,
      image: image,
      categorieId: categorieId
    };

    await LivreService.addLivre(newLivre);

    navigate("/responsable/livre/get");
  }

  return (
    <div class="container">
  <h1>Formulaire d'ajout de livre</h1>
  <form onSubmit={handleSubmit}>
    <div class="form-group">
      <label for="nom">Nom:</label>
      <input
        class="form-control"
        type="text"
        id="nom"
        value={nom}
        onChange={(event) => setNom(event.target.value)}
      />
    </div>

    <div class="form-group">
      <label for="description">Description:</label>
      <input
        class="form-control"
        type="text"
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
    </div>

    <div class="form-group">
      <label for="isbn">ISBN:</label>
      <input
        class="form-control"
        type="text"
        id="isbn"
        value={isbn}
        onChange={(event) => setIsbn(event.target.value)}
      />
    </div>

    <div class="form-group">
      <label for="editeur">Editeur:</label>
      <input
        class="form-control"
        type="text"
        id="editeur"
        value={editeur}
        onChange={(event) => setEditeur(event.target.value)}
      />
    </div>

    <div class="form-group">
  <label for="image">Image:</label>
  <input
    class="form-control"
    type="file"
    accept=".jpg, .jpeg, .png"
    id="image"
    onChange={(event) => setImage(event.target.files[0])}
  />
</div>
    <div class="form-group">
      <label for="titre">Titre:</label>
      <input
        class="form-control"
        type="text"
        id="titre"
        value={titre}
        onChange={(event) => setTitre(event.target.value)}
      />
    </div>

    <div class="form-group">
      <label for="auteur">Auteur:</label>
      <input
        class="form-control"
        type="text"
        id="auteur"
        value={auteur}
        onChange={(event) => setAuteur(event.target.value)}
      />
    </div>

    <div class="form-group">
      <label for="dateEdition">DE:</label>
      <input
        class="form-control"
        type="date"
        id="dateEdition"
        value={dateEdition}
        onChange={(event) => setDateEdition(event.target.value)}
      />
    </div>

    <div class="form-group">
      <label for="categorieId">Categorie:</label>
      <select
        class="form-control"
        id="categorieId"
        value={categorieId}
        onChange={(event) => setCategorieId(event.target.value)}
      >
        <option value="">--Choisir une categorie--</option>
        <option value="1">Romans</option>
        <option value="2">Science Fiction</option>
        <option value="3">Fantastique</option>
      </select>
    </div>

    <div class="form-group">
      <button class="btn btn-primary" type="submit">Ajouter</button>
      <button class="btn btn-secondary" type="button" onClick={() => navigate("/responsable/livre/get")}>
        Annuler
      </button>
    </div>
  </form>
</div>
  );
}

export default FormulaireLivre;
