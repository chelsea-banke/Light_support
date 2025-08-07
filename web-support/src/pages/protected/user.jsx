import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faThLarge,
    faCommentDots,
    faLayerGroup,
    faCog,
    faSignOutAlt,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import lightLogo from "../../../public/light-logo.png";

const User = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [activeIcon, setActiveIcon] = useState(location.pathname.split('/').pop() || 'dashboard');

    const navItems = [
        {
            id: "dashboard",
            icon: faThLarge,
            customStyle: "text-white",
        },
        {
            id: "requests",
            icon: faCommentDots,
            customStyle: "text-white",
        },
        {
            id: "assets",
            icon: faLayerGroup,
            customStyle: "text-white",
        },
    ];

    const renderIcon = ({ id, icon, customStyle }) => {
        const isActive = id === activeIcon;
        return (
            <div
                key={id}
                onClick={() => {
                        setActiveIcon(id)
                        navigate(`/user/${id}`)
                    }
                }
                className={`relative p-1 rounded-lg cursor-pointer transition duration-200 ${isActive ? "bg-[#d1edff]" : "hover:bg-[#8fc092]"}`}>
                <FontAwesomeIcon icon={icon} className={`text-xl ${isActive ? "text-[#0d69a5]" : "text-white"}`} />
                <div className={`absolute bottom-[-8px] left-0 w-full py-[2px] rounded-full bg-[#0d69a5] ${isActive ? "block" : "hidden"}`}></div>
            </div>

        );
    };
    return (
        <div>
            {/* Header */}
            <header className="bg-[#0d69a5] h-12 px-2 flex items-center justify-between text-white">
                <div className="flex items-center gap-2 font-bold text-lg">
                    <img src={lightLogo} alt="" className="w-8" /> {activeIcon.charAt(0).toUpperCase() + activeIcon.slice(1)}
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <div className="text-right">
                        <div>John Doe</div>
                        <div className="text-xs mt-[-5px]">xxxx-xxxx-xxxx</div>
                    </div>
                    <FontAwesomeIcon icon={faUser} className="text-2xl" />
                </div>
            </header>
            <div className="flex h-[93vh] bg-[#d1edff]">
                {/* Sidebar */}
                <aside className="bg-[#a8ca38] w-12 flex flex-col justify-between py-4">
                    <div className="flex flex-col items-center gap-6 mt-4">
                        {navItems.map((item) => renderIcon(item))}
                    </div>
                    <div className="flex flex-col items-center gap-6 mb-4">
                        {/* Bottom Icons */}
                        <FontAwesomeIcon icon={faCog} className="text-white text-xl cursor-pointer" />
                        <FontAwesomeIcon icon={faSignOutAlt} className="text-[#0d69a5] text-xl cursor-pointer" />
                    </div>
                </aside>
                {/* Main content area */}
                <div className="flex-1 flex flex-col">
                    {/* Page Content */}
                    <main className="flex-1">
                        {/* Your content here */}
                        <Outlet/>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default User;
