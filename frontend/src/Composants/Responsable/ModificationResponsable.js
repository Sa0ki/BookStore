import ServiceResponsable from "../../Services/ResponsableServices";
import LoginResponsable from "./LoginResponsable";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

//Componments of react bootstrap
import Form from "../../../node_modules/react-bootstrap/Form"
import Button from "../../../node_modules/react-bootstrap/Button"
import Table from "../../../node_modules/react-bootstrap/Table"
//Componments of react bootstrap


//Css file for responsable
import "../Commun/Css/commun.css"

function ModificationResponsable(){

    const {id} = useParams()
    const [touched, setTouched] = useState(false)

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
            if(touched == false && image == "")
                setImage("unknown.jpg")
            return <img className="profilePic" src={require("./Images/Responsables/unknown.jpg")} alt="pic"/>
        }
    }

    useEffect(() => {
        getResponsableById()
    }, [])
    
    async function Submit(e){        
        e.preventDefault();
        const r = {"_id": id, "nom": nom, "prenom": prenom, "email": email, "phone": phone, "motDePasse": motDePasse, "image": image}
        await ServiceResponsable.updateResponsable(r)
        navigate(`/master/responsable/get/${r._id}`)
    }

    function Retour(e){
        e.preventDefault();
        navigate(`/master/responsable/get/${id}`)
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
                            <input type ="password" id="motDePasse" disabled="disabled" onChange={(e)=>setMotDePasse(e.target.value)} placeholder="Mot de passe" value={motDePasse}/></center></td>
                        </tr>
                        <br/>
                        <tr>
                            <td><center><input type ="text" id="nom" onChange={(e)=>setNom(e.target.value)} placeholder="Nom" value={nom} required/>&nbsp;&nbsp;&nbsp;
                            <input type ="text" id="prenom" onChange={(e)=>setPrenom(e.target.value)} placeholder="Pr??nom" value={prenom} required/></center></td>
                        </tr>
                        <br/>
                        <tr>
                            <td><center><input type ="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" value={email} required/>&nbsp;&nbsp;&nbsp;
                            <input type ="text" id="phone" onChange={(e)=>setPhone(e.target.value)} placeholder="T??l??phone" value={phone} required/></center></td>
                        </tr>
                        <br/>
                        <tr><td><center><input type ="text" id="image" onChange={(e)=>setImage(e.target.value)} onBlur={()=>setTouched(false)} onFocus={()=>setTouched(true)} placeholder="Image" value={image}/></center></td></tr>
                        <br/>
                        <tr>
                            <td><center><Button variant="success" onClick={(e)=>Submit(e)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Modifier&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button></center></td>
                        </tr>
                        <tr>
                            <td><center><Button variant="dark" onClick={(e)=>Retour(e)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Retour&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button></center></td>
                        </tr>
                    </tbody>
                </Table>   
            </Form>
        </center>
        </>
    );
}

export default ModificationResponsable;