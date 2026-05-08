import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import AlunoRequests from "../../../fetch/AlunoRequests";
import type AlunoDTO from "../../../dto/AlunoDTO";
import { useNavigate } from "react-router-dom";

interface DetalhesAlunoProps {
    id_aluno: number;
}

function DetalhesAluno({ id_aluno }: DetalhesAlunoProps): JSX.Element {
    const [aluno, setAluno] = useState<AlunoDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);
            try {
                const dados = await AlunoRequests.obterAlunoPorId(id_aluno);
                if (dados) setAluno(dados);
                else setError("Aluno não encontrado.");
            } catch (err) {
                console.error("Erro ao carregar detalhes do aluno:", err);
                setError("Ocorreu um erro ao buscar as informações do aluno.");
            } finally {
                setLoading(false);
            }
        }
        buscarDados();
    }, [id_aluno]);

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

    if (error || !aluno) {
        return (
            <div className="flex justify-center items-center p-6">
                <Message severity="error" text={error || "Erro desconhecido."} />
            </div>
        );
    }

    return (
        <main className="flex-1 bg-gray-100 px-4 py-6 sm:px-6 sm:py-10 overflow-y-auto">
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
                <Card
                    title={
                        <span className="text-base sm:text-xl font-bold text-gray-800">
                            {aluno.nome} {aluno.sobrenome}
                        </span>
                    }
                    className="shadow-md rounded-xl"
                >
                    <div className="flex flex-col gap-3">
                        {/* RA */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <span className="text-sm text-gray-500 font-medium">Registro Acadêmico (RA)</span>
                            <Tag value={aluno.ra} severity="info" className="w-fit px-3 py-1 text-sm" />
                        </div>

                        <Divider className="my-1" />

                        {/* Grid de seções */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            {/* Informações Pessoais */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2">
                                    <i className="pi pi-user text-blue-500 text-sm"></i> Informações Pessoais
                                </h3>
                                <div className="flex flex-col gap-3 pl-3 border-l-2 border-blue-100">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Data de Nascimento</span>
                                        <span className="text-sm text-gray-700 font-medium">
                                            {new Date(aluno.data_nascimento).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">E-mail Acadêmico</span>
                                        <span className="text-sm text-gray-700 font-medium break-all">{aluno.email}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Status</span>
                                        <Tag
                                            value={aluno.status_aluno ? "Ativo" : "Inativo"}
                                            severity={aluno.status_aluno ? "success" : "danger"}
                                            className="w-fit mt-1 text-xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contato e Localização */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2">
                                    <i className="pi pi-map-marker text-orange-500 text-sm"></i> Contato e Localização
                                </h3>
                                <div className="flex flex-col gap-3 pl-3 border-l-2 border-orange-100">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Celular / Telefone</span>
                                        <span className="text-sm text-gray-700 font-medium">
                                            {aluno.celular || "Não informado"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Endereço</span>
                                        <span className="text-sm text-gray-700 font-medium leading-relaxed">{aluno.endereco}</span>
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
                        onClick={() => navigate(`/atualizar/aluno/${aluno.id_aluno}`)}
                    >
                        Editar Aluno
                    </button>
                    <button
                        className="flex-1 bg-white hover:bg-gray-100 active:scale-95 text-gray-800 border border-gray-300 px-4 py-3 rounded-lg font-semibold text-sm transition-all shadow"
                        onClick={() => navigate(`/lista/alunos`)}
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

export default DetalhesAluno;