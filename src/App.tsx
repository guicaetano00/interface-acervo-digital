import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import PListagemAluno from './pages/PListagem/PListagemAluno/PListagemAluno'
import PListagemEmprestimo from './pages/PListagem/PListagemEmprestimo/PListagemEmprestimo'
import PListagemLivro from './pages/PListagem/PListagemLivro/PListagemLivro'
import PDetalhesAluno from './pages/PDetalhes/PDetalhesAluno/PDetalhesAluno'
import PDetalhesEmprestimo from './pages/PDetalhes/PDetalhesEmprestimo/PDetalhesEmprestimo'
import PDetalhesLivro from './pages/PDetalhes/PDetalhesLivro/PDetalhesLivro'
// import ProtectedRoute from './components/Rotas/ProtectedRoutes'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} />
        <Route path='/login' element={<PLogin />} />
        <Route path='/lista/alunos' element={<PListagemAluno />} />
        <Route path='/lista/emprestimos' element={<PListagemEmprestimo />} />
        <Route path='/lista/livros' element={<PListagemLivro />} />
        <Route path='/detalhes/aluno/:id_aluno' element={<PDetalhesAluno />} />
        <Route path="/detalhes/emprestimo/:id_emprestimo" element={<PDetalhesEmprestimo />} />
        <Route path="/detalhes/livro/:id_livro" element={<PDetalhesLivro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;