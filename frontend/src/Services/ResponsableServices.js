import Http from "../Composants/Commun/HttpCommun"

async function getResponsables(){
    return await Http.get("/responsables/get");
}

async function getResponsableById(id){
    return await Http.get(`/responsables/get/${id}`)
}

async function deleteResponsable(id){
    return await Http.delete(`/responsables/delete/${id}`)
}

async function addResponsable(R){
    return await Http.post("/responsables/add", R)
}

async function updateResponsable(responsable){
    return await Http.patch(`/responsables/update/${responsable._id}`, responsable)
}

async function connexion(email, motDePasse){
    return await Http.post("/responsables/connexion",{email: email, motDePasse: motDePasse})
}

async function deconnexion(){
    return await Http.get("/responsables/deconnexion")
}

const ServiceResponsable = {
    getResponsables, 
    getResponsableById, 
    deleteResponsable, 
    addResponsable, 
    updateResponsable, 
    connexion,
    deconnexion
}
export default ServiceResponsable