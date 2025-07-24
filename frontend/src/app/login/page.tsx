'use client'
import { useState, useEffect } from 'react'
import {Card} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import { Button } from '@/components/ui/button';
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'
import {jwtDecode} from 'jwt-decode';

export default function LoginPage(){

    const [form, setForm] = useState({email: '', password: ''})

    const [message, setMessage] = useState('')
    const router = useRouter();
    const { login } = useAuth();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            localStorage.setItem("token", token);
            try {
                const decodedUser = jwtDecode(token);
                login(token, decodedUser);
            } catch (err) {
                console.error("Failed to decode token from URL:", err);
            }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setForm({...form, [e.target.id]: e.target.value})

    }

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault()

        const apiUrl = process.env.NEXT_PUBLIC_API_URL

        try{
            const res = await fetch(`${apiUrl}/api/auth/login`, {
                method: "POST",
                headers : {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            })
            const data = await res.json()
            
            if(res.ok){
                login(data.token, data.user);
                console.log("User from backend" , data.user);
                
            } else{
                setMessage(data.message || data.error);
            }


        } catch(error){
            console.error("Fetch error:", error)
            setMessage('Could not connect to the Server.')
        }
    }



    return (
        <div className='min-h-screen flex items-center justify-center bg-muted px-4'>
            <Card className='w-full max-w-md p-8 shadow-md'>
                <h1 className = "text-2xl font-bold mb-6 text-center"> Login to your Account</h1>

                <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                        <Label htmlFor='email'> Email </Label>
                        <Input id='email' type='email' placeholder='you@example.com' value={form.email} onChange={handleChange}/>
                    </div>

                    <div>
                        <Label htmlFor='password'> Password</Label>
                        <Input id='password' type='password' placeholder='••••••••' value={form.password} onChange={handleChange}/>
                    </div>

                    <Button className='w-full'> Login </Button>


                </form>


                <p className='text-sm text-muted-foreground mt-4 text-center'>
                    Don't have an Account? {' '}
                    <Link href="/register" className='text-primary underline'>
                    Register</Link>
                </p>

                <button
                  onClick={() => (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`)}
                  className="mt-4 w-full flex items-center justify-center gap-3 border border-gray-300 bg-white text-black font-medium py-2 px-4 rounded-md shadow-sm hover:bg-gray-50 transition"
                >
                  <img src="/icongoogle.svg" alt="Google" className="w-5 h-5" />
                  Login with Google
                </button>
                <p className='text-center text-sm mt-4 text-destructive'>
                    {message}
                </p>
            </Card>
        </div>
    )
}