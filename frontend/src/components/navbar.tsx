'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import LogoutButton from './logout-button'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const { isLoggedIn, user } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-black text-white border-b border-zinc-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent animate-text-glow"
        >
          SkillSwap
        </Link>

        <div className="sm:hidden">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>

        <nav className="hidden sm:flex items-center gap-4 relative">
          {isLoggedIn || user ? (
            <>
              <Link href="/explore">
                <Button variant="ghost" className="hover:text-orange-400 transition-colors hover:scale-105">Explore</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" className="hover:text-orange-400 transition-colors hover:scale-105">Dashboard</Button>
              </Link>
              <Link href="/messages">
                <Button variant="ghost" className="relative group hover:text-orange-400 transition-colors hover:scale-105">
                  💬
                  <span className="absolute -top-1 -right-2 bg-red-600 text-xs text-white px-1 rounded-full group-hover:animate-bounce">3</span>
                </Button>
              </Link>

              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative hover:text-orange-400 transition-colors hover:scale-105"
                >
                  🔔
                  <span className="absolute -top-1 -right-2 bg-yellow-400 text-xs text-black px-1 rounded-full animate-pulse">!</span>
                </Button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-64 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg p-3 space-y-2 animate-fade-in z-50">
                    <p className="text-sm text-white font-semibold">🔔 New match found!</p>
                    <p className="text-sm text-white">💸 Payment received from John Doe</p>
                    <p className="text-sm text-white">📩 New message from Jane</p>
                  </div>
                )}
              </div>

              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/register">
                <Button variant="ghost" className="hover:text-orange-400 transition-colors hover:scale-105">Register</Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" className="hover:text-orange-400 transition-colors hover:scale-105">Login</Button>
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile menu (temporary dropdown on small screens) */}
      {showNotifications && (
        <div className="sm:hidden px-4 pb-4">
          <div className="space-y-2 bg-zinc-900 border border-zinc-700 rounded-lg p-4 mt-2">
            {isLoggedIn || user ? (
              <>
                <Link href="/explore" className="block text-white hover:text-orange-400">Explore</Link>
                <Link href="/dashboard" className="block text-white hover:text-orange-400">Dashboard</Link>
                <Link href="/messages" className="block text-white hover:text-orange-400">Messages</Link>
                <p className="text-white font-semibold mt-2">🔔 New match found!</p>
                <p className="text-white">💸 Payment received from John Doe</p>
                <p className="text-white">📩 New message from Jane</p>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/register" className="block text-white hover:text-orange-400">Register</Link>
                <Link href="/login" className="block text-white hover:text-orange-400">Login</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}