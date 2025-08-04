import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";

export default function Home  ()  {
  const { getUser, logout, getToken } = useAuth();
  const [token, setToken] = useState("");

  useEffect(() => {
    getToken().then((t) => setToken(t));
  }, []);

  const user = getUser();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Bienvenido, {user?.name}</h1>
      <p>Email: {user?.username}</p>
      <p className="break-all">Token: {token}</p>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    </div>
  );
};