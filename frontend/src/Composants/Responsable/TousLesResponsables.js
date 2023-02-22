import {useState, useEffect} from "react"
import {NavLink, useNavigate} from "react-router-dom"
import ServiceResponsable from "../../Services/ResponsableServices"
import HeaderMaster from "../Master/HeaderMaster"

//Componments of react bootstrap
import Table from "../../../node_modules/react-bootstrap/Table"
import Button from "../../../node_modules/react-bootstrap/Button"
//Componments of react bootstrap

//Css file for responsable
import "../Commun/Css/commun.css"

function TousLesResponsables(){

    const [responsables, setResponsables] = useState([]);
    const [recherche, setRecherche] = useState("")
    const [resultat, setResultat] = useState(null)
    const [timer, setTimer] = useState(false)

    const navigate = useNavigate()

     async function getResponsables(){
        const result = await ServiceResponsable.getResponsables()
        console.log(result)
        setResponsables(result.data.data);
    }

    function displayProfilePic(pic){
        try{
            return <img className="profilePic" src={require("./Images/Responsables/"+pic)} alt="pic"/>
        }catch(error){
            return <img className="profilePic" src={require("./Images/Responsables/unknown.jpg")} alt="pic"/>
        }
    }

    function displayMore(id){
        try{
            return <img className="more" src={require("../Commun/Images/Icons/more.png")} alt="pic"/>
        }catch(error){
            return <img className="more" src={require("./Images/Responsables/unknown.jpg")} alt="pic"/>
        }
    }

    function More(id){
        navigate(`/master/responsable/get/${id}`)
    }

    function rechercherResponsable(e){
        e.preventDefault();
        let r = responsables.find( r => (r.nom + r.prenom).toLowerCase() == recherche.replace(/\s/g, '').toLowerCase() || (r.prenom + r.nom).toLowerCase() == recherche.replace(/\s/g, '').toLowerCase() )
        if(r != undefined)
            navigate(`/master/responsable/get/${r._id}`)
        else{
            setTimer(true)
            setTimeout(()=>setTimer(false), 2000)
            setResultat(<h4>Aucun résultat.</h4>)
        } 
    }
    
    useEffect(()=>{
        getResponsables();
    }, []);

    return (
        <>
        <HeaderMaster/>
        
        <center>
            <input type="text" size="28" placeholder="Nom et prénom du responsable" onChange={(e)=>{setRecherche(e.target.value)}} onBlur={()=>setResultat(null)}/>&nbsp;&nbsp;
            <Button variant="warning" onClick={(e)=>rechercherResponsable(e)}>Rechercher</Button>
            {timer ? resultat : null}
        <br/><br/>
        <Button variant="primary"><NavLink to={"/master/responsable/add"} style={isActive => ({textDecoration: "none", color: "white"})}>Nouveau</NavLink></Button>
        <br/><br/><br/>
        <div className="flex-container">
                    {
                        responsables.map((r, i) =>
                            <div className="flex-child"> 
                               <Table borderless>
                                <tbody>
                                    <tr>
                                        <td>{displayProfilePic(r.image)}</td>
                                        <td></td> 
                                        <table>
                                           <br/><br/> 
                                           <tbody>
                                            <tr>
                                                <td><img className="person" src={require("../Commun/Images/Icons/person.png")} alt="icon"/></td>
                                                <td><h8>{r.nom}&nbsp;{r.prenom}</h8></td>
                                            </tr>
                                            <tr>
                                                <td><img className="icon email" src={require("../Commun/Images/Icons/email.png")} alt="icon"/></td>
                                                <td><h8>{r.email}</h8></td>
                                            </tr>
                                            <tr>
                                                <td><img className="icon phone" src={require("../Commun/Images/Icons/phone.png")} alt="icon"/></td>
                                                <td><h8>{r.phone}</h8></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </tr>
                                    <center>
                                    <tr>
                                        <td>
                                        <div onClick={()=>More(r._id)}>{displayMore(r._id)}</div>
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