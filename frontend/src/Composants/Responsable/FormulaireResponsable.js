import ServiceResponsable from "../../Services/ResponsableServices";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import HeaderMaster from "../Master/HeaderMaster";
//Componments of react bootstrap
import Form from "../../../node_modules/react-bootstrap/Form"
import Button from "../../../node_modules/react-bootstrap/Button"
import Table from "../../../node_modules/react-bootstrap/Table"
//Componments of react bootstrap

function FormulaireResponsable(){

    const [touched, setTouched] = useState(false)

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("")
    const [motDePasse, setMotDePasse] = useState("")
    const [image, setImage] = useState("")

    const navigate = useNavigate()

    function displayImage(){
        try{
            return <img className="profilePic" src={require("./Images/Responsables/"+image)} alt="pic"/>
        }catch(error){
            if(touched == false && image == "")
                setImage("unknown.jpg")
            return <img className="profilePic" src={require("./Images/Responsables/unknown.jpg")} alt="pic"/>
        }
    }

    function Retour(e){
        e.preventDefault()
        navigate("/master/responsable/get")
    }
    
    async function Submit(e){   
        e.preventDefault();
        const r = {"nom": nom, "prenom": prenom, "email": email, "phone": phone, "motDePasse": motDePasse, "image": image}
        await ServiceResponsable.addResponsable(r)
        navigate("/master/responsable/get")
    }

    return (
        <>
        <HeaderMaster/>
        <center>
            {displayImage()}
            <br/>
            <br/>
            <Form>
                <Table borderless size="sm">
                    <tbody>
                        <tr>
                            <td><center><input type ="text" id="nom" onChange={(e)=>setNom(e.target.value)} placeholder="Nom" value={nom} required/>&nbsp;&nbsp;&nbsp;
                            <input type ="text" id="prenom" onChange={(e)=>setPrenom(e.target.value)} placeholder="Prénom" value={prenom} required/></center></td>
                        </tr>
                        <br/>
                        <tr>
                            <td><center><input type ="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" value={email} required/></center></td>
                        </tr>
                        <br/>
                        <tr>
                            <td><center><input type ="password" id="motDePasse" onChange={(e)=>setMotDePasse(e.target.value)} placeholder="Mot de passe" value={motDePasse}/>&nbsp;&nbsp;&nbsp;
                            <input type ="text" id="phone" onChange={(e)=>setPhone(e.target.value)} placeholder="Téléphone" value={phone} required/></center></td>
                        </tr>
                        <br/>
                        <tr><td><center><input type ="text" id="image" onChange={(e)=>setImage(e.target.value)} onBlur={()=>setTouched(false)} onFocus={()=>setTouched(true)} placeholder="Image" value={image}/></center></td></tr>
                        <br/>
                        <tr>
                            <td><center><Button variant="primary" onClick={(e)=>Submit(e)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ajouter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button></center></td>
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

export default FormulaireResponsable;