import {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import ServiceResponsable from "../../Services/ResponsableServices"
import HeaderMaster from "../Master/HeaderMaster"
import {Table, Button, Form} from 'react-bootstrap';

//Css file for responsable
import "../Commun/Css/commun.css"

function TousLesResponsablesTab(){

    const [responsables, setResponsables] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sauvegarde, setSauvegarde] = useState([])

    async function getResponsables(){
        const result = await ServiceResponsable.getResponsables()
        console.log(result)
        setResponsables(result.data.data)
        setSauvegarde(result.data.data)
    }

    async function deleteResponsable(id){
        await ServiceResponsable.deleteResponsable(id)
        getResponsables()
    }

    function displayProfilePic(pic){
        try{
            return <img className="profilePic" src={require("./Images/Responsables/"+pic)} alt="pic"/>
        }catch(error){
            return <img className="profilePic" src={require("./Images/Responsables/unknown.jpg")} alt="pic"/>
        }
    }

    async function rechercherResponsable(e){
        setSearchTerm(e.target.value)

           let r = await sauvegarde.find(
            r => (r.nom + r.prenom + " ").toLowerCase() == searchTerm.toLowerCase().replace(/\s/g, '')
            || (r.prenom + r.nom + " ").toLowerCase() == searchTerm.toLowerCase().replace(/\s/g, '')
            || (r.nom  + " ")== searchTerm.toLowerCase().replace(/\s/g, '')
            || (r.prenom + " ")=== searchTerm.toLowerCase().replace(/\s/g, '')
            ) 
            if(r != undefined){
                setResponsables([r])
                console.log("Found ! " + e.target.value + "]")
            }
            else{
                setResponsables(sauvegarde)
            }
    }
    
    useEffect(()=>{
        getResponsables();
    }, []);

    return (
        <>
        <HeaderMaster/>
        
        <div className="container mt-5">
      <h2 className="mb-4">Les des responsables</h2>
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
                <center><img src={displayProfilePic(r.image)} alt={r.nom} style={{ height: 80 }} /></center>
              </td>
              <td>
              <Link to = {`/master/responsable/update/${r._id}`}><Button variant="primary" size="sm" className="me-2">Modifier</Button></Link>
                <Button variant="danger" size="sm" onClick={()=>deleteResponsable(livre._id)}>
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

export default TousLesResponsablesTab