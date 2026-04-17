import { useState, type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import AuthRequests from "../../fetch/AuthRequests";

interface CustomMenuItem extends MenuItem {
    badge?: number;
    shortcut?: string;
    items?: CustomMenuItem[];
}

function Navegacao(): JSX.Element {
    // criando estado para controlar a renderização condicional
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });

     const logout = () => {
        AuthRequests.removeToken();
        setIsAuthenticated(false);
    }

    const [username] = useState(() => {
        return localStorage.getItem('username') ?? '';
    });

    const items: CustomMenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            className: 'm-5 text-white text-lg',
            url: "/"
        },
        {
            label: 'Alunos',
            icon: 'pi pi-star',
            className: 'm-5 text-white text-lg',
            url: "/alunos"
        },
        {
            label: 'Livros',
            icon: 'pi pi-star',
            className: 'm-5 text-white text-lg',
            url: "/livros"
        },
        {
            label: 'Empréstimos',
            icon: 'pi pi-star',
            className: 'm-5 text-white text-lg',
            url: "/emprestimos"   
        }
    ];

    const start = (
        <img
            alt="logo"
            src='./src/assets/app-icon.png'
            height="100"
            className="h-20 p-3 ml-10 mr-5 h-[7rem]"
        />
    );

    const end = (
        <div className="flex align-items-center gap-2">
            {isAuthenticated ? (
                <>
                    <p className="text-white content-center pr-[0.5rem]">Olá, {username}</p>
                    <button
                        onClick={logout}
                        className="px-4 py-2 mr-10 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Sair
                    </button>
                </>
            ) : (
                <a
                    href="/login"
                    className="px-4 py-2 mr-10 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Login
                </a>
            )}
        </div>
    );

    return (
        <header className="card h-[12vh] bg-slate-700 content-center">
            <Menubar 
                model={isAuthenticated ? items : [items[0]]} 
                start={start} 
                end={end} 
            />
        </header>
    );
}

export default Navegacao;