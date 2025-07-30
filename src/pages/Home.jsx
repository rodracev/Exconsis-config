import { useEffect, useState } from 'react'
import FiniquitoCards from '../components/FiniquitosPendientes/FiniquitosCards';
import Sidebar from '../Layout';
import { Link } from 'react-router-dom'



function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet /> {/* Aquí se renderizan las páginas hijas como perfil, inicio, etc */}
      </main>
    </div>
  );
}
export default function Home() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetch('/api/trabajador', {
      headers: {
        'x-api-key': 'e3c8919b-7b40-4821-a53d-c6b8509b7c92'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`)
        return res.json()
      })
      .then(data => {
        // Limpiamos los espacios en los campos más importantes
        const cleaned = data.map(empleado => ({
          Rut: empleado.rut.trim(),
          Nombre: empleado.nombre.trim(),
          Cargo: empleado.cargo.trim(),
          Emp: empleado.emp.trim(),
        }))
        setEmployees(cleaned)
      })
      .catch(err => console.error("Error al obtener datos:", err))
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Empleados</h1>
      <ul className="grid gap-4">
        {employees.map(empleado => (
          <li key={`${empleado.Rut}-${empleado.Emp}`} className="bg-white p-4 rounded shadow">
            <Link to={`/employee/${empleado.rut}`} className="text-blue-600 hover:underline">
              {empleado.Nombre}
            </Link>
            <p>{empleado.Cargo}</p>
          </li>
        ))}
      </ul>
       <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Trabajadores en Proceso de Finiquito</h1>
        <FiniquitoCards endpoint="/api/empleado/finpend" />
      </div>
    </div>
    
  )
}