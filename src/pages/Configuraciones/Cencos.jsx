import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalCenco from '@/components/ModalCenco';

export default function Cencos() {
  const [formData, setFormData] = useState(null);
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCentro, setSelectedCentro] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modo, setModo] = useState('crear'); // 'crear' o 'editar'

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSIsImtpZCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSJ9.eyJhdWQiOiJhcGk6Ly85Mzc1YjczYS1mODEzLTQ2OGMtYWVkZS0wYTRkYjY5NzM5OGMiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kM2M3OWRjNS1hMTAzLTQxMjYtOTc5Yy05NWJmYTNiODQ0MWIvIiwiaWF0IjoxNzUzODEzNjQzLCJuYmYiOjE3NTM4MTM2NDMsImV4cCI6MTc1MzgxODMyOCwiYWNyIjoiMSIsImFpbyI6IkFYUUFpLzhaQUFBQThEZkpnNXcxcUdBZHhjaTNoZnFia1czVkJlaEo0RzZNaXVsY2VaYmd6c0FxOWxGQlBiY29sejB0OHhyUGl2RkkydXNETTRaeWkvcWZOZitWREYvak1FYkdEcVQ1LzI5U29TV2ZjVUNkQjlCcHVWT25XeTd2NVowRmJrd1JjQnlKWndsbW4yVTdxcUYweEQ0KzY4T0JDdz09IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjkzNzViNzNhLWY4MTMtNDY4Yy1hZWRlLTBhNGRiNjk3Mzk4YyIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiQWNldmVkbyBGZXJuYW5kZXoiLCJnaXZlbl9uYW1lIjoiUm9kcmlnbyIsImlwYWRkciI6IjE1Mi4yMzEuOTAuMiIsIm5hbWUiOiJSb2RyaWdvIEFjZXZlZG8gRmVybmFuZGV6Iiwib2lkIjoiMjUxNTk5NmItZWVjMS00YjZmLThjY2YtOGEyZTQ1NjViN2RmIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTMyMDEyNTgwOTgtMzA2MjQxMjIzOS0yNTcwOTIyNTMwLTM3MzYiLCJyaCI6IjEuQVZrQXhaM0gwd09oSmtHWG5KV19vN2hFR3pxM2RaTVQtSXhHcnQ0S1RiYVhPWXhaQUJoWkFBLiIsInNjcCI6ImFwaS5yZWFkIiwic2lkIjoiMDA2ZjFkNjktZTE1OS1jZmFkLWM1MzgtMWI5NjYwZjRkMzI5Iiwic3ViIjoiQW9TbksyR3ZVeHUxN2Y2OGU4SGQyaTFZMFBWSkFiVXlDa2x5TEtEX0NyWSIsInRpZCI6ImQzYzc5ZGM1LWExMDMtNDEyNi05NzljLTk1YmZhM2I4NDQxYiIsInVuaXF1ZV9uYW1lIjoicmFjZXZlZG9AZXhjb24uY2wiLCJ1cG4iOiJyYWNldmVkb0BleGNvbi5jbCIsInV0aSI6IktHaTRkbENodzBXX0xIQmFFNlVUQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfZnRkIjoia2tnVzNrR2oyaHpQbm4tS1g0QVp2ck4zeDF3S3RHcEZacElNLVFhcks2UUJkWE5sWVhOMExXUnpiWE0ifQ.naQ_FfRkpZ1Ll4idCYWDX0ujWjKhqs8dTEzU_DtT3o7Qp3rGXQHjgTo3AOneFwWK1JxW52G3zP2SEFueHTkfUq6nsNgFkB-ycSNuynZsGx9gbxyIJ8AmnBnZr3WYxUxnXarMc7PGIaSsS3U-VF9PI_OBr3LJgbJ7CEtdVDY8dmtyGo4FONg2WDkMBN5oSjHTo6pW_OKkoolK-_FN1h-zysgYB0ZhR2aDu030qksyuOEBmP2Py6_jDbaWR6B4BmJzivMsrgLjn16rggcj9uTaO-HJ2jZkM9ZkReBt64DN52ldk3IQpTDuy_LkIpzKEBeNZr2YgioPjqDtNhiMOgFuEw';

  useEffect(() => {
    fetchCentros();
  }, []);

  const fetchCentros = async () => {
    try {
      const response = await axios.get('api1/cencos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCentros(response.data);
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
        await axios.post('/api1/cencos', updatedCenco, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.put(`/api1/cencos/${updatedCenco.idCencos}`, updatedCenco, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
        <table className="min-w-full bg-white border border-gray-200">
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
