import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';


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
            <th>Image</th>
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
                <img src={livre.image} alt={livre.nom} style={{ height: 50 }} />
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
    </div>
  );
};

export default TousLesLivres;