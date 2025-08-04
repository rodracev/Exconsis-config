// AuthRedirect.jsx
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { loginRequest } from "./auth/authConfig";

const AuthRedirect = () => {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length === 0) {
      // No hay usuario autenticado, redirige al login
      instance.loginRedirect(loginRequest);
    }
  }, [accounts, instance]);

  return null; // Este componente no renderiza nada
};

export default AuthRedirect;