import { PublicClientApplication } from "@azure/msal-browser";
import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "9375b73a-f813-468c-aede-0a4db697398c", // ID de aplicación
    authority: "https://login.microsoftonline.com/d3c79dc5-a103-4126-979c-95bfa3b8441b",
    redirectUri: "http://localhost:5173", // Debe coincidir con el registrado en Azure
  },
  cache: {
    cacheLocation: "sessionStorage", // o "localStorage"
    storeAuthStateInCookie: false,
  },
      system : { 
        loggerOptions : { 
            loggerCallback : ( level, message, containsPii ) => { 
                if (containsPii) { 
                    return ; 
                } 
                switch (level) { case LogLevel.Error 
                    :  console.error ( message ) ; return ; case LogLevel . Información : console.info (mensaje); return ; case LogLevel.Verbose : console.debug ( mensaje); return ; case LogLevel.Warn : console.warn ( mensaje ); return; default: return; } }, }, allowNativeBroker: false , } , };

export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "email",
    "api://9375b73a-f813-468c-aede-0a4db697398c/.default"
  ]
};
//export const instance = new PublicClientApplication(msalConfig);