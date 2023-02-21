import Http from "../Composants/Commun/HttpCommun"

async function getMasters(){
    return await Http.get("/masters/get");
}

async function getMasterById(id){
    return await Http.get(`/masters/get/${id}`)
}

async function deleteMaster(id){
    return await Http.delete(`/masters/delete/${id}`)
}

async function addMaster(M){
    return await Http.post("/masters/add", M)
}

async function updateMaster(master){
    return await Http.patch(`/masters/update/${master._id}`, master)
}

async function connexion(codeSecret, motDePasse){
    return await Http.post("/masters/connexion",{codeSecret: codeSecret, motDePasse: motDePasse})
}

async function deconnexion(){
    return await Http.get("/masters/deconnexion")
}

const ServiceMaster = {
    getMasters, 
    getMasterById, 
    deleteMaster, 
    addMaster, 
    updateMaster, 
    connexion,
    deconnexion
}
export default ServiceMaster