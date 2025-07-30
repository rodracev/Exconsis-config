import FilterInput from './FilterImput';

export default function WorkerModal({ workers, filters, onFilterChange, onClose, onSelect }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6 relative">
        <h2 className="text-2xl font-bold mb-4">Seleccionar Trabajador</h2>

        {/* Filtros */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <FilterInput
            label="Nombre"
            name="nombre"
            value={filters.nombre}
            onChange={onFilterChange}
            placeholder="Buscar por nombre"
          />
          <FilterInput
            label="RUT"
            name="empleado"
            value={filters.empleado}
            onChange={onFilterChange}
            placeholder="Buscar por RUT"
          />
          <FilterInput
            label="Correo"
            name="direccion"
            value={filters.direccion}
            onChange={onFilterChange}
            placeholder="Buscar por correo"
          />
        </div>

        {/* Tabla de trabajadores */}
        <div className="overflow-y-auto max-h-80 border rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Nombre</th>
                <th className="p-2">RUT</th>
                <th className="p-2">Correo</th>
                <th className="p-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{worker.nombre}</td>
                  <td className="p-2">{worker.empleado}</td>
                  <td className="p-2">{worker.direccion}</td>
                  <td className="p-2">
                    <button
                      onClick={() => onSelect(worker)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Seleccionar
                    </button>
                  </td>
                </tr>
              ))}
              {workers.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No se encontraron trabajadores
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Cerrar modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}