import {useState, useEffect} from "react"
import {NavLink} from "react-router-dom"
import { Link } from "react-router-dom"
import ServiceResponsable from "../../Services/ResponsableServices"

//Componments of react bootstrap
import Table from "../../../node_modules/react-bootstrap/Table"
import Button from "../../../node_modules/react-bootstrap/Button"
//Componments of react bootstrap

import "../../Css/Responsable.css"

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

    function saut(indice){
        if((indice + 1) % 3 == 0)
            return <br></br>
    }
    
    useEffect(()=>{
        getResponsables();
    }, []);

    return (
        <>
        <center>
        <Button><NavLink to={"/master/responsable/ajouter"} style={isActive => ({textDecoration: "none", color: "white"})}>Nouveau</NavLink></Button>
        <br/><br/><br/>
        <div className="flex-container">
                    {
                        responsables.map((r, i) =>
                       <div className="flex-child">
                        <center>
                        <table>
                            <tbody>
                            <center>
                            <tr><td><img src={require("./Images/" + r.image)} alt="Avatar"/></td></tr>
                            <tr><td><h5>{r.prenom + " " + r.nom}</h5></td></tr>
                            <tr><td><h5>{r.email}</h5></td></tr>
                            </center>
                            </tbody>
                            <thead>
                            <th>
                                    <td>
                                    <NavLink to={`/master/responsable/update/${r._id}`} style={isActive => ({textDecoration: "none", color: "white"})}>
                            <Button variant = "success">Modifier</Button></NavLink></td>
                            <td>   
                                <Button variant="danger" onClick={()=>deleteResponsable(r._id)}>Supprimer</Button>
                                    </td>
                                </th>   
                            </thead>         
                        </table>   
                        </center> 
                        </div>
                    )
                    }
        </div>
        </center>
        </>
    )
}

export default TousLesResponsables