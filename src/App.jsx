import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import EmployeeDetail from "./pages/EmployeeDetail";
import UserProfile from "./pages/UserProfile";
import Cencos from "./pages/Configuraciones/Cencos";
import Catalogo from "./pages/Configuraciones/Catalogo";

import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "./auth/authConfig";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <MsalAuthenticationTemplate interactionType={InteractionType.Redirect} authenticationRequest={loginRequest}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="employee/:id" element={<EmployeeDetail />} />
            <Route path="perfil" element={<UserProfile />} />
            <Route path="Cencos" element={<Cencos />} />
            <Route path="Catalogo" element={<Catalogo />} />
          </Route>
        </Routes>
      </MsalAuthenticationTemplate>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;