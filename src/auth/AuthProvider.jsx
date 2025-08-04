import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./msalConfig";

export const AuthProvider = ({ children }) => {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};