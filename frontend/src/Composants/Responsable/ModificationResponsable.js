import ServiceResponsable from "../../Services/ResponsableServices";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
//Componments of react bootstrap
import Form from "../../../node_modules/react-bootstrap/Form"
import Button from "../../../node_modules/react-bootstrap/Button"
import Table from "../../../node_modules/react-bootstrap/Table"
//Componments of react bootstrap

function ModificationResponsable(){

    const {id} = useParams()

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("")
    const [image, setImage] = useState("")

    const navigate = useNavigate()

    async function getResponsableById(){
        const result = await ServiceResponsable.getResponsableById(id)
        console.log(result)
        setNom(result.data.nom)
        setPrenom(result.data.prenom)
        setEmail(result.data.email)
        setMotDePasse(result.data.motDePasse)
        setImage(result.data.image)
    }

    useEffect(() => {
        getResponsableById()
    }, [])
    
    async function Submit(e){   
        e.preventDefault();
        const r = {"_id": id, "nom": nom, "prenom": prenom, "email": email, "motDePasse": motDePasse, "image": image}
        await ServiceResponsable.updateResponsable(r)
        navigate("/master/responsable")
    }

    return (
        <center>
            <h1>Formulaire</h1>
            <Form>
                <Table>
                    <tbody>
                    <tr><td><center><input type ="text" id="nom" onChange={(e)=>setNom(e.target.value)} placeholder="Nom" value={nom}/></center></td></tr>
                    <tr><td><center><input type ="text" id="prenom" onChange={(e)=>setPrenom(e.target.value)} placeholder="Prénom" value={prenom}/></center></td></tr>
                    <tr><td><center><input type ="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" value={email}/></center></td></tr>
                    <tr><td><center><input type ="password" id="motDePasse" onChange={(e)=>setMotDePasse(e.target.value)} placeholder="Mot de passe" value={motDePasse}/></center></td></tr>
                    <tr><td><center><input type ="text" id="image" onChange={(e)=>setImage(e.target.value)} placeholder="Image" value={image}/></center></td></tr>
                    <tr><center><Button onClick={(e)=>Submit(e)}>Modifier</Button></center></tr>
                    </tbody>
                </Table>   
            </Form>
        </center>
    );
}

export default ModificationResponsable;