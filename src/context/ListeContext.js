import axios from "axios";
import { useEffect, useState, createContext } from "react";

export const ListeContext = createContext();

const ListeContextProvider = (props) => {
  const [liste, setListe] = useState([]);
  const [reloadListe, setReloadListe] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4242/liste").then((res) => setListe(res.data));
  }, [reloadListe]);
  return (
    <ListeContext.Provider value={{ liste, reloadListe, setReloadListe }}>
      {props.children}
    </ListeContext.Provider>
  );
};

export default ListeContextProvider;
