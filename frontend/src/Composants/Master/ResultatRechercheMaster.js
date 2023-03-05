import ServiceMaster from "../../Services/MasterServices";
import LoginMaster from "./LoginMaster";
import {useEffect, useState} from "react";
import {useNavigate, NavLink, useParams} from "react-router-dom";

//Componments of react bootstrap
import Form from "react-bootstrap/esm/Form"
import Button from "react-bootstrap/esm/Button"
import Table from "react-bootstrap/esm/Table"
//Componments of react bootstrap


//Css file for master
import "../Commun/Css/commun.css"

function ResultatRechercheMaster(){

    const {id} = useParams()

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [codeSecret, setCodeSecret] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("")
    const [motDePasse, setMotDePasse] = useState("")
    const [image, setImage] = useState("")

    const navigate = useNavigate()

    async function getMasterById(){
        const result = await ServiceMaster.getMasterById(id)
        console.log(result)
        setNom(result.data.data.nom)
        setPrenom(result.data.data.prenom)
        setCodeSecret(result.data.data.codeSecret)
        setEmail(result.data.data.email)
        setPhone(result.data.data.phone)
        setMotDePasse(result.data.data.motDePasse)
        setImage(result.data.data.image)
    }

    function displayImage(){
        try{
            return <img className="profilePic" src={require("./Images/Masters/"+image)} alt="pic"/>
        }catch(error){
            setImage("unknown.jpg")
            return <img className="profilePic" src={require("./Images/Masters/unknown.jpg")} alt="pic"/>
        }
    }

    async function deleteMaster(id){
        await ServiceMaster.deleteMaster(id)
        navigate("/master/get")
    }

    useEffect(() => {
        getMasterById(id)
    }, [])
    
    async function Submit(e){        
        e.preventDefault();
        navigate("/master/get")
    }

    return (
        <>
        <LoginMaster/>
        <center>
            {displayImage()}
            <br/>
            <br/>
            <Form>
                <Table borderless size="sm">
                    <tbody>
                        <tr>
                            <td><center><input type="text" id="_id" disabled="disabled" value={id}/>&nbsp;&nbsp;&nbsp;
                            <input type ="password" id="motDePasse" disabled="disabled" value={motDePasse}/>&nbsp;&nbsp;&nbsp;
                            <input type ="text" id="codeSecret" disabled="disabled" value={codeSecret}/></center></td>
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
                                <NavLink to={`/master/update/${id}`} style={isActive => ({textDecoration: "none", color: "white"})}>
                                <Button variant = "outline-success">Modifier</Button>
                                </NavLink>&nbsp;
                                <Button variant="outline-danger" onClick={()=>deleteMaster(id)}>Supprimer</Button>
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

export default ResultatRechercheMaster;