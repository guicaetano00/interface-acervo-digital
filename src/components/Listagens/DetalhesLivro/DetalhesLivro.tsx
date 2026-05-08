import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import LivroRequests from "../../../fetch/LivroRequests";
import type LivroDTO from "../../../dto/LivroDTO";
import { useNavigate } from "react-router-dom";

interface DetalhesLivroProps {
    id_livro: number;
}

function DetalhesLivro({ id_livro }: DetalhesLivroProps): JSX.Element {
    const [livro, setLivro] = useState<LivroDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);
            try {
                const dados = await LivroRequests.obterLivroPorId(id_livro);
                if (dados) setLivro(dados);
                else setError("Livro não encontrado.");
            } catch (err) {
                console.error("Erro ao carregar detalhes do livro:", err);
                setError("Ocorreu um erro ao buscar as informações do livro.");
            } finally {
                setLoading(false);
            }
        }
        buscarDados();
    }, [id_livro]);

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

    if (error || !livro) {
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
                            {livro.titulo}
                        </span>
                    }
                    className="shadow-md rounded-xl"
                >
                    <div className="flex flex-col gap-3">
                        {/* Status */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <span className="text-sm text-gray-500 font-medium">Status do Livro</span>
                            <div className="flex flex-wrap gap-2">
                                <Tag
                                    value={livro.status_livro ? "Ativo" : "Inativo"}
                                    severity={livro.status_livro ? "success" : "danger"}
                                    className="text-xs px-3 py-1"
                                />
                                {livro.status_livro_emprestado && (
                                    <Tag
                                        value={livro.status_livro_emprestado}
                                        severity="info"
                                        className="text-xs px-3 py-1"
                                    />
                                )}
                            </div>
                        </div>

                        <Divider className="my-1" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            {/* Informações Bibliográficas */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2">
                                    <i className="pi pi-book text-blue-500 text-sm"></i> Informações Bibliográficas
                                </h3>
                                <div className="flex flex-col gap-3 pl-3 border-l-2 border-blue-100">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Autor</span>
                                        <span className="text-sm text-gray-700 font-medium">{livro.autor}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Editora</span>
                                        <span className="text-sm text-gray-700 font-medium">{livro.editora}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Ano de Publicação</span>
                                        <span className="text-sm text-gray-700 font-medium">{livro.ano_publicacao}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">ISBN</span>
                                        <span className="text-sm text-gray-700 font-medium">{livro.isbn}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Acervo */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2">
                                    <i className="pi pi-warehouse text-orange-500 text-sm"></i> Acervo
                                </h3>
                                <div className="flex flex-col gap-3 pl-3 border-l-2 border-orange-100">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Quantidade Total</span>
                                        <span className="text-sm text-gray-700 font-medium">{livro.quant_total}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Quantidade Disponível</span>
                                        <span className="text-sm text-gray-700 font-medium">{livro.quant_disponivel}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Quantidade de Aquisição</span>
                                        <span className="text-sm text-gray-700 font-medium">{livro.quant_aquisicao}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Valor de Aquisição</span>
                                        <span className="text-sm text-gray-700 font-medium">
                                            {livro.valor_aquisicao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </span>
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
                        onClick={() => navigate(`/atualizar/livro/${livro.id_livro}`)}
                    >
                        Editar Livro
                    </button>
                    <button
                        className="flex-1 bg-white hover:bg-gray-100 active:scale-95 text-gray-800 border border-gray-300 px-4 py-3 rounded-lg font-semibold text-sm transition-all shadow"
                        onClick={() => navigate(`/lista/livros`)}
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

export default DetalhesLivro;