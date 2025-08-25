import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faThLarge,
    faCommentDots,
    faLayerGroup,
    faCog,
    faSignOutAlt,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Outlet, useLocation, useNavigate, Navigate } from "react-router-dom";
import lightLogo from "../../../public/light-logo.png";
import { useDispatch, useSelector } from "react-redux";
import wsService from "../../services/ws-service";
import { logoutUser } from "../../redux/middleware/auth";

const User = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [activeIcon, setActiveIcon] = useState(location.pathname.split('/').pop() || 'dashboard');
    const authState = useSelector((state) => state.auth)
    const userState = useSelector((state) => state.user)

    useEffect(()=>{
        if(!authState.isAuthenticated) return
        console.log(userState.user);
        console.log("attempting user connect...");
        wsService.connectWebSocket({
            id: 'alerts',
            query: { userId: userState.user.matricule, role: 'AGENT' },
            onMessage: (msg) => {
                if (msg.type === 'ALERT') {
                    console.log("Alert received:", msg);
                    toast.info(msg.content, { position: toast.POSITION.TOP_RIGHT });
                }
            }
        });
        return () => wsService.disconnectWebSocket('alerts');
    })

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

    if (authState.isAuthenticated){
        return (
            <div>
                {/* Header */}
                <header className="bg-[#0d69a5] h-12 px-2 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <img src={lightLogo} alt="" className="w-8" /> {activeIcon.charAt(0).toUpperCase() + activeIcon.slice(1)}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="text-right">
                            <div>{userState.user.firstName} {userState.user.lastName}</div>
                            <div className="text-xs mt-[-5px]">{userState.user.matricule}</div>
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
                            <FontAwesomeIcon icon={faCog} className="text-white text-xl cursor-pointer" />.
                            <button onClick={()=>{dispatch(logoutUser())}}>
                                <FontAwesomeIcon icon={faSignOutAlt} className="text-[#0d69a5] text-xl cursor-pointer" />
                            </button>
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
    }
    else{
        return <Navigate to={"/"} />
    }
};

export default User;
