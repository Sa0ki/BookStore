import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import B1 from './images/B1.jpg';
import B2 from './images/B2.jpg';
import B3 from './images/B3.jpg';
import B4 from './images/B4.jpg';
import B5 from './images/B5.jpg';


const TousLesLivres = () => {
  const [livres, setLivres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:2233/livres/get');
      setLivres(result.data);
    };
    fetchData();
  }, []);

  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    const result = await axios.get(`http://localhost:2233/livres/search?nom=${event.target.value}`);
    setLivres(result.data);
  };

  async function deleteLivre(id) {
    const result = await axios.delete(`http://localhost:2233/livres/delete/${id}`);
    if (result.status === 200) {
      const newLivres = livres.filter((livre) => livre._id !== id);
      setLivres(newLivres);
    }
  }

  const renderImage = (imagePath) => {
    switch(imagePath){
        case "B1.jpg":
            return B1;
        case "B2.jpg":
            return B2;
        case "B3.jpg":
            return B3;
        case "B4.jpg":
            return B4;
        case "B5.jpg":
            return B5;
        default:
  }
}

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Liste des Livres</h2>
      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Recherche" onChange={handleSearch} value={searchTerm} />
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Description</th>
            <th>ISBN</th>
            <th>Auteur</th>
            <th>Editeur</th>
            <th>DE</th>
            <th>Cover</th>
            <th>Catégorie</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {livres.map((livre, index) => (
            <tr key={livre._id}>
              <td>{index + 1}</td>
              <td>{livre.nom}</td>
              <td>{livre.description}</td>
              <td>{livre.isbn}</td>
              <td>{livre.auteur}</td>
              <td>{livre.editeur}</td>
              <td>{new Date(livre.dateEdition).toLocaleDateString()}</td>
              <td>
                <center><img src={renderImage(livre.image)} alt={livre.nom} style={{ height: 80 }} /></center>
              </td>

              <td>{livre.categorie && livre.categorie.nom}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2">
                  Modifier
                </Button>
                <Button variant="danger" size="sm" onClick={()=>deleteLivre(livre._id)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to = "/responsable/livre/Add"><Button variant="primary" size="sm" className="me-2">Ajouter un Livre</Button></Link>
    </div>
  );
};

export default TousLesLivres;