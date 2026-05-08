import { useState, type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import AuthRequests from "../../fetch/AuthRequests";
import appIcon from "../../assets/app-icon.png";

function Navegacao(): JSX.Element {

    const [visible, setVisible] = useState(false);

    const [isAuthenticated] = useState(() => {

        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');

        return !!(isAuth && token && AuthRequests.checkTokenExpiry());

    });

    const navigate = useNavigate();

    const nome = localStorage.getItem('nome') || 'Usuário';

    const email = localStorage.getItem('email') || '';

    const avatarImage =
        'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png';

    const items: MenuItem[] = [

        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/')
        },

        ...(isAuthenticated
            ? [
                {
                    label: 'Alunos',
                    icon: 'pi pi-users',
                    command: () => navigate('/lista/alunos')
                },

                {
                    label: 'Livros',
                    icon: 'pi pi-book',
                    command: () => navigate('/lista/livros')
                },

                {
                    label: 'Empréstimos',
                    icon: 'pi pi-list',
                    command: () => navigate('/lista/emprestimos')
                }

            ]
            : [])
    ];

    return (

        <>

            <header className="bg-slate-700 shadow-xl px-4 md:px-8 py-4 flex items-center justify-between">

                {/* LOGO */}
                <div className="flex items-center gap-4">

                    <img
                        src={appIcon}
                        alt="Logo"
                        className="h-10 md:h-12 w-auto"
                    />

                </div>

                {/* MENU DESKTOP */}
                <div className="hidden md:block">

                    <Menubar
                        model={items}
                        className="custom-menubar"
                    />

                </div>

                {/* USER ACTIONS DESKTOP */}
                <div className="hidden md:flex items-center gap-4">

                    {isAuthenticated ? (

                        <>

                            <div className="flex flex-col text-right">

                                <span className="text-white font-semibold text-sm">
                                    {nome}
                                </span>

                                <span className="text-slate-300 text-xs">
                                    {email}
                                </span>

                            </div>

                            <Avatar
                                image={avatarImage}
                                shape="circle"
                                className="!w-10 !h-10 border-2 border-white"
                            />

                            <button
                                className="bg-white text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-100 transition-all cursor-pointer"
                                onClick={AuthRequests.removeToken}
                            >
                                <i className="pi pi-sign-out mr-2"></i>
                                Sair
                            </button>

                        </>

                    ) : (

                        <button
                            className="bg-white text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-100 transition-all cursor-pointer"
                            onClick={() => navigate('/login')}
                        >
                            <i className="pi pi-sign-in mr-2"></i>
                            Login
                        </button>

                    )}

                </div>

                {/* HAMBURGER MOBILE */}
                <div className="md:hidden">

                    <Button
                        icon="pi pi-bars"
                        className="p-button-text text-white"
                        onClick={() => setVisible(true)}
                    />

                </div>

            </header>

            {/* SIDEBAR MOBILE */}
            <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                className="w-72 bg-slate-800"
            >

                <div className="flex flex-col gap-4 mt-6">

                    <div className="flex items-center gap-3 mb-6 border-b border-slate-600 pb-4">

                        <Avatar
                            image={avatarImage}
                            shape="circle"
                            className="!w-12 !h-12"
                        />

                        <div>

                            <p className="text-white font-semibold m-0">
                                {nome}
                            </p>

                            <p className="text-slate-300 text-sm m-0">
                                {email}
                            </p>

                        </div>

                    </div>

                    {items.map((item, index) => (

                        <button
                            key={index}
                            onClick={() => {
                                item.command?.({} as any);
                                setVisible(false);
                            }}
                            className="flex items-center gap-3 text-left bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-xl transition-all border-none cursor-pointer"
                        >

                            <i className={`${item.icon} text-lg`}></i>

                            <span className="font-medium text-base">
                                {item.label}
                            </span>

                        </button>

                    ))}

                    {isAuthenticated ? (

                        <button
                            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl transition-all border-none cursor-pointer font-semibold"
                            onClick={AuthRequests.removeToken}
                        >
                            <i className="pi pi-sign-out mr-2"></i>
                            Sair
                        </button>

                    ) : (

                        <button
                            className="mt-4 bg-white text-slate-700 px-4 py-3 rounded-xl transition-all border-none cursor-pointer font-semibold"
                            onClick={() => navigate('/login')}
                        >
                            <i className="pi pi-sign-in mr-2"></i>
                            Login
                        </button>

                    )}

                </div>

            </Sidebar>

        </>
    );
}

export default Navegacao;