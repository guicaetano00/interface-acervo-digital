import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import ProtectedRoute from './components/Rotas/ProtectedRoutes'
import PAlunos from './pages/PAlunos/PAlunos'
import PEmprestimos from './pages/PEmprestimos/PEmprestimos'
import PLivros from './pages/PLivros/PLivros'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} /> 
        <Route path='/login' element={<PLogin />}/>
        <Route path='/alunos' element={<ProtectedRoute element={PAlunos}/>}/>
        <Route path='/emprestimos' element={<ProtectedRoute element={PEmprestimos}/>}/>
        <Route path='/livros' element={<ProtectedRoute element={PLivros}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
