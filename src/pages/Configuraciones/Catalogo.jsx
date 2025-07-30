import React, { useEffect, useState } from 'react';
import SelectFromApi from '@/components/SelectFromApi';
import axios from 'axios';
import ModalCenco from '@/components/ModalCenco';

export default function Catalogo() {
  const [formData, setFormData] = useState(null);
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCentro, setSelectedCentro] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modo, setModo] = useState('crear'); // 'crear' o 'editar'

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSIsImtpZCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSJ9.eyJhdWQiOiJhcGk6Ly85Mzc1YjczYS1mODEzLTQ2OGMtYWVkZS0wYTRkYjY5NzM5OGMiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kM2M3OWRjNS1hMTAzLTQxMjYtOTc5Yy05NWJmYTNiODQ0MWIvIiwiaWF0IjoxNzUzODE4NTcyLCJuYmYiOjE3NTM4MTg1NzIsImV4cCI6MTc1MzgyMjk1OCwiYWNyIjoiMSIsImFpbyI6IkFYUUFpLzhaQUFBQU42dm1HeHMvbTVmY3ZUMXBCNjBoVndRKytmZjQ0WHloOERrTXpkYTRmRHJNM1BPcWdkTStUbXZ1S0R2QkZUT0UrRmZwNlBzTVRsN1B0RzIxaWxhRm1BbW1obFJkQytCdDN1SDBoZERNaVNFZ1N3RWNOSXdQOHpDdDRVa0VtR04zUHdCUHVGZ09Uc3R0WHRQK282Y0NWZz09IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjkzNzViNzNhLWY4MTMtNDY4Yy1hZWRlLTBhNGRiNjk3Mzk4YyIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiQWNldmVkbyBGZXJuYW5kZXoiLCJnaXZlbl9uYW1lIjoiUm9kcmlnbyIsImlwYWRkciI6IjE1Mi4yMzEuOTAuMiIsIm5hbWUiOiJSb2RyaWdvIEFjZXZlZG8gRmVybmFuZGV6Iiwib2lkIjoiMjUxNTk5NmItZWVjMS00YjZmLThjY2YtOGEyZTQ1NjViN2RmIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTMyMDEyNTgwOTgtMzA2MjQxMjIzOS0yNTcwOTIyNTMwLTM3MzYiLCJyaCI6IjEuQVZrQXhaM0gwd09oSmtHWG5KV19vN2hFR3pxM2RaTVQtSXhHcnQ0S1RiYVhPWXhaQUJoWkFBLiIsInNjcCI6ImFwaS5yZWFkIiwic2lkIjoiMDA2ZjFkNjktZTE1OS1jZmFkLWM1MzgtMWI5NjYwZjRkMzI5Iiwic3ViIjoiQW9TbksyR3ZVeHUxN2Y2OGU4SGQyaTFZMFBWSkFiVXlDa2x5TEtEX0NyWSIsInRpZCI6ImQzYzc5ZGM1LWExMDMtNDEyNi05NzljLTk1YmZhM2I4NDQxYiIsInVuaXF1ZV9uYW1lIjoicmFjZXZlZG9AZXhjb24uY2wiLCJ1cG4iOiJyYWNldmVkb0BleGNvbi5jbCIsInV0aSI6IlpZU0RscWFkcFVDQ29PRUVQT1VoQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfZnRkIjoic3JxeTc4Q251UEp2bUxYOXRrd05GM2phNkFxVlRnWmliVi1RZFd5VXJPZ0JkWE51YjNKMGFDMWtjMjF6In0.Zr4LYo1UirPbO7NgmG9jQfJuaADB1TYB7X3fkWbBKZ4VzH5sq5G4_U24CHTzPfa-xwoIQp-8-hdaI6rahKgkcewdhZvocTBfKTThE0H8400Rl5-DzEFva1oLMt3L7HVwOP0-TBc41jX818RZj4d55ZCYP7B-ciAa7tyVnd7noy-8OigFT3ogXZNR6K1VWGihpKnJGoFKPwh0z2P5Zp5mq1CrUj2Rd3jAhBE9V3E6GKLJ-o_8BRrnqalcf8XVyWVeP1l_h-PklsgRQ5ZdD0w5AeQikIIbCkoxIkzEIVVM2WsM8J8a-UxEyBXbbZ7sR3ivfaJpgYLqoliCBwjvI95oSQ';

  const [filtro, setFiltro] = useState('');
  const [datos, setDatos] = useState([]);
 const obtenerDatos = async (filtroSeleccionado) => {

    try {
      const respuesta = await fetch(`/api1/catalogo/MaestroCatalogo/${filtroSeleccionado}`);
      const resultado = await respuesta.json();
      console.log(resultado);
      setDatos(resultado);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  const handleChange = (e) => {
    const nuevoFiltro = e.target.value;
    setFiltro(nuevoFiltro);
    obtenerDatos(nuevoFiltro);
  };
const handleSelectChange = (e) => {
    const { name, value } = e.target;
     console.log('Cambio select:', name, value);
    setFormData(prev => ({ ...prev, [name]: value }));
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


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Catalogos</h2>
       <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-100 p-4">
                          <SelectFromApi
                              label="Maestro Catalogo"
                              name="maestrocatalogo"
                              value={ ''}
                              onChange={handleChange}
                              endpoint="api1/MaestroCatalogo"
                              optionValue="idCatalogo"
                              optionLabel="nombre"
                              //params={{ activo: true }}
                              />
                      </div>
        </div>
        <button
          onClick={() => {
            setFormData({});  // Limpia la data
            setModo('crear');
            setModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Crear nuevo Catalogo
        </button>
      {loading ? (
        <p>Cargando catalogo...</p>
      ) : (
         <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className="border px-4 py-2">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item.idCencos}>
              <td className="border px-4 py-2">{item.nombre}</td>
              <td className="border px-4 py-2">{item.descripcion}</td>
              <td className="border px-4 py-2">{item.estado}</td>
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
