import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSIsImtpZCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSJ9.eyJhdWQiOiJhcGk6Ly85Mzc1YjczYS1mODEzLTQ2OGMtYWVkZS0wYTRkYjY5NzM5OGMiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kM2M3OWRjNS1hMTAzLTQxMjYtOTc5Yy05NWJmYTNiODQ0MWIvIiwiaWF0IjoxNzUzODEzNjQzLCJuYmYiOjE3NTM4MTM2NDMsImV4cCI6MTc1MzgxODMyOCwiYWNyIjoiMSIsImFpbyI6IkFYUUFpLzhaQUFBQThEZkpnNXcxcUdBZHhjaTNoZnFia1czVkJlaEo0RzZNaXVsY2VaYmd6c0FxOWxGQlBiY29sejB0OHhyUGl2RkkydXNETTRaeWkvcWZOZitWREYvak1FYkdEcVQ1LzI5U29TV2ZjVUNkQjlCcHVWT25XeTd2NVowRmJrd1JjQnlKWndsbW4yVTdxcUYweEQ0KzY4T0JDdz09IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjkzNzViNzNhLWY4MTMtNDY4Yy1hZWRlLTBhNGRiNjk3Mzk4YyIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiQWNldmVkbyBGZXJuYW5kZXoiLCJnaXZlbl9uYW1lIjoiUm9kcmlnbyIsImlwYWRkciI6IjE1Mi4yMzEuOTAuMiIsIm5hbWUiOiJSb2RyaWdvIEFjZXZlZG8gRmVybmFuZGV6Iiwib2lkIjoiMjUxNTk5NmItZWVjMS00YjZmLThjY2YtOGEyZTQ1NjViN2RmIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTMyMDEyNTgwOTgtMzA2MjQxMjIzOS0yNTcwOTIyNTMwLTM3MzYiLCJyaCI6IjEuQVZrQXhaM0gwd09oSmtHWG5KV19vN2hFR3pxM2RaTVQtSXhHcnQ0S1RiYVhPWXhaQUJoWkFBLiIsInNjcCI6ImFwaS5yZWFkIiwic2lkIjoiMDA2ZjFkNjktZTE1OS1jZmFkLWM1MzgtMWI5NjYwZjRkMzI5Iiwic3ViIjoiQW9TbksyR3ZVeHUxN2Y2OGU4SGQyaTFZMFBWSkFiVXlDa2x5TEtEX0NyWSIsInRpZCI6ImQzYzc5ZGM1LWExMDMtNDEyNi05NzljLTk1YmZhM2I4NDQxYiIsInVuaXF1ZV9uYW1lIjoicmFjZXZlZG9AZXhjb24uY2wiLCJ1cG4iOiJyYWNldmVkb0BleGNvbi5jbCIsInV0aSI6IktHaTRkbENodzBXX0xIQmFFNlVUQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfZnRkIjoia2tnVzNrR2oyaHpQbm4tS1g0QVp2ck4zeDF3S3RHcEZacElNLVFhcks2UUJkWE5sWVhOMExXUnpiWE0ifQ.naQ_FfRkpZ1Ll4idCYWDX0ujWjKhqs8dTEzU_DtT3o7Qp3rGXQHjgTo3AOneFwWK1JxW52G3zP2SEFueHTkfUq6nsNgFkB-ycSNuynZsGx9gbxyIJ8AmnBnZr3WYxUxnXarMc7PGIaSsS3U-VF9PI_OBr3LJgbJ7CEtdVDY8dmtyGo4FONg2WDkMBN5oSjHTo6pW_OKkoolK-_FN1h-zysgYB0ZhR2aDu030qksyuOEBmP2Py6_jDbaWR6B4BmJzivMsrgLjn16rggcj9uTaO-HJ2jZkM9ZkReBt64DN52ldk3IQpTDuy_LkIpzKEBeNZr2YgioPjqDtNhiMOgFuEw';

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(endpoint, {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Datos recibidos:', response.data);
        setOptions(response.data);
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
console.log('Opciones para select:', {options});
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
