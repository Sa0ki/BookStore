import ServiceResponsable from "../../Services/ResponsableServices";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
//Componments of react bootstrap
import Form from "../../../node_modules/react-bootstrap/Form"
import Button from "../../../node_modules/react-bootstrap/Button"
import Table from "../../../node_modules/react-bootstrap/Table"
//Componments of react bootstrap


//Css file for responsable
import "./Css/Responsable.css"

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
        setNom(result.data.nom)
        setPrenom(result.data.prenom)
        setEmail(result.data.email)
        setPhone(result.data.phone)
        setMotDePasse(result.data.motDePasse)
        setImage(result.data.image)
    }

    function displayImage(){
        try{
            return <img className="profilePic" src={require("./Images/Responsables/"+image)} alt="pic"/>
        }catch(error){
            return <img className="profilePic" src={require("./Images/Responsables/unknown.jpg")} alt="pic"/>
        }
    }

    useEffect(() => {
        getResponsableById()
    }, [])
    
    async function Submit(e){        
        e.preventDefault();
        navigate("/master/responsable")
    }

    return (
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
                        <tr>
                            <td><center><Button variant="dark" onClick={(e)=>Submit(e)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Retour&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button></center></td>
                        </tr>
                    </tbody>
                </Table>   
            </Form>
        </center>
    );
}

export default ResultatRechercheResponsable;