import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react";
import ServiceResponsable from "../../Services/ResponsableServices";
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/esm/Form"
import Table from "react-bootstrap/esm/Table"


function HeaderMaster(){

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("")

    const [currentUser, setCurrentUser] = useState("")
    const [login, setLogin] = useState(false)

    function displayImage(){
        return <img className="profilePic" src={require("../Responsable/Images/Responsables/unknown.jpg")} alt="pic"/>
    }

    function Retour(e){
        e.preventDefault()
        navigate("/master/acceuil")
    }
    
    async function Submit(e){   
        e.preventDefault();
        setLogin(true)
        await ServiceResponsable.connexion(email, motDePasse)
        setCurrentUser(email)
        navigate("/master/responsable/get")
    }

    async function checkCurrentUser(){
        const result = await ServiceResponsable.getResponsables()
        if(result.data.currentUser != ""){
            setCurrentUser(result.data.currentUser)
            setLogin(true)
        }
        else{
            setCurrentUser("")
            setLogin(false)
        }
    }

    async function Deconnexion(e){
        e.preventDefault()
        setLogin(false)
        setCurrentUser("")
        await ServiceResponsable.deconnexion()
        navigate("/master/login")
    }

    useEffect(()=>{
        if(login)
            checkCurrentUser()
        console.log("useEffect -> login=" + login + ", currentUser=" + currentUser)
    }, [login, currentUser])

    useEffect(() => {
        setLogin(window.localStorage.getItem("login"))
        setCurrentUser(window.localStorage.getItem("currentUser"))
      }, []);
    
      useEffect(() => {
        window.localStorage.setItem("login", login);
        window.localStorage.setItem("currentUser", currentUser);
      }, [login, currentUser]);

    return (
        <div>
            {
                login && currentUser != ""
            ?
            <><Button variant="danger" onClick={(e)=>Deconnexion(e)}>Déconnexion</Button><Button variant="warning">{currentUser}</Button></>
            :
            <center>
            <br/> <br/> <br/> 
            {displayImage()}
            <br/>
            <br/>
            <Form>
                <Table borderless size="sm">
                    <tbody>
                        <tr>
                            <td><center><input type ="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" value={email} required/></center></td>
                        </tr>
                        <br/>
                        <tr>
                            <td><center><input type ="password" id="motDePasse" onChange={(e)=>setMotDePasse(e.target.value)} placeholder="Mot de passe" value={motDePasse}/></center></td>
                        </tr>
                        <br/>
                        <tr>
                            <td><center><Button variant="primary" onClick={(e)=>Submit(e)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Connexion&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button></center></td>
                        </tr>
                        <tr>
                            <td><center><Button variant="dark" onClick={(e)=>Retour(e)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Retour&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button></center></td>
                        </tr>
                    </tbody>
                </Table>   
            </Form>
        </center>
}
        </div>
    )
}

export default HeaderMaster