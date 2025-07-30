import React, { useEffect, useState } from 'react';

export default function FiniquitoCards({ endpoint }) {
  const [trabajadores, setTrabajadores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setTrabajadores(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar datos:', err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <p className="text-center text-gray-500">Cargando trabajadores...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {trabajadores.map((t, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-1">{t.nombre}</h3>
          <p className="text-sm text-gray-600">Contrato: <span className="font-medium">{t.contrato}</span></p>
          <p className="text-sm text-gray-600">RUT: <span className="font-medium">{t.rut}</span></p>
          <p className="text-sm text-gray-600">Término: <span className="font-medium">{t.fechaTerm}</span></p>
          <p className="text-sm text-gray-600">Centro Costo: <span className="font-medium">{t.cencos}</span></p>
          <p className="text-sm text-gray-600">Cargo: <span className="font-medium">{t.cargo}</span></p>
        </div>
      ))}
      {trabajadores.length === 0 && (
        <p className="col-span-full text-center text-gray-500">No hay trabajadores en proceso de finiquito.</p>
      )}
    </div>
  );
}
