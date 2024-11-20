import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import menu from '../images/menu.png';
const SideBar = ({ isOpen, toggle }) => {
    const history = useNavigate();
    const onstudent = () => {
        history('/Emerald');
    }
    const onHome = () => {
        history('/Dashboard');
    }
    const onSp = () => {
        history('/Pearl');
    }
    const onSp1 = () => {
        history('/Ruby');
    }
     const onSp2 = () => {
        history('/Diamond');
    } 
    const onSp3 = () => {
        history('/Coral');
    }
    const onSp4 = () => {
        history('/Issues');
    }
    return (
        <div className="container bg">
            <div
                className={`bg-slate-50 w-64 min-h-screen p-6 fixed top-0 left-0 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <ul className="space-y-5 space-x-1 mt-4 mr-5">
                    <li>
                        <a onClick={onHome} className="home hover:bg-slate-100 p-2 rounded block shadow rounded">Sapphire</a>
                    </li>
                    <li>
                        <a onClick={onstudent} className="about hover:bg-slate-100 p-2 rounded block shadow rounded">Emerald</a>
                    </li>
                    <li>
                        <a onClick={onSp} className="hover:bg-slate-100 p-2 rounded block shadow rounded">Pearl</a>
                    </li>
                    <li>
                        <a onClick={onSp3} className="hover:bg-slate-100 p-2 rounded block shadow rounded">Coral</a>
                    </li><li>
                        <a onClick={onSp1} className="hover:bg-slate-100 p-2 rounded block shadow rounded">Ruby</a>
                    </li>
                    <li>
                        <a onClick={onSp2} className="hover:bg-slate-100 p-2 rounded block shadow rounded">Diamond</a>
                    </li>
                    <li>
                        <a onClick={onSp4} className="hover:bg-slate-100 p-2 rounded block shadow rounded">Issues</a>
                    </li>
                </ul>
            </div>
            <div className="sidebarbtn absolute top-0 left-0 cursor-pointer z-10" onClick={toggle}>
                <img src={menu} className='w-7 h-7 mx-2 mt-2' alt="" />
            </div>
        </div>
    )
}
export default SideBar;