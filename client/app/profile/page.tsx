"use client"

import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { AuthContext } from "../authContext"
import { MdHeight } from "react-icons/md"
import Image from "next/image"
import { IoCreateOutline } from "react-icons/io5"
import LoadingSpinner from "../ui/loadingSpinner"
import { Event } from "../../../server/lib/definitions"

export default function Profile() {

    const { userId, isAuthenticated } = useContext(AuthContext)
    const params = useParams()
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [joinedEvents, setJoinedEvents] = useState();
    const [createdEvents, setCreatedEvents] = useState();
    const [error, setError] = useState<string | null>(null)
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (userId) {
            fetchUserData(userId)
        }
    }, [isAuthenticated, userId])

    const fetchUserData = async (userId: number) => {
        try {
            const token = localStorage.getItem('token')

            if (!token) {
                setError('User is not authenticated')
                return
            }

            const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            
            const data = await response.json()

            const userEventParams = new URLSearchParams({
                userID: userId?.toString() || "",
              }).toString();
            const [eventsResponse, usersResponse, joinedEventsResponse] =
            await Promise.all([
                axios.get(
                    `http://localhost:8080/api/events/search?${userEventParams}`
                  ),
                axios.get("http://localhost:8080/api/users"),
                axios.post("http://localhost:8080/api/user/events", { userId }),
            ]);

            const currentDate = new Date()
            const joinedEvents = joinedEventsResponse.data.joinedEvents.length;

            const joinedEventsCount = joinedEvents || 0
            const createdEventsCount = eventsResponse.data.events.length || 0
            setJoinedEvents(joinedEventsCount);
            setCreatedEvents(createdEventsCount);

            if (response.ok) {
                setUser(data.user)
                setFirstName(data.user.first_name)
                setLastName(data.user.last_name)
                setEmail(data.user.email)
            } else {
                setError(data.message)
            }
        } catch (error) {
            setError('Error fetching user data')
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setEmail(user.email)
    }

    const handleEdit = async () => {
        try {
            await axios.post('http://localhost:8080/api/users/edit', {userId, firstName, lastName, email})
            setFirstName(firstName)
            setLastName(lastName)
            setEmail(email)
            setUser(user)
            setIsEditing(false)
        } catch (error) {
            console.log('Cannot edit profile details', error)
        }
    }

    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex bg-gray-100 justify-center min-h-screen">
            <div className="px-5 py-5 w-full" style={{ maxWidth: '76rem', height: 'auto' }}>
                <div className="flex w-full border bg-white shadow-lg rounded-lg overflow-hidden">

                    {/*IMAGE*/}
                    <div className="hidden md:block md:w-2/3 xl:w-full">
                        <Image
                            src="/main-events.png"
                            alt="event with many balloons"
                            className="object-cover w-full h-full"
                            width={500}
                            height={500}
                        />
                    </div>

                    {/*PROFILE*/}
                    <div className="w-full flex flex-col py-5 px-5 gap-8">
                        <div className="border-b">
                            <h1 className="font-semibold text-lg border-b pb-4">Profile</h1>
                        </div>
                        {/*PROFILE PIC*/}
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden">
                                <Image
                                    src="/main-events.png"
                                    alt="Profile"
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{user.first_name} {user.last_name}</h2>
                                <p className="text-gray-500">{user.email}</p>
                            </div>
                        </div>

                        {/*EVENTS*/}
                        <div className="grid grid-cols-2 justify-center gap-2">
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <p className="text-gray-600">Created Events</p>
                                <p className="text-2xl font-bold">{createdEvents}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <p className="text-gray-600">Joined Events</p>
                                <p className="text-2xl font-bold">{joinedEvents}</p>
                            </div>
                        </div>

                        {/*PROFILE DETAILS*/}
                        <div className="flex flex-col gap-5">
                            <div className="space-y-2">
                                <label className="block text-gray-600 mb-2">First Name</label>
                                { !isEditing ? (
                                    <input 
                                        type="text" 
                                        value={firstName} 
                                        disabled 
                                        className="w-full p-2 border rounded-lg bg-gray-100"
                                    />
                                ) : (
                                    <input 
                                        type="text" 
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="block text-gray-600 mb-2">Last Name</label>
                                { !isEditing ? (
                                    <input 
                                        type="text" 
                                        value={lastName} 
                                        disabled 
                                        className="w-full p-2 border rounded-lg bg-gray-100"
                                    />
                                ) : (
                                    <input 
                                        type="text" 
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="block text-gray-600 mb-2">Email</label>
                                { !isEditing ? (
                                    <input 
                                        type="text" 
                                        value={email} 
                                        disabled 
                                        className="w-full p-2 border rounded-lg bg-gray-100"
                                    />
                                ) : (
                                    <input 
                                        type="text" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex">
                            { !isEditing ? (
                            <button
                                className="flex gap-2 items-center w-sm text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                                onClick={() => setIsEditing(true)}
                            >
                                <IoCreateOutline className="text-lg text-white"/>
                                Edit
                            </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        className="flex gap-2 items-center w-sm text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
                                        onClick={handleCancel}
                                    >
                                        <IoCreateOutline className="text-lg text-white"/>
                                        Cancel
                                    </button>
                                    <button
                                        className="flex gap-2 items-center w-sm text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                                        onClick={handleEdit}
                                    >
                                        <IoCreateOutline className="text-lg text-white"/>
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}
