import { useEffect, useState } from 'react';
import FilterInput from '../components/FilterImput';
import WorkerModal from '../components/WorkerModal';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('general');
  const [userData, setUserData] = useState({
    empleado: '',
    nombre: '',
    direccion: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [searchFilters, setSearchFilters] = useState({ empleado: '', nombre: '', direccion: '' });

  useEffect(() => {
    if (showModal) {
      fetch('/api/empleado/todos', {
       // headers: {
        //  'x-api-key': 'e3c8919b-7b40-4821-a53d-c6b8509b7c92'
        //}
      })
        .then(res => res.json())
        .then(data => {
          console.log('Trabajadores cargados:', data); // <-- revisa esto
          setWorkers(data)})
        .catch(err => console.error('Error al cargar trabajadores', err));
    }
  }, [showModal]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredWorkers = workers.filter(worker =>
    (!searchFilters.nombre || worker.nombre?.toLowerCase().includes(searchFilters.nombre.toLowerCase())) &&
    (!searchFilters.empleado || worker.empleado?.toLowerCase().includes(searchFilters.empleado.toLowerCase())) &&
    (!searchFilters.direccion || worker.direccion?.toLowerCase().includes(searchFilters.direccion.toLowerCase()))
  );

  const handleSelectWorker = (worker) => {
    setUserData({
      empleado: worker.nombre,
      nombre: worker.empleado || '',
      direccion: worker.direccion || ''
    });
    setShowModal(false);
  };

  const tabs = [
    { id: 'general', label: 'Datos Generales' },
    { id: 'security', label: 'Cartas' },
    { id: 'settings', label: 'Finiquitos' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-1/4 bg-white rounded-2xl shadow p-4">
          <div className="flex flex-col items-center">
            <img
              src="https://ui-avatars.com/api/?name=Juan+P%C3%A9rez"
              alt="Avatar"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">{userData.nombre || 'Nombre'}</h2>
            <p className="text-gray-500">{userData.direccion || 'Rol'}</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Seleccionar Trabajador
            </button>
          </div>
        </div>

        {/* Panel Principal */}
        <div className="w-3/4 bg-white rounded-2xl shadow p-6">
          <div className="flex gap-4 border-b mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 font-semibold'
                    : 'text-gray-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenido por tab */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <FilterInput
                label="Nombre"
                name="name"
                value={userData.empleado}
                onChange={(e) => setUserData(prev => ({ ...prev, nombre: e.target.value }))}
                placeholder="Nombre del trabajador"
              />
              <FilterInput
                label="Correo"
                name="email"
                value={userData.nombre}
                onChange={(e) => setUserData(prev => ({ ...prev, empleado: e.target.value }))}
                placeholder="Correo electrónico"
              />
              <FilterInput
                label="Teléfono"
                name="phone"
                value={userData.direccion}
                onChange={(e) => setUserData(prev => ({ ...prev, direccion: e.target.value }))}
                placeholder="Teléfono"
              />
            </div>
          )}

          {activeTab === 'security' && (
            <div><p className="text-gray-500">Aquí irían tus cartas del trabajador.</p></div>
          )}

          {activeTab === 'settings' && (
            <div><p className="text-gray-500">Aquí puedes gestionar los finiquitos.</p></div>
          )}

          <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
            Guardar Cambios
          </button>
        </div>
      </div>

      {/* Modal separado */}
      {showModal && (
        <WorkerModal
          workers={filteredWorkers}
          filters={searchFilters}
          onFilterChange={handleFilterChange}
          onClose={() => setShowModal(false)}
          onSelect={handleSelectWorker}
        />
      )}
    </div>
  );
}
