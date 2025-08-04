import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/auth/authConfig";
import { getAccessToken } from "@/utils/getAccessToken";
import apiClient from '@/utils/apiClient';
import { toast } from 'react-toastify';

export default function SelectFromApi({
  label,
  name,
  value,
  onChange,
  endpoint,
  params = {},
  optionValue = 'idCatalogo',
  optionLabel = 'nombre',
}) {
const [options, setOptions] = useState([]);
const [loading, setLoading] = useState(true);
const { instance, accounts } = useMsal();
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const result = await apiClient.get(endpoint);
       // toast.success('Datos Extraidos correctamente');
        setOptions(result);
      } catch (error) {
        console.error(`Error cargando opciones para ${name}:`, error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [endpoint, JSON.stringify(params), name]);

  if (loading) return <p>Cargando {label}...</p>;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value || ''}
        onChange={onChange}
         className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
      >
        <option value="">Seleccione</option>
        {Array.isArray(options) &&
          options.map((opt) => (
            <option key={opt[optionValue]} value={opt[optionValue]}>
              {opt[optionLabel]}
            </option>
          ))}
      </select>
    </div>
  );
}
