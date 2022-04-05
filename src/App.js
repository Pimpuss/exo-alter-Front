import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import ListeContextProvider from "./context/ListeContext";
import Supression from "./components/Supression";

function App() {
  let location = useLocation();
  let backgroundLocation = location.state && location.state.backgroundLocation;

  const [deleteData, setDeleteData] = useState("");
  return (
    <div className="App">
      <ListeContextProvider>
        <Header />
        <Routes location={backgroundLocation || location}>
          <Route path="/" element={<Home setDeleteData={setDeleteData} />} />
        </Routes>
        <Footer />
        {backgroundLocation && (
          <Routes>
            <Route
              path="/delet"
              element={
                <Supression deleteData={deleteData} action={"supprimer"} />
              }
            />
            <Route
              path="/edit"
              element={<Supression deleteData={deleteData} action={"editer"} />}
            />
          </Routes>
        )}
      </ListeContextProvider>
    </div>
  );
}

export default App;
