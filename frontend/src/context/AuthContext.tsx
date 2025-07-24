'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import {useRouter} from 'next/navigation'

type AuthContextType={
    isLoggedIn: boolean;
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    login: (token: string, user: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children}: {children: ReactNode}){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<any>(null)
    const router = useRouter()

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')
        if (token) {
            setIsLoggedIn(true)
            if (userData) {
                const parsedUser = JSON.parse(userData);
                // Ensure _id is present for Google login users
                parsedUser._id = parsedUser._id || parsedUser.id;
                setUser(parsedUser);
            }
        }
    },[])

    const login = (token: string, user: any) => {
        const normalizedUser = {
            ...user,
            _id: user._id || user.id,
        };

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        document.cookie = `token=${token}; path=/; max-age=86400`;
        setIsLoggedIn(true);
        setUser(normalizedUser);
        router.push('/dashboard');
    };

    const logout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        document.cookie = 'token=; path=/; max-age=0'
        setIsLoggedIn(false)
        setUser(null)
        router.push('/login')
    }

    return(
        <AuthContext.Provider value={{isLoggedIn, user, setUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext)
    if(!context) throw new Error('useAuth must be used within an AuthProvider')
        return context
    
}