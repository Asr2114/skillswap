'use client'

import {useRouter} from 'next/navigation'
import {Button} from './ui/button'
import { useAuth } from '@/context/AuthContext'

export default function LogoutButton(){
    const {logout} = useAuth()
   

    return(
        <Button variant="destructive"onClick = {logout}>
            Logout
        </Button>
    )
}