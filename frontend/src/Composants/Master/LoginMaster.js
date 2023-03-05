import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react";
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/esm/Form"
import Table from "react-bootstrap/esm/Table"
import ServiceMaster from "../../Services/MasterServices";


function LoginMaster(){

    const navigate = useNavigate()

    const [codeSecret, setCodeSecret] = useState("");
    const [motDePasse, setMotDePasse] = useState("")

    const [currentUser, setCurrentUser] = useState("")
    const [login, setLogin] = useState(false)

    function displayImage(){
        return <img className="profilePic" src={require("../Master/Images/Masters/unknown.jpg")} alt="pic"/>
    }

    function Retour(e){
        e.preventDefault()
        navigate("/acceuil")
    }
    
    async function Submit(e){   
        e.preventDefault();
        setLogin(true)
        await ServiceMaster.connexion(codeSecret, motDePasse)
        setCurrentUser(codeSecret)
        navigate("/master/get")
    }

    async function checkCurrentUser(){
        const result = await ServiceMaster.getMasters()
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
        await ServiceMaster.deconnexion()
        navigate("/acceuil")
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
                            <td><center><input type ="text" id="codeSecret" onChange={(e)=>setCodeSecret(e.target.value)} placeholder="Code secret" value={codeSecret} required/></center></td>
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

export default LoginMaster