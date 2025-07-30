import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaHome,
  FaChevronDown,
  FaCog,
  FaSignOutAlt,
  FaHockeyPuck,
  FaCriticalRole ,
  FaRegUser,
  FaStackExchange,
} from "react-icons/fa";

const Sidebar = () => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <div className="h-screen w-64 bg-[#596066] text-white flex flex-col shadow-lg rounded-sm">
      {/* Logo / encabezado */}
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        <div className="p-6 text-2xl font-bold  flex justify-center">
          <img
            src="/src/App_img/logo.png" // ajusta la ruta si está en otra carpeta
            alt="Logo Excon"
            className="h-12 object-contain"
          />
        </div>
      </div>

      {/* Navegación principal */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {/* Inicio */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaHome />
              Inicio
            </NavLink>
          </li>

          {/* Perfil */}
          <li>
            <NavLink
              to="/perfil"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaUser />
              Perfil
            </NavLink>
          </li>

          {/* Configuración directa */}
         

          {/* Configuraciones con submenú */}
          <li>
            <button
              onClick={() => setIsConfigOpen(!isConfigOpen)}
              className="flex w-full items-center justify-between p-2 rounded hover:bg-gray-700"
            >
              <span className="flex items-center gap-2">
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    isConfigOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
                <FaCog />
                Configuraciones
              </span>
            </button>

            {/* Submenú */}
            {isConfigOpen && (
              <ul className="ml-6 mt-1 space-y-1 text-sm">
                <li>
                  <NavLink
                    to="/Cencos"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                        isActive ? "bg-gray-700" : ""
                      }`
                    }
                  >
                    <FaHockeyPuck />
                    Centros de costos
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/roles"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                        isActive ? "bg-gray-700" : ""
                      }`
                    }
                  >
                    <FaCriticalRole />
                    Roles
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/roles"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                        isActive ? "bg-gray-700" : ""
                      }`
                    }
                  >
                    <FaRegUser />
                    Usuarios
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Catalogo"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                        isActive ? "bg-gray-700" : ""
                      }`
                    }
                  >
                    <FaStackExchange />
                    Catalogos
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Botón cerrar sesión */}
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center gap-2 p-2 w-full hover:bg-gray-700 rounded">
          <FaSignOutAlt />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;