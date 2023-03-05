import ServiceResponsable from "../../Services/ResponsableServices";
import LoginResponsable from "./LoginResponsable";
import {useEffect, useState} from "react";
import {useNavigate, NavLink, useParams} from "react-router-dom";

//Componments of react bootstrap
import Form from "../../../node_modules/react-bootstrap/Form"
import Button from "../../../node_modules/react-bootstrap/Button"
import Table from "../../../node_modules/react-bootstrap/Table"
//Componments of react bootstrap


//Css file for responsable
import "../Commun/Css/commun.css"

function ResultatRechercheResponsable(){

    const {id} = useParams()

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("")
    const [motDePasse, setMotDePasse] = useState("")
    const [image, setImage] = useState("")

    const navigate = useNavigate()

    async function getResponsableById(){
        const result = await ServiceResponsable.getResponsableById(id)
        console.log(result)
        setNom(result.data.data.nom)
        setPrenom(result.data.data.prenom)
        setEmail(result.data.data.email)
        setPhone(result.data.data.phone)
        setMotDePasse(result.data.data.motDePasse)
        setImage(result.data.data.image)
    }

    function displayImage(){
        try{
            return <img className="profilePic" src={require("./Images/Responsables/"+image)} alt="pic"/>
        }catch(error){
            setImage("unknown.jpg")
            return <img className="profilePic" src={require("./Images/Responsables/unknown.jpg")} alt="pic"/>
        }
    }

    async function deleteResponsable(id){
        await ServiceResponsable.deleteResponsable(id)
        navigate("/master/responsable/get")
    }

    useEffect(() => {
        getResponsableById()
    }, [])
    
    async function Submit(e){        
        e.preventDefault();
        navigate("/master/responsable/get")
    }

    return (
        <>
        <LoginResponsable/>
        <center>
            {displayImage()}
            <br/>
            <br/>
            <Form>
                <Table borderless size="sm">
                    <tbody>
                        <tr>
                            <td><center><input type="text" id="_id" disabled="disabled" value={id}/>&nbsp;&nbsp;&nbsp;
                            <input type ="password" id="motDePasse" disabled="disabled" value={motDePasse}/></center></td>
                        </tr>
                        <br/>
                        <tr>
                            <td><center><input type ="text" id="nom" disabled="disabled" value={nom} required/>&nbsp;&nbsp;&nbsp;
                            <input type ="text" id="prenom" disabled="disabled"value={prenom} required/></center></td>
                        </tr>
                        <br/>
                        <tr>
                            <td><center><input type ="email" id="email" disabled="disabled" value={email} required/>&nbsp;&nbsp;&nbsp;
                            <input type ="text" id="phone" disabled="disabled"value={phone} required/></center></td>
                        </tr>
                        <br/>
                        <tr><td><center><input type ="text" id="image" disabled="disabled" value={image}/></center></td></tr>
                        <br/>
                        <center>
                        <tr>
                            <td>
                                <NavLink to={`/master/responsable/update/${id}`} style={isActive => ({textDecoration: "none", color: "white"})}>
                                <Button variant = "outline-success">Modifier</Button>
                                </NavLink>&nbsp;
                                <Button variant="outline-danger" onClick={()=>deleteResponsable(id)}>Supprimer</Button>
                            </td>
                        </tr>
                        </center>
                        <br/>
                        <tr>
                            <td><center><Button variant="dark" onClick={(e)=>Submit(e)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Retour&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button></center></td>
                        </tr>
                    </tbody>
                </Table>   
            </Form>
        </center></>
    );
}

export default ResultatRechercheResponsable;