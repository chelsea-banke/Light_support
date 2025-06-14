// components/AuthGuard.tsx
import React, { ReactNode } from 'react'
import { Redirect, Slot } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

type GuestGuardProp = {
    children: ReactNode;
};

export const GuestGuard: React.FC<GuestGuardProp> = ({ children }) => {
    const auth = useSelector((state: RootState) => state.auth) 
    if (auth.isAuthenticated) {
        return <Redirect href="/consumer" />
    }   
    return (
        <>{children}</>
    )
}