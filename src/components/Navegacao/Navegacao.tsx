import { type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';

interface CustomMenuItem extends MenuItem {
    badge?: number;
    shortcut?: string;
    items?: CustomMenuItem[];
}

function Navegacao(): JSX.Element {
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
            url: "#"
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
            <p className="text-white content-center pr-[0.5rem]">Amy Elsner</p>
            <Avatar
                image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                shape="circle"
                className="mr-10 !w-[25%] !h-[25%]"
            />
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