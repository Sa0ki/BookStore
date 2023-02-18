import {useState, useEffect} from "react"
import {NavLink, useNavigate} from "react-router-dom"
import ServiceResponsable from "../../Services/ResponsableServices"

//Componments of react bootstrap
import Table from "../../../node_modules/react-bootstrap/Table"
import Button from "../../../node_modules/react-bootstrap/Button"
//Componments of react bootstrap

//Css file for responsable
import "./Css/Responsable.css"

function TousLesResponsables(){

    const [responsables, setResponsables] = useState([]);
    const [recherche, setRecherche] = useState("")
    const [resultat, setResultat] = useState(null)

    const navigate = useNavigate()

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
            let pp = require("./Images/Responsables/" + pic)
            return <img className="profilePic" src={require("./Images/Responsables/"+pic)} alt="pic"/>
        }catch(error){
            pic="unknown.jpg"
            return <img className="profilePic" src={require("./Images/Responsables/unknown.jpg")} alt="pic"/>
        }
    }

    function rechercherResponsable(e){
        e.preventDefault();
        let r = responsables.find( r => (r.nom + r.prenom).toLowerCase() == recherche.replace(/\s/g, '').toLowerCase())
        console.log(recherche.replace(/\s/g, '').toLowerCase())
        if(r != undefined)
            navigate(`/master/responsable/get/${r._id}`)
        else
            setResultat(<h4>Aucun résultat.</h4>)
    }
    
    useEffect(()=>{
        getResponsables();
    }, []);

    return (
        <center>
            <input type="text" size="28" placeholder="Nom et prénom du responsable" onChange={(e)=>{setRecherche(e.target.value)}} onBlur={()=>setResultat(null)}/>&nbsp;&nbsp;
            <Button variant="warning" onClick={(e)=>rechercherResponsable(e)}>Rechercher</Button>
            {resultat}
        <br/><br/>
        <Button variant="primary"><NavLink to={"/master/responsable/ajouter"} style={isActive => ({textDecoration: "none", color: "white"})}>Nouveau</NavLink></Button>
        <br/><br/><br/>
        <div className="flex-container">
                    {
                        responsables.map((r, i) =>
                            <div className="flex-child"> 
                               <Table borderless>
                                <tbody>
                                    <tr>
                                        <td>{displayImage(r.image)}</td>
                                        <td></td> 
                                        <table>
                                           <br/><br/> 
                                           <tbody>
                                            <tr>
                                                <td><img className="icon" src={require("./Images/Icons/person.png")} alt="icon"/></td>
                                                <td><h8>{r.nom}&nbsp;{r.prenom}</h8></td>
                                            </tr>
                                            <tr>
                                                <td><img className="icon email" src={require("./Images/Icons/email.png")} alt="icon"/></td>
                                                <td><h8>{r.email}</h8></td>
                                            </tr>
                                            <tr>
                                                <td><img className="icon phone" src={require("./Images/Icons/phone.png")} alt="icon"/></td>
                                                <td><h8>{r.phone}</h8></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </tr>
                                    <center>
                                    <tr>
                                        <td>
                                        <NavLink to={`/master/responsable/update/${r._id}`} style={isActive => ({textDecoration: "none", color: "white"})}>
                                        <Button variant = "outline-success" size="sm">Modifier</Button>
                                        </NavLink>&nbsp;
                                        <Button variant="outline-danger" size="sm" onClick={()=>deleteResponsable(r._id)}>Supprimer</Button>
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
    )
}

export default TousLesResponsables