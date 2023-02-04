import {useState, useEffect} from "react"
import {NavLink} from "react-router-dom"
import { Link } from "react-router-dom"
import ServiceResponsable from "../../Services/ResponsableServices"

//Componments of react bootstrap
import Table from "../../../node_modules/react-bootstrap/Table"
import Button from "../../../node_modules/react-bootstrap/Button"
//Componments of react bootstrap

function TousLesResponsables(){

    const [responsables, setResponsables] = useState([]);

     async function getResponsables(){
        const result = await ServiceResponsable.getResponsables()
        console.log(result)
        setResponsables(result.data);
    }

    async function deleteResponsable(id){
        await ServiceResponsable.deleteResponsable(id)
        getResponsables()
    }
    
    useEffect(()=>{
        getResponsables();
    }, []);

    return (
        <div>
            <center>
                <h2><Link to={"/master/responsable/ajouter"}>Ajouter un responsable</Link></h2>
                <Table condensed borderded hover variant="dark">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th><center>Action</center></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        responsables.map((r, i)=>
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{r.nom}</td>
                                    <td>{r.prenom}</td>
                                    <td>{r.email}</td>
                                    <td>
                                        <center>
                                            <Button variant="danger" onClick={()=>deleteResponsable(r._id)}>Supprimer</Button>
                                            &nbsp;&nbsp;&nbsp;<Button variant = "success"><NavLink to={`/products/edit/${r._id}`} 
                                            style={isActive => ({textDecoration: "none", color: "white"})}>Modifier</NavLink></Button>
                                        </center>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </Table>
            </center>
        </div>
    )
}

export default TousLesResponsables