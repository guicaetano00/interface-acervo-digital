import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import EmprestimoRequests from "../../../fetch/EmprestimoRequests";
import type EmprestimoDTO from "../../../dto/EmprestimoDTO";
import { useNavigate } from "react-router-dom";

interface DetalhesEmprestimoProps {
    id_emprestimo: number;
}

function DetalhesEmprestimo({ id_emprestimo }: DetalhesEmprestimoProps): JSX.Element {
    const [emprestimo, setEmprestimo] = useState<EmprestimoDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);
            try {
                const dados = await EmprestimoRequests.obterEmprestimoPorId(id_emprestimo);
                if (dados) setEmprestimo(dados);
                else setError("Empréstimo não encontrado.");
            } catch (err) {
                console.error("Erro ao carregar detalhes do empréstimo:", err);
                setError("Ocorreu um erro ao buscar as informações do empréstimo.");
            } finally {
                setLoading(false);
            }
        }
        buscarDados();
    }, [id_emprestimo]);

    if (loading) {
        return (
            <main className="flex-1 bg-gray-100 px-4 py-6 sm:px-6 sm:py-10">
                <div className="w-full max-w-4xl mx-auto">
                    <Card className="shadow-md rounded-xl">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <Skeleton shape="circle" size="3.5rem" />
                                <div className="flex-1">
                                    <Skeleton width="60%" height="1.5rem" className="mb-2" />
                                    <Skeleton width="40%" />
                                </div>
                            </div>
                            <Divider />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i}>
                                        <Skeleton width="30%" className="mb-2" />
                                        <Skeleton width="80%" height="1.25rem" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        );
    }

    if (error || !emprestimo) {
        return (
            <div className="flex justify-center items-center p-6">
                <Message severity="error" text={error || "Erro desconhecido."} />
            </div>
        );
    }

    const formatarData = (data: Date | null | undefined) => {
        if (!data) return "Não informado";
        return new Date(data).toLocaleDateString("pt-BR");
    };

    const getStatusSeverity = (status: string | undefined) => {
        switch (status?.toLowerCase()) {
            case "ativo":
            case "em andamento": return "info";
            case "devolvido":
            case "concluído": return "success";
            case "atrasado": return "danger";
            case "renovado": return "warning";
            default: return "secondary";
        }
    };

    return (
        <main className="flex-1 bg-gray-100 px-4 py-6 sm:px-6 sm:py-10 overflow-y-auto">
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
                <Card
                    title={
                        <span className="text-base sm:text-xl font-bold text-gray-800">
                            Empréstimo #{emprestimo.id_emprestimo}
                        </span>
                    }
                    className="shadow-md rounded-xl"
                >
                    <div className="flex flex-col gap-3">
                        {/* Status */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <span className="text-sm text-gray-500 font-medium">Status do Empréstimo</span>
                            <div className="flex flex-wrap gap-2">
                                <Tag
                                    value={emprestimo.status_emprestimo ?? "Não informado"}
                                    severity={getStatusSeverity(emprestimo.status_emprestimo)}
                                    className="text-xs px-3 py-1"
                                />
                                <Tag
                                    value={emprestimo.status_emprestimo_registro ? "Ativo" : "Inativo"}
                                    severity={emprestimo.status_emprestimo_registro ? "success" : "danger"}
                                    className="text-xs px-3 py-1"
                                />
                            </div>
                        </div>

                        <Divider className="my-1" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            {/* Aluno */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2">
                                    <i className="pi pi-user text-blue-500 text-sm"></i> Aluno
                                </h3>
                                <div className="flex flex-col gap-3 pl-3 border-l-2 border-blue-100">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Nome</span>
                                        <span className="text-sm text-gray-700 font-medium">
                                            {emprestimo.aluno.nome} {emprestimo.aluno.sobrenome}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">RA</span>
                                        <span className="text-sm text-gray-700 font-medium">{emprestimo.aluno.ra ?? "Não informado"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">E-mail</span>
                                        <span className="text-sm text-gray-700 font-medium break-all">{emprestimo.aluno.email ?? "Não informado"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Celular</span>
                                        <span className="text-sm text-gray-700 font-medium">{emprestimo.aluno.celular ?? "Não informado"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Livro */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2">
                                    <i className="pi pi-book text-orange-500 text-sm"></i> Livro
                                </h3>
                                <div className="flex flex-col gap-3 pl-3 border-l-2 border-orange-100">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Título</span>
                                        <span className="text-sm text-gray-700 font-medium">{emprestimo.livro.titulo ?? "Não informado"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Autor</span>
                                        <span className="text-sm text-gray-700 font-medium">{emprestimo.livro.autor ?? "Não informado"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Editora</span>
                                        <span className="text-sm text-gray-700 font-medium">{emprestimo.livro.editora ?? "Não informado"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">ISBN</span>
                                        <span className="text-sm text-gray-700 font-medium">{emprestimo.livro.isbn ?? "Não informado"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Datas */}
                            <div className="flex flex-col gap-3 sm:col-span-2">
                                <h3 className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2">
                                    <i className="pi pi-calendar text-green-500 text-sm"></i> Datas
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-3 border-l-2 border-green-100">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Data de Empréstimo</span>
                                        <span className="text-sm text-gray-700 font-medium">{formatarData(emprestimo.data_emprestimo)}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Data de Devolução</span>
                                        <span className="text-sm text-gray-700 font-medium">{formatarData(emprestimo.data_devolucao)}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Card>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        className="flex-1 bg-slate-700 hover:bg-slate-600 active:scale-95 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all shadow"
                        onClick={() => navigate(`/atualizar/emprestimo/${emprestimo.id_emprestimo}`)}
                    >
                        Editar Empréstimo
                    </button>
                    <button
                        className="flex-1 bg-white hover:bg-gray-100 active:scale-95 text-gray-800 border border-gray-300 px-4 py-3 rounded-lg font-semibold text-sm transition-all shadow"
                        onClick={() => navigate(`/lista/emprestimos`)}
                    >
                        Voltar
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .p-card { animation: fadeIn 0.4s ease-out; }
            `}</style>
        </main>
    );
}

export default DetalhesEmprestimo;