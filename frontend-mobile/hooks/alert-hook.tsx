// AlertContext.tsx
import AlertBox from '@/components/alert-box'
import React, { createContext, useContext, useState } from 'react'

const AlertContext = createContext<any>(null)

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [alertData, setAlertData] = useState({
        type: '',
        title: '',
        body: '',
        visibility: false,
        onClear: () => {}
    })

    const showAlert = (type: string, title: string, body: string, onClear: () => void) => {
        setAlertData({ type, title, body, visibility: true, onClear })
    }

    const hideAlert = () => {
        setAlertData(prev => ({ ...prev, visibility: false }))
    }

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <AlertBox type={alertData.type} visible={alertData.visibility} title={alertData.title} body={alertData.body} 
                onOk={()=>{
                    alertData.onClear()
                    hideAlert()
                }}
                onCancel={hideAlert}
                onDismiss={hideAlert}
            />
        </AlertContext.Provider>
    )
}

export const useGlobalAlert = () => useContext(AlertContext)
