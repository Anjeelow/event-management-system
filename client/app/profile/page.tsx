"use client"

import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { AuthContext } from "../authContext"

export default function Profile() {

    const { userId, isAuthenticated } = useContext(AuthContext)
    const params = useParams()
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null)
    
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const storedUserId = localStorage.getItem('user_id')
    //         setLoggedInUser(storedUserId)            
    //     }
    // }, [])

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
        <div className="flex justify-center">
            <div className="w-full flex flex-col-reverse md:items-center gap-3 px-5 py-5 md:grid md:grid-cols-2" style={{maxWidth: '64rem'}}>
                <h1>{user.user_id}</h1>
                <h1>{user.first_name} {user.last_name}</h1>
                <h1>{user.email}</h1>
                <button onClick={handleResetPassword} className="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700">Reset password</button>
            </div>
        </div>
    )
}