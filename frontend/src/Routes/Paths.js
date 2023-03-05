import {Route, Routes} from "react-router-dom"
import TousLesResponsables from "../Composants/Responsable/TousLesResponsables"
import FormulaireResponsable from "../Composants/Responsable/FormulaireResponsable"
import ModificationResponsable from "../Composants/Responsable/ModificationResponsable"
import FormulaireLivre from "../Composants/Livre/FormulaireLivre"
import ToutesLesCategories from "../Composants/Categorie/ToutesLesCategories"
import FormulaireCategorie from "../Composants/Categorie/FormulaireCategorie"
import AcceuilVisiteur from "../Composants/Visiteur/AcceuilVisiteur";
import ResultatRechercheResponsable from "../Composants/Responsable/ResultatRechercheResponsable"
import LoginMaster from "../Composants/Master/LoginMaster"
import LoginResponsable from "../Composants/Responsable/LoginResponsable"
import AcceuilMaster from "../Composants/Master/AcceuilMaster"
import TousLesMasters from "../Composants/Master/TousLesMasters"
import ResultatRechercheMaster from "../Composants/Master/ResultatRechercheMaster"
import ModificationMaster from "../Composants/Master/ModificationMaster"
import FormulaireMaster from "../Composants/Master/FormulaireMaster"
import TousLesLivres from "../Composants/Livre/TousLesLivres"

function Paths(){
    return (
        <Routes>
            <Route path={"master"}>

                <Route path={"login"} element={<LoginMaster/>}></Route> 
                <Route path={"acceuil"} element={<AcceuilMaster/>}></Route> 

                <Route path={"get"} element={<TousLesMasters/>}></Route>
                <Route path={"get/:id"} element={<ResultatRechercheMaster/>}></Route>
                <Route path={"add"} element={<FormulaireMaster/>}></Route>
                <Route path={"update/:id"} element={<ModificationMaster/>}></Route>

                <Route path={"responsable/get"} element={<TousLesResponsables/>}></Route>
                <Route path={"responsable/get/:id"} element={<ResultatRechercheResponsable/>}></Route>
                <Route path={"responsable/add"} element={<FormulaireResponsable/>}></Route>
                <Route path={"responsable/update/:id"} element={<ModificationResponsable/>}></Route>
            </Route>

            <Route path={"responsable"}>    

                <Route path={"login"} element={<LoginResponsable/>}></Route> 

                <Route path={"livre/get"} element={<TousLesLivres/>}></Route>
                <Route path={"livre/add"} element={<FormulaireLivre/>}></Route>
                <Route path={"categorie"} element={<ToutesLesCategories/>}></Route>
                <Route path={"categorie/add"} element={<FormulaireCategorie/>}></Route>
            </Route>
           <Route path={"/livres"} element ={<TousLesLivres/>}></Route>
           <Route path={""} element={<AcceuilVisiteur/>}>
           
           </Route> 
        </Routes>
    )
}

export default Paths