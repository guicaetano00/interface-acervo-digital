import { type JSX } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type AlunoDTO from "../../../dto/AlunoDTO";
import AlunoRequests from "../../../fetch/AlunoRequests";
import Utilitario from "../../../utils/Utilitario";

const REGISTROS_POR_PAGINA = 10;

function ListagemAluno(): JSX.Element {
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const listaDeAlunos = await AlunoRequests.obterListaDeAlunos();
                setAlunos(Array.isArray(listaDeAlunos) ? listaDeAlunos : []);
            } catch (error) {
                console.error(`Erro ao buscar alunos. ${error}`);
                alert("Erro ao criar listagem de alunos");
            }
        };

        fetchAlunos();
    }, []);

    const handleRemoverAluno = async (id_aluno: number, nome: string) => {
        if (window.confirm(`Tem certeza que deseja remover o aluno "${nome}"?`)) {
            const sucesso = await AlunoRequests.removerAluno(id_aluno);
            if (sucesso) {
                alert("Aluno removido com sucesso!");
                const novoTotal = alunos.length - 1;
                const novaTotalPaginas = Math.ceil(novoTotal / REGISTROS_POR_PAGINA);
                if (paginaAtual > novaTotalPaginas && novaTotalPaginas > 0) {
                    setPaginaAtual(novaTotalPaginas);
                }
                setAlunos(prev => prev.filter(aluno => aluno.id_aluno !== id_aluno));
            } else {
                alert("Não foi possível remover o aluno.");
            }
        }
    };

    // Cálculos de paginação
    const totalPaginas = Math.max(1, Math.ceil(alunos.length / REGISTROS_POR_PAGINA));
    const inicio = (paginaAtual - 1) * REGISTROS_POR_PAGINA;
    const alunosDaPagina = alunos.slice(inicio, inicio + REGISTROS_POR_PAGINA);

    // Gera os números de página a exibir (com reticências quando há muitas páginas)
    const gerarPaginas = (): (number | "...")[] => {
        if (totalPaginas <= 7) {
            return Array.from({ length: totalPaginas }, (_, i) => i + 1);
        }
        const paginas: (number | "...")[] = [1];
        if (paginaAtual > 3) paginas.push("...");
        for (let i = Math.max(2, paginaAtual - 1); i <= Math.min(totalPaginas - 1, paginaAtual + 1); i++) {
            paginas.push(i);
        }
        if (paginaAtual < totalPaginas - 2) paginas.push("...");
        paginas.push(totalPaginas);
        return paginas;
    };

    return (
        <main className="bg-gray-200 pb-6">
            {/* Cabeçalho */}
            <div className="max-w-[100rem] mx-auto grid grid-cols-3 items-end pt-[1.5rem] px-4 mb-4">
                <div /> {/* Spacer para centralizar o título */}
                <div className="text-center">
                    <h1 className="text-[3rem]">Alunos</h1>
                    <p className="text-[1.75rem] text-gray-600">Lista de alunos</p>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => navigate("/cadastro/aluno")}
                        className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-3 rounded-lg shadow-lg transition-all flex items-center gap-2 font-semibold text-lg mb-2"
                    >
                        <i className="pi pi-plus-circle"></i>
                        Novo Aluno
                    </button>
                </div>
            </div>

            {/* Tabela */}
            <div className="overflow-auto rounded-lg shadow-md max-w-[100rem] mx-auto bg-white mb-4">
                <table className="w-full min-w-[50rem] border-collapse bg-white">
                    <thead className="bg-slate-700 sticky top-0">
                        <tr>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">Nome</th>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">Email</th>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">Endereço</th>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">Nascimento</th>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">RA</th>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">Celular</th>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {alunosDaPagina.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-6 text-center text-gray-400">
                                    Nenhum aluno encontrado.
                                </td>
                            </tr>
                        ) : (
                            alunosDaPagina.map((aluno) => (
                                <tr
                                    key={aluno.id_aluno ?? aluno.ra}
                                    className="hover:bg-blue-50 transition-colors duration-200 even:bg-gray-50"
                                >
                                    <td className="p-3 text-gray-700 font-medium">{aluno.nome} {aluno.sobrenome}</td>
                                    <td className="p-3 text-gray-700">{aluno.email}</td>
                                    <td className="p-3 text-gray-700">{aluno.endereco}</td>
                                    <td className="p-3 text-gray-700">{Utilitario.formatarData(aluno.data_nascimento)}</td>
                                    <td className="p-3 text-gray-700">{aluno.ra ?? "-"}</td>
                                    <td className="p-3 text-gray-700">{aluno.celular ? Utilitario.formatarTelefone(aluno.celular) : "-"}</td>
                                    <td className="p-3 text-gray-700">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => navigate(`/atualizar/aluno/${aluno.id_aluno}`)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow-sm transition-colors text-sm font-medium"
                                            >
                                                Atualizar
                                            </button>
                                            <button
                                                onClick={() => handleRemoverAluno(aluno.id_aluno!, aluno.nome)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm transition-colors text-sm font-medium"
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
            <div className="max-w-[100rem] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Contador de registros */}
                <p className="text-gray-600 text-sm">
                    Exibindo{" "}
                    <span className="font-semibold text-slate-700">
                        {alunos.length === 0 ? 0 : inicio + 1}–{Math.min(inicio + REGISTROS_POR_PAGINA, alunos.length)}
                    </span>{" "}
                    de <span className="font-semibold text-slate-700">{alunos.length}</span> alunos
                </p>

                {/* Controles de navegação */}
                <nav className="flex items-center gap-1" aria-label="Paginação">
                    {/* Primeira página */}
                    <button
                        onClick={() => setPaginaAtual(1)}
                        disabled={paginaAtual === 1}
                        title="Primeira página"
                        className="px-2 py-1.5 rounded text-sm text-slate-700 disabled:opacity-40 hover:bg-slate-200 transition-colors"
                    >«</button>

                    {/* Página anterior */}
                    <button
                        onClick={() => setPaginaAtual(p => p - 1)}
                        disabled={paginaAtual === 1}
                        title="Página anterior"
                        className="px-3 py-1.5 rounded text-sm text-slate-700 disabled:opacity-40 hover:bg-slate-200 transition-colors"
                    >‹</button>

                    {/* Números de página */}
                    {gerarPaginas().map((pagina, idx) =>
                        pagina === "..." ? (
                            <span key={`ellipsis-${idx}`} className="px-2 py-1.5 text-gray-400 select-none">…</span>
                        ) : (
                            <button
                                key={pagina}
                                onClick={() => setPaginaAtual(pagina as number)}
                                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                                    paginaAtual === pagina
                                        ? "bg-slate-700 text-white shadow"
                                        : "text-slate-700 hover:bg-slate-200"
                                }`}
                            >
                                {pagina}
                            </button>
                        )
                    )}

                    {/* Próxima página */}
                    <button
                        onClick={() => setPaginaAtual(p => p + 1)}
                        disabled={paginaAtual === totalPaginas}
                        title="Próxima página"
                        className="px-3 py-1.5 rounded text-sm text-slate-700 disabled:opacity-40 hover:bg-slate-200 transition-colors"
                    >›</button>

                    {/* Última página */}
                    <button
                        onClick={() => setPaginaAtual(totalPaginas)}
                        disabled={paginaAtual === totalPaginas}
                        title="Última página"
                        className="px-2 py-1.5 rounded text-sm text-slate-700 disabled:opacity-40 hover:bg-slate-200 transition-colors"
                    >»</button>
                </nav>
            </div>
        </main>
    );
}

export default ListagemAluno;