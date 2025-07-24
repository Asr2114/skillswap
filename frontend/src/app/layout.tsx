import './globals.css'
import {Inter} from 'next/font/google'
import { cn } from '../lib/utils'
import Navbar from '../components/navbar'
import {AuthProvider} from '../context/AuthContext'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin']})

export const metadata = {
  title: 'SkillSwap',
  description: 'Find and exchange skils like a Pro',
  icons:{
    icon:'ssfavicon.png',
}
}
export default function RootLayout({children} : { children: React.ReactNode}){
  return(
    <html lang='en'>
      <body className= {cn(inter.className, "bg-background text-foreground")}>
        <AuthProvider>
        <Navbar/>
        {children}
        <Toaster richColors position='top-right'/>
        </AuthProvider>
      </body>
    </html>
  )
}