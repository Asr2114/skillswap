'use client'
import { useState } from 'react'
import {Card} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import { Button } from '@/components/ui/button';

import Link from 'next/link'

export default function RegisterPage(){

    const [form, setForm] = useState({name: '', email:'', password: ''})

    const [message, setMessage] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setForm({...form, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

        try {
            const res = await fetch(`${apiUrl}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })

            const data = await res.json()
            setMessage(data.message || data.error)
        } catch (error) {
            console.error('Fetch error:', error)
            setMessage('Could not connect to the server.')
        }
    }



    return(
        <div className='min-h-screen flex items-center justify-center bg-muted px-4'>
            <Card className='w-full max-w-md p-8 shadow-md'>
                <h1 className='text-2xl font-bold mb-6 text-center'>Create your Account</h1>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <Label htmlFor='name'> Full Name</Label>
                        <Input id="name" type="text" placeholder='Abhishek' value={form.name} onChange={handleChange}/>
                    </div>

                    <div>
                        <Label htmlFor='email'> Email </Label>
                        <Input id='email' type='email' placeholder='you@example.com' value= {form.email} onChange={handleChange}/>
                    </div>

                    <div>
                        <Label htmlFor='password'> Password</Label>
                        <Input id='password' type='password' placeholder='••••••••' value = {form.password} onChange = {handleChange}/>
                    </div>

                    <Button  type="submit" className='w-full'> Sign Up </Button>
                </form>

                <p className='text-sm text-muted-foreground mt-4 text-center'>
                    Already have an Account?{' '}
                    <Link href='/login' className='text-primary underline'>
                    Login
                    </Link>
                </p>

                <button
                  onClick={() => (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`)}
                  className="mt-4 w-full flex items-center justify-center gap-3 border border-gray-300 bg-white text-black font-medium py-2 px-4 rounded-md shadow-sm hover:bg-gray-50 transition"
                >
                  <img src="/icongoogle.svg" alt="Google" className="w-5 h-5" />
                  Sign Up with Google
                </button>

                <p className='text-center text-sm mt-4 text-destructive'>
                    {message}
                </p>
            </Card>
        </div>
    )
}
