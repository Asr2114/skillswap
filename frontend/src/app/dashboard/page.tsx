'use client'

import {Card} from '@/components/ui/card'
import {Pencil, Trash2} from 'lucide-react'

import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs'
import LogoutButton from '../../components/logout-button'
import {useState, useEffect} from 'react'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'

export default function Dashboard(){
  const [showModal, setShowModal]= useState(false)
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName]=useState('');
  const [skillType, setSkillType]=useState('Teaching');
  const [skillDescription, setSkillDescription] = useState('');
  const [experience, setExperience] = useState('');
  const predefinedSkills = ['Web Development', 'Graphic Design', 'Public Speaking', 'Python Programming', 'Excel', 'Video Editing'];
  const [isCustomSkill, setIsCustomSkill] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editSkillId, setEditSkillId] = useState<string | null>(null);

  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [isEditingProfilePic, setIsEditingProfilePic] = useState(false);
  const [editableAvailability, setEditableAvailability] = useState('');
  const [editableProfilePic, setEditableProfilePic] = useState('');
  const [isEditingLinkedIn, setIsEditingLinkedIn] = useState(false);
  const [editableLinkedIn, setEditableLinkedIn] = useState('');
  const [editableBio, setEditableBio] = useState('');
  const [editableName, setEditableName] = useState('');
  const [editableEmail, setEditableEmail] = useState('');
  
  const { user, setUser } = useAuth();

  // Set editable fields from user data on mount or when user changes
  useEffect(() => {
    if (user) {
      setEditableBio(user.bio || '');
      setEditableLinkedIn(user.linkedin || '');
      setEditableProfilePic(user.profilePic || '/default-profile.png');
      setEditableName(user.name || '');
      setEditableEmail(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchSkills = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/${user._id}`);
        const data = await res.json();
        setSkills(data);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };

    fetchSkills();
  }, [user]);
  
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/delete/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSkills(prev => prev.filter(skill => skill._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete skill", err);
    }
  };
  
    return(
        <main className='min-h-screen p-8 bg-muted'>
            <h1 className='text-3xl font-bold mb-6'> Welcome to Dashboard</h1>
            

            <Tabs defaultValue = 'overview' className='w-full'>
                <TabsList>
                    <TabsTrigger value = "overview"> Overview</TabsTrigger>
                    <TabsTrigger value = "profile"> Profile</TabsTrigger>
                    <TabsTrigger value = "settings"> Settings</TabsTrigger>
                    <LogoutButton/>   
                </TabsList>

                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {skills.map((skill, index)=>(
                      <Card key={index} className='p-6 relative'>
                        <button
                          className='absolute top-2 right-2 text-red-500 hover:text-red-700 transition'
                          onClick={() => handleDelete(skill._id)}
                          title="Delete Skill"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          className='absolute top-2 right-8 text-blue-500 hover:text-blue-700 transition'
                          onClick={() => {
                            setSkillName(skill.name);
                            setSkillType(skill.type);
                            setSkillDescription(skill.description);
                            setExperience(skill.experience);
                            setEditSkillId(skill._id);
                            setIsEditMode(true);
                            setShowModal(true);
                          }}
                          title="Edit Skill"
                        >
                          <Pencil size={18} />
                        </button>
                        <h3 className='text-lg font-semibold mb-2'>{skill.name}</h3>
                        <p className='text-sm text-muted-foreground'>
                          {skill.type} - {skill.experience || 'Experience not specified'}
                        </p>
                        <p className='text-sm mt-1'>{skill.description}</p>
                      </Card>
                    ))}
                  </div>
                  <div className='mt-6'>
                    <button onClick={()=>{
                      setIsEditMode(false);
                      setSkillName('');
                      setSkillType('Teaching');
                      setSkillDescription('');
                      setExperience('');
                      setIsCustomSkill(false);
                      setEditSkillId(null);
                      setShowModal(true);
                    }}
                    className='bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition'>
                      Add New Skill
                    </button>

                  </div>
                </TabsContent>
                <TabsContent value = 'profile'>
                  <Card className='p-8 mt-4 space-y-8 max-w-2xl mx-auto shadow-lg'>
                    <h2 className='text-2xl font-semibold mb-4'>Your Profile</h2>
                    {/* Profile Image Upload - Modern Fiverr/Freelancer style */}
                    <div className='flex items-center gap-6 mb-8'>
                      <div className='flex flex-col items-center'>
                        {editableProfilePic ? (
                          <img
                            src={editableProfilePic}
                            alt='Profile'
                            className='w-20 h-20 rounded-full object-cover border shadow'
                          />
                        ) : (
                          <div className='w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-3xl font-bold border shadow'>
                            ?
                          </div>
                        )}
                        {/* Skill stats below image preview */}
                        <div className='text-sm text-muted-foreground mt-2 text-center'>
                          {skills.filter(skill => skill.type === 'Teaching').length} skills to teach ·{' '}
                          {skills.filter(skill => skill.type === 'Learning').length} skills to learn
                        </div>
                        {/* Skill names breakdown */}
                        <div className='text-xs text-muted-foreground mt-1 text-center'>
                          <div>
                            <strong>Teaches:</strong> {skills.filter(skill => skill.type === 'Teaching').map(skill => skill.name).join(', ') || 'None'}
                          </div>
                          <div>
                            <strong>Wants to Learn:</strong> {skills.filter(skill => skill.type === 'Learning').map(skill => skill.name).join(', ') || 'None'}
                          </div>
                        </div>
                        {/* Preview label below image */}
                        <span className='mt-2 text-xs text-muted-foreground'>Preview</span>
                      </div>
                      <div className='flex flex-col gap-3 flex-1'>
                        <label className='block text-sm font-semibold mb-1'>Profile Photo</label>
                        <div className='flex items-center gap-3'>
                          <label className='bg-primary text-white px-4 py-2 text-sm rounded cursor-pointer w-max hover:bg-primary/90 transition'>
                            Upload
                            <input
                              type='file'
                              accept='image/*'
                              className='hidden'
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setEditableProfilePic(reader.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          {editableProfilePic && (
                            <button
                              className='ml-2 text-xs text-gray-500 hover:text-red-500 underline'
                              type='button'
                              onClick={() => setEditableProfilePic('')}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <span className='text-xs text-muted-foreground'>JPG, PNG, or GIF. Max 5MB.</span>
                      </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-sm font-medium mb-1'>Full Name</label>
                        <input
                          type='text'
                          value={editableName}
                          onChange={() => {}}
                          disabled
                          className='w-full border rounded px-3 py-2 text-sm bg-gray-100'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium mb-1'>Email</label>
                        <input
                          type='email'
                          value={editableEmail}
                          onChange={() => {}}
                          disabled
                          className='w-full border rounded px-3 py-2 text-sm bg-gray-100'
                        />
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium mb-1'>Bio</label>
                      <textarea
                        className='w-full border rounded px-3 py-2 text-sm'
                        placeholder='Tell us about yourself...'
                        rows={3}
                        value={editableBio}
                        onChange={(e) => setEditableBio(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium mb-1'>LinkedIn</label>
                      {isEditingLinkedIn ? (
                        <input
                          type='text'
                          value={editableLinkedIn}
                          onChange={(e) => setEditableLinkedIn(e.target.value)}
                          className='w-full border rounded px-3 py-2 text-sm'
                        />
                      ) : (
                        <div className='flex justify-between items-center bg-gray-100 rounded px-3 py-2 text-sm'>
                          <span>{editableLinkedIn || 'Not provided'}</span>
                          <button
                            className='text-blue-500 text-xs'
                            onClick={() => setIsEditingLinkedIn(true)}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                    {/* User skill stats pill */}
                    <div className='flex justify-end'>
                      <button
                        className='bg-primary text-white px-6 py-2 rounded text-sm shadow hover:bg-primary/90 transition'
                        onClick={async () => {
                          try {
                            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/update/${user?._id}`, {
                              method: 'PUT',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                      body: JSON.stringify({
                        _id: user?._id || user?.id,
                        name: editableName,
                        email: editableEmail,
                        bio: editableBio,
                        linkedin: editableLinkedIn,
                        profilePic: editableProfilePic,
                      }),
                            });

                            const result = await res.json();

                            if (res.ok) {
                              console.log("✅ Profile updated successfully", result);
                              toast.success("Profile updated successfully");
                              // Update local state so UI reflects changes immediately after reload
                              setEditableBio(result.bio);
                              setEditableLinkedIn(result.linkedin);
                              setEditableProfilePic(result.profilePic);
                              localStorage.setItem("user", JSON.stringify(result));
                              setUser(result);
                            } else {
                              console.error("❌ Failed to update profile", result);
                              toast.error(result.error || "Something went wrong while saving your profile.");
                            }
                          } catch (error) {
                            console.error("🚨 Error updating profile:", error);
                            toast.error("Network or server error while saving profile.");
                          }
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value = 'settings'>
                    <Card className='p-6 mt-4'> Settings content will appear here.</Card>
                </TabsContent>

            </Tabs>

            {showModal && (
              <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
                <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                  <h2 className='text-xl font-bold mb-4 '> {isEditMode ? 'Edit Skill' : 'Add New Skills'} </h2>
                  <form className='space-y-4'
                  onSubmit={async (e)=>{
                    e.preventDefault();

                    const method = isEditMode ? 'PUT' : 'POST';
                    const endpoint = isEditMode
                      ? `${process.env.NEXT_PUBLIC_API_URL}/api/skills/update/${editSkillId}`
                      : `${process.env.NEXT_PUBLIC_API_URL}/api/skills/add`;

                    const res = await fetch(endpoint, {
                      method,
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        userId: user?._id || user?.id,
                        name: skillName,
                        type: skillType,
                        description: skillDescription,
                        experience: experience,
                      }),
                    });

                    if (res.ok) {
                      const updatedSkill = await res.json();
                      if (isEditMode) {
                        setSkills((prev) =>
                          prev.map((skill) => (skill._id === editSkillId ? updatedSkill : skill))
                        );
                      } else {
                        setSkills((prev) => [...prev, updatedSkill]);
                      }

                      setSkillName('');
                      setSkillType('Teaching');
                      setSkillDescription('');
                      setExperience('');
                      setShowModal(false);
                      setIsCustomSkill(false);
                      setEditSkillId(null);
                      setIsEditMode(false);
                    } else {
                      console.error("Skill save failed");
                    }
                    
                    
                  }}>

                    <div>
                      <label className='block text-sm font-medium'>Skill Name</label>
                      <select
                        className='w-full border rounded px-3 py-2 text-sm'
                        value={skillName}
                        onChange={(e) => {
                          const selected = e.target.value;
                          if (selected === 'Other') {
                            setIsCustomSkill(true);
                            setSkillName('');
                          } else {
                            setIsCustomSkill(false);
                            setSkillName(selected);
                          }
                        }}
                      >
                        <option value="">Select a skill</option>
                        {predefinedSkills.map((skill) => (
                          <option key={skill} value={skill}>{skill}</option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {isCustomSkill && (
                      <div>
                        <label className='block text-sm font-medium mt-2'>Custom Skill Name</label>
                        <input
                          type='text'
                          className='w-full border rounded px-3 py-2 text-sm'
                          placeholder='Enter your skill name'
                          value={skillName}
                          onChange={(e) => setSkillName(e.target.value)}
                        />
                      </div>
                    )}

                    <div>
                      <label className='block text-sm font-medium'>
                        Type
                      </label>
                      <select className='w-full border rounded px-3 py-2 text-sm' value={skillType} onChange={(e)=> setSkillType(e.target.value)}>
                        <option>Teaching</option>
                        <option>Learning</option>
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium'>
                        Experience Level
                      </label>
                      <select className='w-full border rounded px-3 py-2 text-sm' value={experience} onChange={(e) => setExperience(e.target.value)}>
                        <option value="">Select experience</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium'>
                        Description
                      </label>
                      <textarea
                        className='w-full border rounded px-3 py-2 text-sm'
                        rows={3}
                        placeholder="E.g. I’ve been mentoring beginners in Python for over 2 years..."
                        value={skillDescription}
                        onChange={(e) => setSkillDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <div className='flex justify-end gap-2'>
                      <button
                      type='button'
                      className='text-sm text-gray-600 hover: underline'
                        onClick={()=>{
                          setShowModal(false);
                          setIsEditMode(false);
                          setIsCustomSkill(false);
                          setEditSkillId(null);
                        }}
                        >
                          Cancel

                      </button>

                      <button type='submit' className='bg-primary text-white px-4 py-2 rounded text-sm'>
                        Save
                      </button>
                    </div>


                  </form>

                </div>
              </div>
            )}
        </main>
    )
}
