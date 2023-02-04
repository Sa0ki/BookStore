import ServiceResponsable from "../../Services/ResponsableServices";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
//Componments of react bootstrap
import Form from "../../../node_modules/react-bootstrap/Form"
import Button from "../../../node_modules/react-bootstrap/Button"
import Table from "../../../node_modules/react-bootstrap/Table"
//Componments of react bootstrap

function FormulaireResponsable(){

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("")

    const navigate = useNavigate()
    
    async function Submit(e){   
        e.preventDefault();
        const r = {"nom": nom, "prenom": prenom, "email": email, "motDePasse": motDePasse}
        await ServiceResponsable.addResponsable(r)
        navigate("/master/responsable")
    }

    return (
        <center>
            <h1>Formulaire</h1>
            <Form>
                <Table>
                    <tbody>
                    <tr><td><center><input type ="text" id="nom" onChange={(e)=>setNom(e.target.value)} placeholder="Nom"/></center></td></tr>
                    <tr><td><center><input type ="text" id="prenom" onChange={(e)=>setPrenom(e.target.value)} placeholder="Prénom"/></center></td></tr>
                    <tr><td><center><input type ="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/></center></td></tr>
                    <tr><td><center><input type ="password" id="motDePasse" onChange={(e)=>setMotDePasse(e.target.value)} placeholder="Mot de passe"/></center></td></tr>
                    <tr><center><Button onClick={(e)=>Submit(e)}>Ajouter</Button></center></tr>
                    </tbody>
                </Table>   
            </Form>
        </center>
    );
}

export default FormulaireResponsable;