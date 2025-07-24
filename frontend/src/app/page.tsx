'use client'
import {Button} from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import {motion} from 'framer-motion'
import Particles from "react-tsparticles"

export default function Home(){
  const { isLoggedIn } = useAuth()

  return (
    <>
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center px-4 bg-white text-black overflow-hidden">
        <Particles
          options={{
            background: {
              color: {
                value: "#ffffff"
              }
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse"
                },
                resize: true
              },
              modes: {
                repulse: {
                  distance: 100,
                  duration: 0.4
                }
              }
            },
            particles: {
              color: {
                value: "#a78bfa"
              },
              links: {
                color: "#a78bfa",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1
              },
              collisions: {
                enable: false
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 1,
                straight: false
              },
              number: {
                density: {
                  enable: true,
                  area: 800
                },
                value: 50
              },
              opacity: {
                value: 0.3
              },
              shape: {
                type: "circle"
              },
              size: {
                random: true,
                value: 3
              }
            },
            detectRetina: true
          }}
          className="absolute inset-0 -z-10"
        />

        <motion.h1
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-center leading-tight mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent"
        >
          Empower Your Learning<br /> Through Real Skill Exchange
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground text-center max-w-2xl"
        >
          SkillSwap connects learners and mentors through a unique exchange platform. Share what you know, learn what you don't — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link href={isLoggedIn ? '/dashboard' : '/register'}>
            <Button size="lg" className="px-8 py-4 text-base md:text-lg">
              Get Started
            </Button>
          </Link>

          {!isLoggedIn && (
            <Link href="/login">
              <Button variant="outline" size="lg" className="px-8 py-4 text-base md:text-lg">
                Login
              </Button>
            </Link>
          )}
        </motion.div>

      </section>

      {/* Stats Section */}
      <section className="w-full bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h3 className="text-4xl font-bold text-primary">12k+</h3>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h3 className="text-4xl font-bold text-primary">8k+</h3>
            <p className="text-sm text-muted-foreground">Skills Shared</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <h3 className="text-4xl font-bold text-primary">4k+</h3>
            <p className="text-sm text-muted-foreground">Successful Matches</p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-white" id="features">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Makes SkillSwap Different
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature Card 1: Skill Exchange */}
            <div className="rounded-xl border bg-white p-6 shadow-md hover:shadow-xl transition duration-300">
              <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 17h16M10 7l-3-3m0 0l-3 3m3-3v10m10-7l3 3m0 0l3-3m-3 3V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Skill Exchange</h3>
              <p className="text-sm text-muted-foreground">
                Share your expertise in one area and learn from others in theirs — no fees, just growth.
              </p>
            </div>
            {/* Feature Card 2: Learn Anything */}
            <div className="rounded-xl border bg-white p-6 shadow-md hover:shadow-xl transition duration-300">
              <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5c-3.314 0-6.314-1.343-8.16-3.922L12 14z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn Anything</h3>
              <p className="text-sm text-muted-foreground">
                Pick up new skills from peers across fields — from tech to languages and more.
              </p>
            </div>
            {/* Feature Card 3: Community Driven */}
            <div className="rounded-xl border bg-white p-6 shadow-md hover:shadow-xl transition duration-300">
              <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M15 11a4 4 0 10-6 0 4 4 0 006 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                Built around trust, profiles, and feedback to foster real learning connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-gray-50" id="testimonials">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What People Are Saying</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border bg-white p-6 shadow-md">
              <p className="text-sm text-muted-foreground mb-4">"SkillSwap is such a refreshing way to learn — I taught video editing and learned French!"</p>
              <div className="text-sm font-semibold">Aarav Mehta</div>
              <div className="text-xs text-muted-foreground">Content Creator</div>
            </div>
            <div className="rounded-xl border bg-white p-6 shadow-md">
              <p className="text-sm text-muted-foreground mb-4">"I love how simple and community-driven it is. No fees, just knowledge." </p>
              <div className="text-sm font-semibold">Sneha Rathi</div>
              <div className="text-xs text-muted-foreground">UX Designer</div>
            </div>
            <div className="rounded-xl border bg-white p-6 shadow-md">
              <p className="text-sm text-muted-foreground mb-4">"From mentoring to getting mentored — this is the future of education."</p>
              <div className="text-sm font-semibold">Ravi Joshi</div>
              <div className="text-xs text-muted-foreground">Full-Stack Developer</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 bg-white" id="how-it-works">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How SkillSwap Works</h2>
          <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                <span className="text-lg font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Create Your Profile</h4>
              <p className="text-sm text-muted-foreground">Tell the community what you can teach or want to learn.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                <span className="text-lg font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Match & Connect</h4>
              <p className="text-sm text-muted-foreground">Get paired with people interested in what you offer.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                <span className="text-lg font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Learn & Grow</h4>
              <p className="text-sm text-muted-foreground">Exchange skills via sessions, chats, or video calls.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skill Categories Section */}
      <section className="w-full py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Explore Popular Skill Categories</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {["Programming", "Design", "Languages", "Music", "Marketing", "Fitness"].map((category, i) => (
              <motion.div
                key={category}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 cursor-pointer border hover:-translate-y-1 hover:scale-105 hover:rotate-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-primary">{category}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Banner Section */}
      <section className="w-full py-20 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-center px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
          >
            Fuel Your Passion with SkillSwap
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Whether you’re looking to learn, teach, or both — SkillSwap is your launchpad. Join a vibrant community where knowledge flows freely and growth is mutual.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href={isLoggedIn ? '/dashboard' : '/register'}>
              <Button size="lg" className="text-base md:text-lg px-8 py-4 bg-white text-pink-600 hover:bg-white/90 font-semibold rounded-full shadow-lg">
                Join the Movement 🚀
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

    

      {/* Footer Section */}
      <footer className="w-full bg-gray-100 border-t py-10 mt-16">
        <div className="max-w-6xl mx-auto px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="text-lg font-semibold mb-2">SkillSwap</h4>
            <p className="text-sm text-muted-foreground">Empowering peer-to-peer learning worldwide.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Platform</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="/register" className="hover:underline">Get Started</a></li>
              <li><a href="/login" className="hover:underline">Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Resources</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Contact Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Connect</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><a href="#" className="hover:underline">LinkedIn</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
        </div>
      </footer>
    </>
  )
}