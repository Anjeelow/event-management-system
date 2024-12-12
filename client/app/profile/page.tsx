"use client"

import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { AuthContext } from "../authContext"
import { MdHeight } from "react-icons/md"
import Image from "next/image"

export default function Profile() {

    const { userId, isAuthenticated } = useContext(AuthContext)
    const params = useParams()
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null)

    useEffect(() => {
        if (!isAuthenticated) {
            setError('User is not authenticated')
            router.push('/')
        }

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
            if (response.ok) {
                setUser(data.user)
            } else {
                setError(data.message)
            }
        } catch (error) {
            setError('Error fetching user data')
        }
    }

    const handleResetPassword = () => {
        router.push('/reset-password')
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
                <div className="flex w-full border bg-white shadow-lg rounded-lg space-y-3 overflow-hidden">

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
                    <div className="w-full flex flex-col py-6 px-6 sm:px-16 gap-8">

                        {/*PROFILE PIC*/}
                        <div className="flex gap-5 items-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden">
                                <Image
                                    src="/main-events.png"
                                    alt="event with many balloons"
                                    width={250}
                                    height={250}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h1 className="text-xl font-medium">{user.first_name} {user.last_name}</h1>
                                <h1 className="text-gray-600">{user.email}</h1>
                            </div>
                        </div>

                        {/*EVENTS*/}
                        <div className="grid grid-cols-2 justify-center gap-2">
                            <div className="border shadow-sm rounded-lg px-2 flex flex-col items-center">
                                <h1 className="text-gray-600">Created Events</h1>
                                <p>60</p>
                            </div>
                            <div className="border shadow-sm rounded-lg px-2 flex flex-col items-center">
                                <h1 className="text-gray-600">Joined Events</h1>
                                <p>60</p>
                            </div>  
                        </div>

                        {/*PROFILE DETAILS*/}
                        <div className="flex flex-col gap-10">
                            <div className="grid grid-cols-2 gap-10">
                                <div className="border-b">
                                    <h1 className="text-gray-600">First Name</h1>
                                    <p>{user.first_name}</p>
                                </div>
                                <div className="border-b">
                                    <h1 className="text-gray-600">Last Name</h1>
                                    <p>{user.last_name}</p>
                                </div>
                            </div>
                            <div className="grid">
                                <div className="border-b">
                                    <h1 className="text-gray-600">E-mail Address</h1>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleResetPassword}
                                className="w-sm text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Reset password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}
