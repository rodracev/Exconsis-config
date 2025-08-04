import React, { useEffect, useState } from 'react';
import SelectFromApi from '@/components/SelectFromApi';
import { formatearFecha, formatearMoneda } from "@/utils/formatters";
import {
  FaPlus,
} from "react-icons/fa";
import ModalMaestroCatalogo from '@/components/ModalMaestroCatalogo';
import { useMsal } from "@azure/msal-react";
import apiClient from '@/utils/apiClient';
import { toast } from 'react-toastify';
import Modalcatalogo from '../../components/Modalcatalogo';


const Catalogo = () => {
const [formData, setFormData] = useState(null);
const [centros, setCentros] = useState([]);
const [loading, setLoading] = useState(false);
const [selectedCentro, setSelectedCentro] = useState(null);
const [modalOpen, setModalOpen] = useState(false);
const [modalcatalogoOpen, setModalCatalogoOpen] = useState(false);
const [modo, setModo] = useState('crear'); // 'crear' o 'editar'
const [Idmaesrtro, setIdmaestro] = useState(''); // 'crear' o 'editar'
const [error, setError] = useState(null);

const { instance, accounts } = useMsal();
const usuario = accounts[0]?.name || "No identificado";
  
const [filtro, setFiltro] = useState('');
const [datos, setDatos] = useState([]);
const obtenerDatos = async (filtroSeleccionado) => {
    setLoading(true);
    try {
      const result = await apiClient.get(`/catalogo/MaestroCatalogo/${filtroSeleccionado}`);
      console.log(result);
      console.log(filtroSeleccionado);
      setDatos(result);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setError(error.message); // Mostrar mensaje al usuario
    } finally {
      setLoading(false); // Desactiva spinner o similar
    }
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltro(value);
    obtenerDatos(value);
  };

  const handleSaveda= async (formData) => {
     try {
      if (modo === 'crear') {
        console.log(formData);
        const result = await apiClient.post('catalogo', formData);
      } else {
        const result = await apiClient.put('catalogo', formData);
      }
      setModalCatalogoOpen(false);
      obtenerDatos(filtro);
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };
  const handleUpdateCatalogo = (item) => {
    setFormData(item);
    setModo('editar');
    setIdmaestro(filtro);
    setModalCatalogoOpen(true);
  };


if (loading) return <p>Cargando...</p>;
if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Catalogos</h2>
       <div className="grid grid-cols-1">
        <div className="bg-gray-100 p-4 w-full md:w-1/3">
          <div className="flex items-center gap-2">
            <SelectFromApi
              label="Maestro Catálogo"
              name="idCatalogo"
              value={filtro | ''}
              onChange={handleChange}
              endpoint="MaestroCatalogo"
              optionValue="idCatalogo"
              optionLabel="nombre"
            />
            <button
              onClick={() => {
                setFormData({});
                setModo('crear');
                setModalOpen(true);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

        <button
          onClick={() => {
            setFormData({});  // Limpia la data
            setModo('crear');
            if (!filtro || filtro === 'Seleccione') {
              toast.error("Debe seleccionar un valor antes de continuar");
              return;
            }
            setModalCatalogoOpen(true);
          }}
           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <FaPlus  /> 
               Crear item catalogo
        </button>
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
            <th className="border px-4 py-2">Custom01</th>
            <th className="border px-4 py-2">Custom02</th>
            <th className="border px-4 py-2">Custom03</th>
            <th className="border px-4 py-2">Custom04</th>
            <th className="border px-4 py-2">Custom05</th>
            <th className="border px-4 py-2">Custom06</th>
            <th className="border px-4 py-2">Custom07</th>
            <th className="border px-4 py-2">Custom08</th>
            <th className="border px-4 py-2">Custom09</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr  key={item.idCatalogo}>
              <td className="border px-4 py-2">{item.idCatalogo}</td>
              <td className="border px-4 py-2">{item.nombre}</td>
              <td className="border px-4 py-2">{item.descripcion}</td>
              <td className="border px-4 py-2">{item.estado}</td>
              <td className="border px-4 py-2">{item.custom01}</td>
              <td className="border px-4 py-2">{item.custom02}</td>
              <td className="border px-4 py-2">{item.custom03}</td>
              <td className="border px-4 py-2">{item.custom04}</td>
              <td className="border px-4 py-2">{item.custom05}</td>
              <td className="border px-4 py-2">{item.custom06}</td>
              <td className="border px-4 py-2">{formatearFecha(item.custom07)}</td>
              <td className="border px-4 py-2">{formatearFecha(item.custom08)}</td>
              <td className="border px-4 py-2">{formatearFecha(item.custom09)}</td>
               <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleUpdateCatalogo(item)
                        }
                  >
                    Editar
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}

     {modalOpen && (
       <ModalMaestroCatalogo
          isOpen={modalOpen}
          onSave={handleSaveda}
          onClose={() => setModalOpen(false)}
          initialData={formData}
          modo={modo}
        />
      )}
       {modalcatalogoOpen && (
       <Modalcatalogo
          isOpen={modalcatalogoOpen}
          onSave={handleSaveda}
          onClose={() => setModalCatalogoOpen(false)}
          initialData={formData}
          Idmaestro={filtro}
          modo={modo}
        />
      )}
    </div>
  );
}

export default  Catalogo;