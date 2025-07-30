import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function EmployeeDetail() {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)
  const [payments, setPayments] = useState([])

  useEffect(() => {
    fetch(`https://localhost:5001/api/employees/${id}`)
      .then(res => res.json())
      .then(data => setEmployee(data))

    fetch(`https://localhost:5001/api/employees/${id}/payments`)
      .then(res => res.json())
      .then(data => setPayments(data))
  }, [id])

  if (!employee) return <div className="p-4">Cargando...</div>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{employee.name}</h1>
      <p className="mb-4">{employee.position}</p>
      <h2 className="text-lg font-semibold mb-2">Solicitudes de pago</h2>
      <ul className="space-y-2">
        {payments.map(p => (
          <li key={p.id} className="bg-gray-100 p-2 rounded">
            {p.description} - ${p.amount}
          </li>
        ))}
      </ul>
    </div>
  )
}
