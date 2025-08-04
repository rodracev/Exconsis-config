import apiClient from "@/utils/apiClient";
import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";


registerLocale("es", es);
export default function Modalcatalogo({
  isOpen,
  onClose,
  onSave,
  initialData,
  Idmaestro,
  modo,
}) {
    const [formData, setFormData] = useState({
        IdMaestroCatalogo: Idmaestro,
        idCatalogo: null,
        nombre: '',
        descripcion: '',
        estado: '',
        custom01:0,
        custom02:0,
        custom03:0,
        custom04:'',
        custom05:'',
        custom06:'',
        custom07:'1900-01-01',
        custom08:'1900-01-01',
        custom09:'1900-01-01',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [datos, setDatos] = useState([]);
    const [buttonText, setButtonText] = useState('Guardar');

    useEffect(() => {
        if (initialData && modo === 'editar') {
          setFormData(initialData);
          console.log(formData);
        } else if (modo === 'crear') {
          // Limpiar formulario para creación
          setFormData({
            IdMaestroCatalogo: Idmaestro,
            idCatalogo: null,
            nombre: '',
            descripcion: '',
            estado: '',
            custom01:0,
            custom02:0,
            custom03:0,
            custom04:'',
            custom05:'',
            custom06:'',
            custom07:'1900-01-01',
            custom08:'1900-01-01',
            custom09:'1900-01-01',
          });
        }
      }, [initialData, modo]);

      if (!isOpen) return null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            onSave(formData);  // cerrar modal o refrescar datos
        } catch (error) {
            console.error('Error al hacer PUT:', error);
        }
    };
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded-lg w-full max-w-5xl shadow-xl">
            <div className="relative bg-[#596066] p-4 text-white rounded-md shadow-md">
                <button
                onClick={onClose}
                className="absolute top-2 right-2 text-3xl font-bold text-white hover:text-gray-200 focus:outline-none"
                >
                &times;
                </button>
                <h2 className="text-xl font-bold">Detalle catálogos</h2>
            </div>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
           <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Id item Catalogo</label>
                <input type="text" name="idCatalogo" 
                 value={formData.idCatalogo || ''} 
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
                <label className="block text-sm font-medium text-gray-700 mb-1">estado</label>
                 <select
                    name="Estado"
                    value={formData.estado || ''}
                    onChange={handleSelectChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                    <option value="A ">Activo</option>
                    <option value="I ">Inactivo</option>
                </select>
            </div>
             <div className="col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
                <input type="text" name="descripcion" 
                    value={formData.descripcion || ''} 
                    onChange={handleSelectChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
                />
            </div>
            <div className='col-span-1'>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Personalizado 01</label>
                    <input type="text" name="custom01" 
                    value={formData.custom01 || 0 } 
                    onChange={handleSelectChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
                    />
                </div>
            </div>
            <div className='col-span-1'>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Personalizado 02</label>
                    <input type="text" name="custom02" 
                    value={formData.custom02 || 0} 
                    onChange={handleSelectChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
                    />
                </div>
            </div>
            <div className='col-span-1'>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Personalizado 03</label>
                    <input type="text" name="custom03" 
                    value={formData.custom03 || 0} 
                    onChange={handleSelectChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
                    />
                </div>
            </div>
            <div className='col-span-1'>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Personalizado 04</label>
                    <input type="text" name="custom04" 
                    value={formData.custom04 || ''} 
                    onChange={handleSelectChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
                    />
                </div>
            </div>
            <div className='col-span-1'>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Personalizado 05</label>
                    <input type="text" name="custom05" 
                    value={formData.custom05 || ''} 
                    onChange={handleSelectChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
                    />
                </div>
            </div>
            <div className='col-span-1'>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Personalizado 06</label>
                    <input type="text" name="custom06" 
                    value={formData.custom06 || ''} 
                    onChange={handleSelectChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
                    />
                </div>
            </div>
            <div className='col-span-1'>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Personalizado 07</label>
                    <DatePicker
                        selected={formData.custom07}
                        onChange={(date) =>
                        setFormData((prev) => ({
                            ...prev,
                            custom07: date,
                        }))
                        }
                        locale="es"
                        placeholderText="Selecciona una fecha"
                        dateFormat="dd/MM/yyyy"
                        className="w-full p-2 border border-gray-300 rounded-xl"
                        showPopperArrow={false}
                        popperPlacement="bottom-start"
                        // Si está en blanco, enfoca en hoy
                        openToDate={formData.custom07 || new Date()}
                    />
                </div>
            </div>
            <div className='col-span-1'>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Personalizado 08</label>
                    <DatePicker
                        selected={formData.custom08}
                        onChange={(date) =>
                        setFormData((prev) => ({
                            ...prev,
                            custom08: date,
                        }))
                        }
                        locale="es"
                        placeholderText="Selecciona una fecha"
                        dateFormat="dd/MM/yyyy"
                        className="w-full p-2 border border-gray-300 rounded-xl"
                        showPopperArrow={false}
                        popperPlacement="bottom-start"
                        // Si está en blanco, enfoca en hoy
                        openToDate={formData.custom08 || new Date()}
                    />
                </div>
            </div>
            <div className='col-span-1'>
                <label className="block text-sm font-medium text-gray-700">Personalizado 09</label>
                    <DatePicker
                        selected={formData.custom09}
                        onChange={(date) =>
                        setFormData((prev) => ({
                            ...prev,
                            custom09: date,
                        }))
                        }
                        locale="es"
                        placeholderText="Selecciona una fecha"
                        dateFormat="dd/MM/yyyy"
                        className="w-full p-2 border border-gray-300 rounded-xl"
                        showPopperArrow={false}
                        popperPlacement="bottom-start"
                        // Si está en blanco, enfoca en hoy
                        openToDate={formData.custom09 || new Date()}
                    />
            </div>    
         </div>
 
              <div className="flex justify-end space-x-2">
                <button type="button" 
                    onClick={onClose} 
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                    Cancelar
                </button>
                <button type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                   {buttonText}</button>
              </div>
            </form>
          </div>
        </div>
      );
}