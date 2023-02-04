import {Route, Routes} from "react-router-dom"
import TousLesResponsables from "../Composants/Responsable/TousLesResponsables"
import FormulaireResponsable from "../Composants/Responsable/FormulaireResponsable"
import TousLesLivres from "../Composants/Livre/TousLesLivres"
import FormulaireLivre from "../Composants/Livre/FormulaireLivre"
import ToutesLesCategories from "../Composants/Categorie/ToutesLesCategories"
import FormulaireCategorie from "../Composants/Categorie/FormulaireCategorie"
import Acceuil from "../Composants/Visiteur/Acceuil";

function Paths(){
    return (
        <Routes>
            <Route path={"master"}>
                <Route path={"responsable"} element={<TousLesResponsables/>}></Route>
                <Route path={"responsable/ajouter"} element={<FormulaireResponsable/>}></Route>
            </Route>

            <Route path={"responsable"}>
                <Route path={"livre"} element={<TousLesLivres/>}></Route>
                <Route path={"livre/ajouter"} element={<FormulaireLivre/>}></Route>
                <Route path={"categorie"} element={<ToutesLesCategories/>}></Route>
                <Route path={"categorie/ajouter"} element={<FormulaireCategorie/>}></Route>
            </Route>

           <Route path={""} element={<Acceuil/>}></Route> 
        </Routes>
    )
}

export default Paths