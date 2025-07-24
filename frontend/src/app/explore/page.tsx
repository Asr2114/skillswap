'use client'

import{useEffect, useState, ChangeEvent} from 'react';
import {useAuth} from '@/context/AuthContext';


interface Skill {
  name: string;
  description?: string;
}

interface User{
    _id: string;
    name: string;
    bio: string;
    profilePic: string;
    teachSkills: Skill[];
    learnSkills: Skill[];
}

export default function ExplorePage() {
    const {user} = useAuth();
    const[users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);


    useEffect(()=>{
        if (!user) return;

        const fetchUsers = async()=>{
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);

                const data = await res.json();
                
                const normalized = data.map((u: any) => ({
                  ...u,
                  teachSkills: Array.isArray(u.teachSkills)
                    ? u.teachSkills.map((skill: any) =>
                        typeof skill === 'string'
                          ? { name: skill, description: "" }
                          : skill
                      )
                    : [],
                  learnSkills: Array.isArray(u.learnSkills)
                    ? u.learnSkills.map((skill: any) =>
                        typeof skill === 'string'
                          ? { name: skill, description: "" }
                          : skill
                      )
                    : [],
                }));
                
                const filtered = normalized.filter((u: User) => u._id !== user._id);
                setUsers(filtered);
                setFilteredUsers(filtered);

                    
            } catch(err){
                console.error("Failed to fetch users", err);
            }
        };
        fetchUsers();
    }, [user]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toLowerCase();
      setSearchTerm(value);

      const filtered = users.filter((u) =>
        u.teachSkills.some((s) => s.name.toLowerCase().includes(value)) ||
        u.learnSkills.some((s) => s.name.toLowerCase().includes(value)) ||
        u.name.toLowerCase().includes(value)
      );
      setFilteredUsers(filtered);
    };

    return(
        <main className='min-h-screen px-6 py-12 bg-white'>
            <h1 className='text-3xl font-bold mb-8 text-center'>
                Explore People
            </h1>

            <div className="mb-6 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search by skill or name..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {filteredUsers.map((u)=>(
                    <div key={u._id} className='border rounded-xl p-4 shadow hover: shadow-md transition'>
                        <div className='flex items-center gap-3 mb-3'>
                            <img src={u.profilePic ? u.profilePic : '/default-profile.png'} alt={u.name} className='w-12 h-12 rounded-full object-cover'/>
                            <div>
                                <h2 className='text-lg font-semibold'>{u.name}</h2>
                                <p className='text-sm text-gray-600'>{u.bio}</p>
                            </div>
                        </div>
                        <div className="text-sm mb-2">
                          <strong>Teaches:</strong>{" "}
                          {u.teachSkills.length > 0 ? (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {u.teachSkills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                                >
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          ) : (
                            "Not specified"
                          )}
                        </div>
                        <div className="text-sm mb-4">
                          <strong>Wants to learn:</strong>{" "}
                          {u.learnSkills.length > 0 ? (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {u.learnSkills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
                                >
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          ) : (
                            "Not specified"
                          )}
                        </div>

                        <button className='text-sm bg-black text-white px-3 py-1 rounded hover:bg-gray-800'>
                            View Profile
                        </button>
                        
                    </div>
                ))}
            </div>
            </main>
    )
}