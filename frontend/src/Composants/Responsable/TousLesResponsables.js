import {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import ServiceResponsable from "../../Services/ResponsableServices"
import LoginResponsable from "./LoginResponsable";
import {Table, Button, Form} from 'react-bootstrap';

//Css file for responsable
import "../Commun/Css/commun.css"

function TousLesResponsables(){

    const [responsables, setResponsables] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sauvegarde, setSauvegarde] = useState([])

    async function getResponsables(){
        const result = await ServiceResponsable.getResponsables()
        setResponsables(result.data.data)    
      }

    async function deleteResponsable(id){
        await ServiceResponsable.deleteResponsable(id)
        getResponsables()
    }

    function displayProfilePic(pic){
        try{
            return require("./Images/Responsables/"+pic)
        }catch(error){
            return require("./Images/Responsables/unknown.jpg")
        }
    }

    async function rechercherResponsable(e){
          setSearchTerm(e.target.value)
           const result = await ServiceResponsable.searchResponsableByName(e.target.value)
          setResponsables(result.data)
    }
    
    useEffect(()=>{
        getResponsables();
    }, []);

    return (
        <>
        <LoginResponsable/>
        
        <div className="container mt-5">
      <h2 className="mb-4">Liste des responsables</h2>
      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Recherche" onChange={(e)=>rechercherResponsable(e)} value={searchTerm} />
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {responsables.map((r, index) => (
            <tr key={r._id}>
              <td>{index + 1}</td>
              <td>{r.nom}</td>
              <td>{r.prenom}</td>
              <td>{r.email}</td>
              <td>{r.phone}</td>
              <td>
                <center><img src={displayProfilePic(r.image)} alt={r.image} style={{"border-radius": 60,  height: 40, width: 40}} /></center>
              </td>
              <td>
              <Link to = {`/master/responsable/update/${r._id}`}><Button variant="primary" size="sm" className="me-2">Modifier</Button></Link>
                <Button variant="danger" size="sm" onClick={()=>deleteResponsable()}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to = "/master/responsable/add"><Button variant="primary" size="sm" className="me-2">Ajouter un responsable</Button></Link>
    </div>
        </>
    )
}

export default TousLesResponsables