import type AlunoDTO from "../dto/AlunoDTO";

// Classe responsável por fazer requisições à API - aluno
class AlunoRequests {
    private serverURL;
    private endpointAluno;

    constructor() {
        this.serverURL = `http://localhost:3333`;
        this.endpointAluno = `/api/alunos`;
    }

    async obterListaDeAlunos() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointAluno}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const listaDeAlunos = await respostaAPI.json();
                return listaDeAlunos;
            } else {
                throw new Error("Não foi possível listar os alunos.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de alunos. ${error}`);
            return;
        }
    }
    async obterAlunoPorId(id_aluno: number): Promise<AlunoDTO | undefined> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointAluno}/${id_aluno}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const aluno: AlunoDTO = await respostaAPI.json();
                return aluno;
            } else {
                throw new Error("Não foi possível buscar o aluno.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de aluno por ID. ${error}`);
            return;
        }
    }

    
}

export default new AlunoRequests;