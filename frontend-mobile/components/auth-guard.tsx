// components/AuthGuard.tsx
import React, { ReactNode, useEffect } from 'react'
import { Redirect, Slot } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import wsService from '@/services/ws-service';

type AuthGuardProps = {
    children: ReactNode;
};

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const auth = useSelector((state: RootState) => state.auth) 
    const clientState = useSelector((state: RootState) => state.client);

    useEffect(()=>{
        if(!auth.isAuthenticated) return
        console.log("attempting user connect...");
        wsService.connectWebSocket({
            id: 'alerts',
            query: { userId: clientState.client?.contact ?? '', role: 'CLIENT' },
            onMessage: (msg) => {
                if (msg.type === 'ALERT') {
                    console.log('🔔 Alert received:', msg);
                }
            }
        });
        return () => wsService.disconnectWebSocket('alerts');
    })


    if (!auth.isAuthenticated) {
        return <Redirect href="/" />
    }
    return (
        <>{children}</>
    )
}