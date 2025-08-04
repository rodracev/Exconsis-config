import { useAuth } from "../auth/useAuth";

export const Login = () => {
  const { login } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={login}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Iniciar sesión con Microsoft
      </button>
    </div>
  );
};