//*IMPORT CSS//*
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style/Home.css";

//*IMPORT REACT & CONTEXT//*
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useState } from "react";
import { ListeContext } from "../context/ListeContext.js";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Home({ setDeleteData }) {
  const { liste, reloadListe, setReloadListe } = useContext(ListeContext);
  const [newUser, setNewUser] = useState("");
  const [newAdj, setNewAdj] = useState("");
  const [pageSize, setPageSize] = useState(5);
  let location = useLocation();

  const newMembre = () => {
    axios
      .post("http://localhost:4242/liste", {
        ...newAdj,
        ...newUser,
      })
      .then((response) => console.log("RESPONSE REQUE", response))
      .then(setReloadListe(!reloadListe))
      .catch((error) =>
        console.error("---Erreur envoi membre--- ", error.validationErrors)
      );
  };

  const handleChangeNewUser = (e) => {
    setNewUser({ nom: e.target.value });
  };

  const handleChangeNewAdj = (e) => {
    setNewAdj({ adjectif: e.target.value });
  };

  return (
    <>
      <div className="homeContainer">
        <h2>Ajouter un(e) Argonaute</h2>
        <div className="addContainers">
          <p>Nom de l'Argonaute :</p>
          <input
            className="inputName"
            type="text"
            name="Nom"
            placeholder="Nom"
            onChange={handleChangeNewUser}
          ></input>
          <input
            className="inputName"
            type="text"
            name="Adjectif"
            placeholder="Adjectif"
            onChange={handleChangeNewAdj}
          ></input>
          <input
            className="submitName"
            type="submit"
            name="Ajouter"
            value="Ajouter"
            onClick={newMembre}
          ></input>
        </div>
        <h2>Membres de l'équipage</h2>
        <DataGrid
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          autoHeight
          columns={[
            {
              field: "id",
              headerName: "ID",
              headerClassName: "headerTableau",
              maxWidth: 400,

              flex: 0.5,
              align: "left",
              headerAlign: "left",
            },
            {
              field: "nom",
              headerName: "Nom",
              headerClassName: "headerTableau",
              maxWidth: 800,

              flex: 0.5,
              align: "left",
              headerAlign: "left",
            },
            {
              field: "adjectif",
              headerName: "Adjectif",
              headerClassName: "headerTableau",
              maxWidth: 800,

              flex: 0.5,
              align: "left",
              headerAlign: "left",
            },
            {
              field: "action",
              headerName: "Action",
              headerClassName: "headerTableau",
              maxWidth: 800,

              flex: 0.5,
              align: "center",
              headerAlign: "center",
              renderCell: (field) => (
                <div className="actionIcon2">
                  <Link to="./edit" state={{ backgroundLocation: location }}>
                    <FontAwesomeIcon
                      icon={faPencil}
                      size="1x"
                      color="var(--clr-rose)"
                      className="editIcon"
                    />
                  </Link>
                  <Link to="./delet" state={{ backgroundLocation: location }}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="1x"
                      color="var(--clr-rose)"
                      className="deletIcon"
                    />
                  </Link>
                </div>
              ),
            },
          ]}
          sx={{
            //REGLAGE GENERAL DU TABLEAU
            fontFamily: "var(--ff-body)",
            fontSize: "var(--fs-body)",
            color: "var(--clr-gris)",
            backgroundColor: "var(--clr-gris2)",
            borderColor: "none",
            boxShadow: "5px 5px 5px var(--shadowColor)",
            width: "90%",
            padding: "8px",
            "& .MuiDataGrid-cell:hover": {},
          }}
          onRowClick={(datas) => {
            setDeleteData(datas.row);
          }}
          rows={liste}
          pagination
        />
      </div>
    </>
  );
}

export default Home;
