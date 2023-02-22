import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import LivreService from "../../Services/LivreServices";
import B1 from "../Livre/images/B1.jpg";
import B2 from "../Livre/images/B2.jpg";
import B3 from "../Livre/images/B3.jpg";
import B4 from "../Livre/images/B4.jpg";
import B5 from "../Livre/images/B5.jpg";
import "./Style/Livres.css";

function Livres() {
  const [livres, setLivres] = useState([]);

  useEffect(() => {
    async function fetchLivres() {
      const response = await LivreService.getAllLivres();
      setLivres(response.data);
    }
    fetchLivres();
  }, []);

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
    <div className="container">
    <Container>
      <Row>
        {livres.map((livre) => (
          <Col md={3} className="mb-3">
            <Card>
              <div className="card-image">
                <Card.Img variant="top" src={renderImage(livre.image)} />
              </div>
              <div className="card">
              <Card.Body>
                <Card.Title><center><strong>{livre.nom}</strong></center></Card.Title>
                <Card.Text><strong>Auteur: </strong>{livre.auteur}</Card.Text>
                <Card.Text><strong>Catégorie: </strong></Card.Text>
                <Card.Text><strong>Prix: </strong>{livre.prix} €</Card.Text>
              </Card.Body>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
}

export default Livres;