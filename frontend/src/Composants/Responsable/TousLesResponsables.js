import {useState, useEffect} from "react"
import {NavLink} from "react-router-dom"
import ServiceResponsable from "../../Services/ResponsableServices"

//Componments of react bootstrap
import Table from "../../../node_modules/react-bootstrap/Table"
import Button from "../../../node_modules/react-bootstrap/Button"
//Componments of react bootstrap

//Css file for responsable
import "./Css/Responsable.css"

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

    function displayImage(pic){
        try{
            let pp = require("./Images/" + pic)
            return <img className="profilePic" src={require("./Images/"+pic)} alt="pic"/>
        }catch(error){
            pic="unknown.jpg"
            return <img className="profilePic" src={require("./Images/unknown.jpg")} alt="pic"/>
        }
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
                               <Table borderless>
                                <tbody>
                                    <tr>
                                        <td>
                                            {displayImage(r.image)}
                                        </td>
                                        <td></td> 
                                        <table>
                                           <br/><br/> 
                                           <tbody>
                                            <tr>
                                                <td>
                                                    <img className="icon" src={require("./Images/person.png")} alt="icon"/>
                                                </td>
                                                <td>
                                                    <h8>{r.nom}&nbsp;{r.prenom}</h8>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img className="icon email" src={require("./Images/email.png")} alt="icon"/>
                                                </td>
                                                <td>
                                                    <h8>{r.email}</h8>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img className="icon phone" src={require("./Images/phone.png")} alt="icon"/>
                                                </td>
                                                <td>
                                                    <h8>{r.phone}</h8>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </tr>
                                    <center>
                                    <tr>
                                        <td>
                                        <NavLink to={`/master/responsable/update/${r._id}`} style={isActive => ({textDecoration: "none", color: "white"})}>
                                        <Button variant = "success" size="sm">Modifier</Button>
                                        </NavLink>&nbsp;
                                        <Button variant="danger" size="sm" onClick={()=>deleteResponsable(r._id)}>Supprimer</Button>
                                        </td>
                                    </tr>
                                    </center>
                                </tbody>
                               </Table>
                            </div>
                        )
                    }
        </div>
        </center>
        </>
    )
}

export default TousLesResponsables