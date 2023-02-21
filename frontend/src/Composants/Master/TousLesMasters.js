import {useState, useEffect} from "react"
import {NavLink, useNavigate} from "react-router-dom"
import ServiceMaster from "../../Services/MasterServices"
import HeaderMaster from "./HeaderMaster"

//Componments of react bootstrap
import Table from "react-bootstrap/esm/Table"
import Button from "react-bootstrap/esm/Button"
//Componments of react bootstrap

//Css file for master
import "../Commun/Css/commun.css"

function TousLesMasters(){

    const [masters, setMasters] = useState([]);
    const [recherche, setRecherche] = useState("")
    const [resultat, setResultat] = useState(null)
    const [timer, setTimer] = useState(false)

    const navigate = useNavigate()

     async function getMasters(){
        const result = await ServiceMaster.getMasters()
        console.log(result)
        setMasters(result.data.data);
    }

    function displayProfilePic(pic){
        try{
            return <img className="profilePic" src={require("./Images/Masters/"+pic)} alt="pic"/>
        }catch(error){
            pic="unknown.jpg"
            return <img className="profilePic" src={require("./Images/Masters/unknown.jpg")} alt="pic"/>
        }
    }

    function displayMore(id){
        try{
            return <img className="more" src={require("../Commun/Images/Icons/more.png")} alt="pic"/>
        }catch(error){
            pic="unknown.jpg"
            return <img className="more" src={require("./Images/Masters/unknown.jpg")} alt="pic"/>
        }
    }

    function More(id){
        navigate(`/master/get/${id}`)
    }

    function rechercherMaster(e){
        e.preventDefault();
        let r = masters.find( r => (r.nom + r.prenom).toLowerCase() == recherche.replace(/\s/g, '').toLowerCase() || (r.prenom + r.nom).toLowerCase() == recherche.replace(/\s/g, '').toLowerCase() )
        if(r != undefined)
            navigate(`/master/get/${r._id}`)
        else{
            setTimer(true)
            setTimeout(()=>setTimer(false), 2000)
            setResultat(<h4>Aucun résultat.</h4>)
        } 
    }
    
    useEffect(()=>{
        getMasters();
    }, []);

    return (
        <>
        <HeaderMaster/>
        
        <center>
            <input type="text" size="28" placeholder="Nom et prénom du master" onChange={(e)=>{setRecherche(e.target.value)}} onBlur={()=>setResultat(null)}/>&nbsp;&nbsp;
            <Button variant="warning" onClick={(e)=>rechercherMaster(e)}>Rechercher</Button>
            {timer ? resultat : null}
        <br/><br/>
        <Button variant="primary"><NavLink to={"/master/add"} style={isActive => ({textDecoration: "none", color: "white"})}>Nouveau</NavLink></Button>
        <br/><br/><br/>
        <div className="flex-container">
                    {
                        masters.map((r, i) =>
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

export default TousLesMasters