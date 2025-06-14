// components/AuthGuard.tsx
import React, { ReactNode } from 'react'
import { Redirect, Slot } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

type AuthGuardProps = {
    children: ReactNode;
};

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const auth = useSelector((state: RootState) => state.auth) 
    if (!auth.isAuthenticated) {
        return <Redirect href="/login" />
    }   
    return (
        <>{children}</>
    )
}