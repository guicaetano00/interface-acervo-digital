// Classe responsável por fazer requisições à API - livro
import { SERVER_CFG } from "../AppConfig";
import type LivroDTO from "../dto/LivroDTO";

class LivroRequests {
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

    async obterListaDeLivros(): Promise<LivroDTO | undefined> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_LIVROS}`, {
                headers: this.getHeaders()
            });

            if (respostaAPI.ok) {
                const listaDeLivros: LivroDTO = await respostaAPI.json();
                return listaDeLivros;
            } else {
                throw new Error("Não foi possível listar os livros.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de livros. ${error}`);
            return;
        }
    }

    async enviarFormularioLivro(formLivro: LivroDTO): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_LIVROS}`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(formLivro)
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

    async removerLivro(id_livro: number): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_LIVROS}/${id_livro}`, {
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

    async obterLivroPorId(id_livro: number): Promise<LivroDTO | undefined> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_LIVROS}/${id_livro}`, {
                headers: this.getHeaders()
            });

            if (respostaAPI.ok) {
                const livro: LivroDTO = await respostaAPI.json();
                return livro;
            } else {
                throw new Error("Não foi possível buscar o livro.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de livro por ID. ${error}`);
            return;
        }
    }

    async atualizarLivro(id_livro: number, formLivro: LivroDTO): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_LIVROS}/${id_livro}`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(formLivro)
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

export default new LivroRequests;