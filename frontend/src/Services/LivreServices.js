import http from "../Composants/Commun/HttpCommun";

async function getAllLivres() {
    return await http.get('/livres/get');
}

async function getLivreById(id) {
    return await http.get(`/livres/get/${id}`);
}

async function deleteLivre(id) {
    return await http.delete(`/livres/${id}`);
}

async function editLivre(livre) {
    return await http.patch(`/livres/${livre._id}`, livre);
}

async function addLivre(livre) {
    return await http.post('/livres/add', livre);
}

const livreService = { getAllLivres, getLivreById, deleteLivre, editLivre, addLivre };

export default livreService;
