import SelectFromApi from "./SelectFromApi";
import apiClient from "@/utils/apiClient";
import { useMsal } from "@azure/msal-react";
import React, { useState, useEffect } from "react";

export default function ModalMaestroCatalogo({
  isOpen,
  onClose,
  onSave,
  initialData,
  modo,
}) {
  const [formData, setFormData] = useState({
    idCatalogo: null,
    nombre: "",
    descripcion: "",
    estado: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [datos, setDatos] = useState([]);
 const [buttonText, setButtonText] = useState('Guardar');
  useEffect(() => {
    obtenerDatos();

    if (initialData) {
      setDatos(initialData);
    } else if (modo === "crear") {
      setDatos({
        idCatalogo: null,
        nombre: "",
        descripcion: "",
        estado: "",
      });
    }
  }, [initialData, modo]);

  const obtenerDatos = async () => {
    setLoading(true);
    try {
      const result = await apiClient.get("maestrocatalogo");
      console.log(result);
      setDatos(result);
      console.log(formData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setError(error.message); 
    } finally {
      setLoading(false); 
    }
  };
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    console.log("Cambio select:", name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const manejarClickFila = (fila) => {
    setFormData(fila);
     setButtonText('Actualizar');
  };
  const limpiaimput = () => {
    setFormData({
      idCatalogo:'',
      nombre:'',
      descripcion:'',
      estado:''
    });
     setButtonText('Guardar');
  };
  const handleSave = async (e) => {
    e.preventDefault();
     try {
      if (buttonText === 'Guardar') {
        const result = await apiClient.post('maestrocatalogo', formData);
      } else {
       console.log(formData);
        const result = await apiClient.put('maestrocatalogo/'+ formData.idCatalogo, formData);
      }
         // Acciones comunes post-guardar
      limpiaimput();
      obtenerDatos();

    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };
  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded-lg w-full max-w-5xl shadow-xl">
        <div className="relative bg-[#596066] p-4 text-white rounded-md shadow-md">
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-3xl font-bold text-white hover:text-gray-200 focus:outline-none"
            >
              &times;
            </button>

            {/* Título */}
            <h2 className="text-xl font-bold">Maestro de catálogos</h2>
          </div>
        <div className="grid-cols-5"><div className="col-span-1"></div></div>
       
        <form >
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Id Maestro catalogo
              </label>
              <input
                type="text"
                name="idCatalogo"
                value={formData.idCatalogo || ""}
                onChange={handleSelectChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre || ""}
                onChange={handleSelectChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                name="Estado"
                value={formData.estado || ""}
                onChange={handleSelectChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="A ">Activo</option>
                <option value="I ">Inactivo</option>
              </select>
            </div>

            <div className="col-span-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripcion
              </label>
              <input
                type="text"
                name="descripcion"
                value={formData.descripcion || ""}
                onChange={handleSelectChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
          </div>
             <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={limpiaimput}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              //type="submit"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
               {buttonText}
            </button>
          </div>
            <div className="col-span-5">
              {loading ? (
                <p>Cargando catalogo...</p>
              ) : (
                <table className="min-w-full bg-white border border-gray-200 md:table-fixed table-auto">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2">Id Catalogo</th>
                      <th className="border px-4 py-2">Nombre</th>
                      <th className="border px-4 py-2">Descripción</th>
                      <th className="border px-4 py-2">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datos.map((item) => (
                      <tr
                        key={item.idCatalogo}
                        onClick={() => manejarClickFila(item)}
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        <td className="border px-4 py-2">{item.idCatalogo}</td>
                        <td className="border px-4 py-2">{item.nombre}</td>
                        <td className="border px-4 py-2">{item.descripcion}</td>
                        <td className="border px-4 py-2">{item.estado}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
