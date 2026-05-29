'use client'

import { createContext, useContext } from 'react'

interface AuthModalContextType {
    openLogin: () => void
    openRegister: () => void
    openHome: () => void
    openAbout: () => void
    openContact: () => void
}

interface LandingAuthModalProps {
    children?: React.ReactNode
    value: AuthModalContextType
}

const AuthModalContext = createContext<AuthModalContextType | null>(null)

export function useLandingContext() {
    const context = useContext(AuthModalContext)
    if (!context) {
        throw new Error(
            'useLandingAuthModal must be used within LandingAuthModalProvider'
        )
    }

    return context
}

export default function LandingContextProvider({ children, value }: LandingAuthModalProps) {
    return (
        <AuthModalContext.Provider value={value}>
            {children}
        </AuthModalContext.Provider>
    )
}
