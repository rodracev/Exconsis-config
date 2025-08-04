import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalCenco from '@/components/ModalCenco';
import apiClient from '@/utils/apiClient';

export default function Cencos() {
  const [formData, setFormData] = useState(null);
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCentro, setSelectedCentro] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modo, setModo] = useState('crear'); // 'crear' o 'editar'


  useEffect(() => {
    fetchCentros();
  }, []);

  const fetchCentros = async () => {
    try {
      const result = await apiClient.get('cencos');
      setCentros(result);
    } catch (error) {
      console.error('Error al obtener centros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (centro) => {
    setFormData(centro);
    setModo('editar');
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCentro(null);
    setShowModal(false);
    fetchCentros(); // Refresca lista después de actualizar
  };
   const handleSave = async (updatedCenco) => {
     try {
      if (modo === 'crear') {
        const result = await apiClient.post('cencos',updatedCenco);
      } else {
        const result = await apiClient.put('cencos/' + updatedCenco.idCencos,updatedCenco);
      }
      setModalOpen(false);
      fetchCentros(); // recarga datos
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Centros de Costo</h2>
        <button
          onClick={() => {
            setFormData({});  // Limpia la data
            setModo('crear');
            setModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Crear nuevo centro de costo
        </button>
      {loading ? (
        <p>Cargando centros...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 md:table-fixed table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Id Cencos</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Descripcion</th>
              <th className="border px-4 py-2">Tipo</th>
              <th className="border px-4 py-2">Cencos Dynamics</th>
              <th className="border px-4 py-2">Proyecto</th>
              <th className="border px-4 py-2">Actividad</th>
              <th className="border px-4 py-2">Estado</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {centros.map((centro) => (
              <tr key={centro.idCencos}>
                <td className="border px-4 py-2">{centro.idCencos}</td>
                <td className="border px-4 py-2">{centro.nombre}</td>
                <td className="border px-4 py-2">{centro.descripcion}</td>
                <td className="border px-4 py-2">{centro.tipo}</td>
                <td className="border px-4 py-2">{centro.idDynamics}</td>
                <td className="border px-4 py-2">{centro.proyecto}</td>
                <td className="border px-4 py-2">{centro.actividad}</td>
                <td className="border px-4 py-2">{centro.estado}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleUpdate(centro)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => console.log('Eliminar centro:', centro.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
       <ModalCenco
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={formData}
          modo={modo}
        />
      )}
    </div>
  );
}
