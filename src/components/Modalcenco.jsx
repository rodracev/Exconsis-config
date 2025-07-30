//import React from 'react';
import SelectFromApi from './SelectFromApi';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function ModalCenco({ isOpen, onClose, onSave,initialData,modo }) {
   const [formData, setFormData] = useState({
    idCencos: null,
    nombre: '',
    descripcion: '',
    tipo: '',
    idDynamics: '',
    proyecto: '',
    actividad: '',
    estado: '',
    aprobador:'',
    aremu:'',
    asel:'',
    asisel:'',
    ProcesoAcreditacion:'',
    unidad:'',
    calc25:'',
    listinfcontratados:'',
    listinffiniquito:'',
  });  
 useEffect(() => {
    if (initialData && modo === 'editar') {
      setFormData(initialData);
    } else if (modo === 'crear') {
      // Limpiar formulario para creación
      setFormData({
        idCencos: null,
        nombre: '',
        descripcion: '',
        tipo: '',
        idDynamics: '',
        proyecto: '',
        actividad: '',
        estado: '',
        aprobador:'',
        aremu:'',
        asel:'',
        asisel:'',
        ProcesoAcreditacion:'',
        unidad:'',
        calc25:'',
        listinfcontratados:'',
        listinffiniquito:'',
      });
    }
  }, [initialData, modo]);

  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSIsImtpZCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSJ9.eyJhdWQiOiJhcGk6Ly85Mzc1YjczYS1mODEzLTQ2OGMtYWVkZS0wYTRkYjY5NzM5OGMiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kM2M3OWRjNS1hMTAzLTQxMjYtOTc5Yy05NWJmYTNiODQ0MWIvIiwiaWF0IjoxNzUzODEzNjQzLCJuYmYiOjE3NTM4MTM2NDMsImV4cCI6MTc1MzgxODMyOCwiYWNyIjoiMSIsImFpbyI6IkFYUUFpLzhaQUFBQThEZkpnNXcxcUdBZHhjaTNoZnFia1czVkJlaEo0RzZNaXVsY2VaYmd6c0FxOWxGQlBiY29sejB0OHhyUGl2RkkydXNETTRaeWkvcWZOZitWREYvak1FYkdEcVQ1LzI5U29TV2ZjVUNkQjlCcHVWT25XeTd2NVowRmJrd1JjQnlKWndsbW4yVTdxcUYweEQ0KzY4T0JDdz09IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjkzNzViNzNhLWY4MTMtNDY4Yy1hZWRlLTBhNGRiNjk3Mzk4YyIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiQWNldmVkbyBGZXJuYW5kZXoiLCJnaXZlbl9uYW1lIjoiUm9kcmlnbyIsImlwYWRkciI6IjE1Mi4yMzEuOTAuMiIsIm5hbWUiOiJSb2RyaWdvIEFjZXZlZG8gRmVybmFuZGV6Iiwib2lkIjoiMjUxNTk5NmItZWVjMS00YjZmLThjY2YtOGEyZTQ1NjViN2RmIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTMyMDEyNTgwOTgtMzA2MjQxMjIzOS0yNTcwOTIyNTMwLTM3MzYiLCJyaCI6IjEuQVZrQXhaM0gwd09oSmtHWG5KV19vN2hFR3pxM2RaTVQtSXhHcnQ0S1RiYVhPWXhaQUJoWkFBLiIsInNjcCI6ImFwaS5yZWFkIiwic2lkIjoiMDA2ZjFkNjktZTE1OS1jZmFkLWM1MzgtMWI5NjYwZjRkMzI5Iiwic3ViIjoiQW9TbksyR3ZVeHUxN2Y2OGU4SGQyaTFZMFBWSkFiVXlDa2x5TEtEX0NyWSIsInRpZCI6ImQzYzc5ZGM1LWExMDMtNDEyNi05NzljLTk1YmZhM2I4NDQxYiIsInVuaXF1ZV9uYW1lIjoicmFjZXZlZG9AZXhjb24uY2wiLCJ1cG4iOiJyYWNldmVkb0BleGNvbi5jbCIsInV0aSI6IktHaTRkbENodzBXX0xIQmFFNlVUQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfZnRkIjoia2tnVzNrR2oyaHpQbm4tS1g0QVp2ck4zeDF3S3RHcEZacElNLVFhcks2UUJkWE5sWVhOMExXUnpiWE0ifQ.naQ_FfRkpZ1Ll4idCYWDX0ujWjKhqs8dTEzU_DtT3o7Qp3rGXQHjgTo3AOneFwWK1JxW52G3zP2SEFueHTkfUq6nsNgFkB-ycSNuynZsGx9gbxyIJ8AmnBnZr3WYxUxnXarMc7PGIaSsS3U-VF9PI_OBr3LJgbJ7CEtdVDY8dmtyGo4FONg2WDkMBN5oSjHTo6pW_OKkoolK-_FN1h-zysgYB0ZhR2aDu030qksyuOEBmP2Py6_jDbaWR6B4BmJzivMsrgLjn16rggcj9uTaO-HJ2jZkM9ZkReBt64DN52ldk3IQpTDuy_LkIpzKEBeNZr2YgioPjqDtNhiMOgFuEw'
      {/*}  const response = await axios.put(`api1/cencos/${formData.idCencos}`, formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }  
     );*/}
        //console.log('Actualizado:', response.data);
        console.log('Actualizado:', formData);
        onSave(formData);  // cerrar modal o refrescar datos
    } catch (error) {
        console.error('Error al hacer PUT:', error);
    }
  };
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
     console.log('Cambio select:', name, value);
    setFormData(prev => ({ ...prev, [name]: value }));
};
console.log('Valor actual de formData:', formData);

  const camposTexto = [
    'idCencos', 'nombre', 'descripcion', 'tipo', 'idDynamics', 'proyecto',
    'actividad', 'estado', 'aprobador', 'calc25', 'listinfcontratados', 'listinffiniquito'
  ];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded-lg w-full max-w-5xl shadow-xl">
        <h2 className="text-xl font-bold mb-4">Centro de costo</h2>
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
       <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Id centro de costo</label>
            <input type="text" name="idCencos" 
             value={formData.idCencos || ''} 
             onChange={handleSelectChange} 
             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
             />
        </div>
        <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input type="text" name="nombre" 
                value={formData.nombre || ''} 
                onChange={handleSelectChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
            />
        </div>
         <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">tipo</label>
            <select
                name="tipo"
                value={formData.tipo || ''}
                onChange={handleSelectChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
                <option value="">Seleccione</option>
                <option value="O ">Obra</option>
                <option value="OC">Oficina Central</option>
            </select>
        </div>
        <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
             <select
                name="Estado"
                value={formData.Estado || ''}
                onChange={handleSelectChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
                <option value="A">Activo</option>
                <option value="I">Incativo</option>
            </select>
        </div>
        <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
            <input type="text" name="descripcion" 
                value={formData.descripcion || ''} 
                onChange={handleSelectChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
                />
        </div>
        <div className='grid col-span-5 md:grid-cols-4'>
            <div>
                <label className="block text-sm font-medium text-gray-700">CC Dynamics</label>
                <input type="text" name="idDynamics" 
                value={formData.idDynamics || ''} 
                onChange={handleSelectChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Proyecto dynamics</label>
                <input type="text" name="proyecto" 
                value={formData.proyecto || ''} 
                onChange={handleSelectChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Actividad</label>
                <input type="text" name="actividad" 
                value={formData.actividad || ''} 
                onChange={handleSelectChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
                />
            </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">2.5</label>
                 <select
                    name="calc25"
                    value={formData.calc25 || ''}
                    onChange={handleSelectChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                    <option value="">Seleccione</option>
                    <option value="S">Si</option>
                    <option value="N">No</option>
                </select>
            </div>
        </div>
        <div className='grid col-span-5 md:grid-cols-2'>
             <div>
                <label className="block text-sm font-medium text-gray-700">Lista de distribucion contratados</label>
                <input type="text" name="listinfcontratados" 
                value={formData.listinfcontratados || ''} 
                onChange={handleSelectChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Lista de distribucion finiquitos</label>
                <input type="text" name="listinffiniquito" 
                value={formData.listinffiniquito || ''} 
                onChange={handleSelectChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
                />
            </div>
        </div>
       
        </div>
          <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4">
                    <SelectFromApi
                        label="Unidad"
                        name="unidad"
                        value={formData.unidad || ''}
                        onChange={handleSelectChange}
                        endpoint="api1/Catalogo/MaestroCatalogo/40"
                        optionValue="idCatalogo"
                        optionLabel="nombre"
                        //params={{ activo: true }}
                        />
                </div>
                <div className="bg-gray-200 p-4">
                          <SelectFromApi
                            label="Proceso Acreditacion"
                            name="ProcesoAcreditacion"
                            value={formData.ProcesoAcreditacion || ''}
                            onChange={handleSelectChange}
                            endpoint="api1/Catalogo/MaestroCatalogo/900"
                            optionValue="idCatalogo"
                            optionLabel="nombre"
                            //params={{ activo: true }}
                            />
                </div>
                <div className="bg-gray-100 p-4">
                    <SelectFromApi
                        label="Aprobador"
                        name="aprobador"
                        value={formData.aprobador || ''}
                        onChange={handleSelectChange}
                        endpoint="api1/usuarios"
                        optionValue="usuario1"
                        optionLabel="usuario1"
                        
                        //params={{ activo: true }}
                        />
                </div>
          </div>
          {/* Selects especiales */}
          
          
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4">
                    <SelectFromApi
                        label="Analista remuneraciones"
                        name="aremu"
                        value={formData.aremu || ''}
                        onChange={handleSelectChange}
                        endpoint="api1/usuarios"
                        optionValue="usuario1"
                        optionLabel="usuario1"
                        
                        //params={{ activo: true }}
                        />
                </div>
                <div className="bg-gray-200 p-4">
                      <SelectFromApi
                        label="Analista seleccion"
                        name="asel"
                        value={formData.asel || ''}
                        onChange={handleSelectChange}
                        endpoint="api1/usuarios"
                        optionValue="usuario1"
                        optionLabel="usuario1"
                        //params={{ activo: true }}
                        />
                </div>
                <div className="bg-gray-300 p-4">
                     <SelectFromApi
                        label="Asistente seleccion"
                        name="asisel"
                        value={formData.asisel || ''}
                        onChange={handleSelectChange}
                        endpoint="api1/usuarios"
                        optionValue="usuario1"
                        optionLabel="usuario1"
                        //params={{ activo: true }}
                        />
                </div>
            </div>
            
           
            
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
