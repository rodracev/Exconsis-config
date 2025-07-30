import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import EmployeeDetail from './pages/EmployeeDetail'
import UserProfile from './pages/UserProfile'
import Cencos from './pages/Configuraciones/Cencos'
import Catalogo from './pages/Configuraciones/Catalogo'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} />
          <Route path="/perfil" element={<UserProfile />} />
          <Route path="/Cencos" element={<Cencos />} />
          <Route path="/Catalogo" element={<Catalogo />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
