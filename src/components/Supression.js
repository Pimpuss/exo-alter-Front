import { Dialog } from "@reach/dialog";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@reach/dialog/styles.css";
import "./styles/Supression.css";
import { ListeContext } from "../context/ListeContext";
import axios from "axios";

function Supression({ deleteData, action }) {
  let navigate = useNavigate();
  const { reloadListe, setReloadListe } = useContext(ListeContext);
  const [newName, setNewName] = useState(deleteData.nom);
  const [newAdj, setNewAdj] = useState(deleteData.adjectif);

  //* FONCTION DELET //*
  const handleDeletData = () => {
    axios
      .delete(`http://localhost:4242/liste/${deleteData.id}`)
      .then((response) => console.log("RESPONSE REQUETE", response))
      .then(setReloadListe(!reloadListe));
    navigate(-1);
  };

  //* FONCTION EDIT //*
  const handleEdit = () => {
    axios
      .put(`http://localhost:4242/liste/${deleteData.id}`, {
        nom: newName,
        adjectif: newAdj,
      })
      .then((response) => console.log("RESPONSE REQUETE", response))
      .then(setReloadListe(!reloadListe));
    navigate(-1);
  };

  return (
    <Dialog>
      <div className="fragmentContainer">
        <div className="backContainerAdmin" onClick={() => navigate(-1)}></div>
        <div className="popUpModalDelet">
          <div className="modalContainer">
            <h2>
              Êtes-vous sûr de vouloir{" "}
              {action === "supprimer" ? "supprimer" : "editer"} {deleteData.nom}
            </h2>

            <div className="buttonModalDelet">
              {action === "supprimer" && (
                <div className="deletContainer">
                  <button className="buttonGris" onClick={() => navigate(-1)}>
                    Retour
                  </button>
                  <button
                    className="buttonGris"
                    onClick={() => handleDeletData()}
                  >
                    Supprimer
                  </button>
                </div>
              )}
              {action === "editer" && (
                <div className="editContainer">
                  <div className="editInput">
                    <input
                      className="inputName"
                      type="text"
                      name="Nom"
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder={deleteData.nom}
                    />
                    <input
                      className="inputName"
                      type="text"
                      name="Adjectif"
                      onChange={(e) => setNewAdj(e.target.value)}
                      placeholder={deleteData.adjectif}
                    />
                  </div>
                  <div className="editBtn">
                    <button className="buttonGris" onClick={() => navigate(-1)}>
                      Retour
                    </button>
                    <button className="buttonGris" onClick={() => handleEdit()}>
                      Valider
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default Supression;
