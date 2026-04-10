import { type JSX, useState, useEffect } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Link, useLocation } from "react-router-dom";
import AuthRequests from "../../fetch/AuthRequests.js";

interface CustomMenuItem extends MenuItem {
    badge?: number;
    shortcut?: string;
    items?: CustomMenuItem[];
}

function Navegacao(): JSX.Element {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verifica se o usuário está autenticado
        const isAuth = localStorage.getItem('isAuth') === 'true';
        setIsAuthenticated(isAuth);
    }, [location]); // Atualiza quando a rota muda

    const handleLogout = () => {
        AuthRequests.removeToken();
    };

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
            url: "lista/alunos"
        },
        {
            label: 'Livros',
            icon: 'pi pi-star',
            className: 'm-5 text-white text-lg',
            url: "#"
        },
        {
            label: 'Empréstimos',
            icon: 'pi pi-star',
            className: 'm-5 text-white text-lg',
            url: "#"   
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
            {!isAuthenticated && location.pathname !== '/login' && (
                <Link
                    to="/login"
                    className="mr-8 rounded-md bg-white px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-100"
                >
                    Entrar
                </Link>
            )}
            {isAuthenticated && (
                <button
                    onClick={handleLogout}
                    className="mr-8 rounded-md bg-red-500 px-4 py-2 font-medium text-white transition-colors hover:bg-red-600"
                >
                    Sair
                </button>
            )}
        </div>
    );

    return (
        <header className="card h-[12vh] bg-slate-700 content-center">
            <Menubar 
                model={items} 
                start={start} 
                end={end} 
            />
        </header>
    );
}

export default Navegacao;