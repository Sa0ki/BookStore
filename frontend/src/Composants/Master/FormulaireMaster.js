import ServiceMaster from "../../Services/MasterServices";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import LoginMaster from "./LoginMaster";
//Componments of react bootstrap
import Form from "react-bootstrap/esm/Form"
import Button from "react-bootstrap/esm/Button"
import Table from "react-bootstrap/esm/Table"
//Componments of react bootstrap

function FormulaireMaster(){

    const [touched, setTouched] = useState(false)

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [codeSecret, setCodeSecret] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("")
    const [motDePasse, setMotDePasse] = useState("")
    const [image, setImage] = useState("")

    const navigate = useNavigate()

    function displayImage(){
        try{
            return <img className="profilePic" src={require("./Images/Masters/"+image)} alt="pic"/>
        }catch(error){
            if(touched == false && image == "")
                setImage("unknown.jpg")
            return <img className="profilePic" src={require("./Images/Masters/unknown.jpg")} alt="pic"/>
        }
    }

    function Retour(e){
        e.preventDefault()
        navigate("/master/get")
    }
    
    async function Submit(e){   
        e.preventDefault();
        const r = {"nom": nom, "prenom": prenom, "codeSecret": codeSecret, "email": email, "phone": phone, "motDePasse": motDePasse, "image": image}
        await ServiceMaster.addMaster(r)
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
                            <td><center><input type ="text" id="nom" onChange={(e)=>setNom(e.target.value)} placeholder="Nom" value={nom} required/>&nbsp;&nbsp;&nbsp;
                            <input type ="text" id="prenom" onChange={(e)=>setPrenom(e.target.value)} placeholder="Pr??nom" value={prenom} required/></center></td>
                        </tr>
                        <br/>
                        <tr>
                            <td><center><input type ="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" value={email} required/>&nbsp;&nbsp;&nbsp;
                            <input type ="text" id="codeSecret" onChange={(e)=>setCodeSecret(e.target.value)} placeholder="Code secret" value={codeSecret}/></center></td>

                        </tr>
                        <br/>
                        <tr>
                            <td><center><input type ="password" id="motDePasse" onChange={(e)=>setMotDePasse(e.target.value)} placeholder="Mot de passe" value={motDePasse}/>&nbsp;&nbsp;&nbsp;
                            <input type ="text" id="phone" onChange={(e)=>setPhone(e.target.value)} placeholder="T??l??phone" value={phone} required/></center></td>
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

export default FormulaireMaster;