import {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import ServiceMaster from "../../Services/MasterServices";
import LoginMaster from "../Master/LoginMaster"
import {Table, Button, Form} from 'react-bootstrap';

//Css file for responsable
import "../Commun/Css/commun.css"

function TousLesMasters(){

    const [masters, setMasters] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    async function getMasters(){
        const result = await ServiceMaster.getMasters()
        setMasters(result.data.data)    
      }

    async function deleteMaster(id){
        await ServiceMaster.deleteMaster(id)
        getMasters()
    }

    function displayProfilePic(pic){
        try{
            return require("./Images/Masters/"+pic)
        }catch(error){
            return require("./Images/Masters/unknown.jpg")
        }
    }

    async function rechercherMaster(e){
          setSearchTerm(e.target.value)
           const result = await ServiceMaster.searchMasterByName(e.target.value)
          setMasters(result.data)
    }
    
    useEffect(()=>{
        getMasters();
    }, []);

    return (
        <>
        <LoginMaster/>
        
        <div className="container mt-5">
      <h2 className="mb-4">Liste des masters</h2>
      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Recherche" onChange={(e)=>rechercherMaster(e)} value={searchTerm} />
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
          {masters.map((r, index) => (
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
              <Link to = {`/master/update/${r._id}`}><Button variant="primary" size="sm" className="me-2">Modifier</Button></Link>
                <Button variant="danger" size="sm" onClick={()=>deleteMaster(r._id)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to = "/master/add"><Button variant="primary" size="sm" className="me-2">Ajouter un responsable</Button></Link>
    </div>
        </>
    )
}

export default TousLesMasters