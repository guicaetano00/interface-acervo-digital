// Classe responsável por fazer requisições à API - aluno
import { SERVER_CFG } from "../AppConfig";
import type AlunoDTO from "../dto/AlunoDTO";

class AlunoRequests {
    private getHeaders() {
        const token = localStorage.getItem('token');
        const headers: HeadersInit = { 
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['x-access-token'] = token;
        }
        return headers;
    }

    async obterListaDeAlunos(): Promise<AlunoDTO | undefined> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_ALUNOS}`, {
                headers: this.getHeaders()
            });

            if (respostaAPI.ok) {
                const listaDeAlunos: AlunoDTO = await respostaAPI.json();
                return listaDeAlunos;
            } else {
                throw new Error("Não foi possível listar os alunos.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de alunos. ${error}`);
            return;
        }
    }

    async enviarFormularioAluno(formAluno: AlunoDTO): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_ALUNOS}`, {
                method: 'POST',  
                headers: this.getHeaders(),
                body: JSON.stringify(formAluno)
            });

            if (!respostaAPI.ok) {
                throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            }

            console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);

            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }

    async removerAluno(id_aluno: number): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_ALUNOS}/${id_aluno}`, {
                method: 'DELETE',
                headers: this.getHeaders()
            });

            if (!respostaAPI.ok) {
                throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            }

            console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);

            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }

    async obterAlunoPorId(id_aluno: number): Promise<AlunoDTO | undefined> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_ALUNOS}/${id_aluno}`, {
                headers: this.getHeaders()
            });

            if (respostaAPI.ok) {
                const aluno: AlunoDTO = await respostaAPI.json();
                return aluno;
            } else {
                throw new Error("Não foi possível buscar o aluno.");
            }
        } catch (error) {
            console.error(`Erro ao fazer consulta de aluno por ID. ${error}`);
            return;
        }
    }

    async atualizarAluno(id_aluno: number, formAluno: AlunoDTO): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_ALUNOS}/${id_aluno}`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(formAluno)
            });

            if (!respostaAPI.ok) {
                throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            }

            console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);

            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }
}

export default new AlunoRequests;