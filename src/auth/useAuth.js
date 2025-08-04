import { useMsal } from "@azure/msal-react";

export const useAuth = () => {
  const { instance, accounts } = useMsal();

  const login = async () => {
    await instance.loginPopup({
      scopes: ["User.Read"],
    });
  };

  const logout = () => {
    instance.logoutRedirect();
  };

  const getUser = () => {
    return accounts.length > 0 ? accounts[0] : null;
  };

  const getToken = async () => {
    const account = accounts[0];
    if (!account) return null;

    const response = await instance.acquireTokenSilent({
      scopes: ["User.Read"],
      account: account,
    });

    return response.accessToken;
  };

  return { login, logout, getUser, getToken };
};