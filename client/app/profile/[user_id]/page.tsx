"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"

export default function Profile() {

    const params = useParams()
    const [user, setUser] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null)
    const userId = params.user_id
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserId = localStorage.getItem('user_id')
            setLoggedInUser(storedUserId)            
        }
    }, [])

    useEffect(() => {
        if (loggedInUser && userId && userId !== loggedInUser) {
            setError('You do not have permission to view this profile')
        }

        if (typeof userId === 'string') {
            fetchUserData(userId)
        }
    }, [loggedInUser, userId])

    const fetchUserData = async (userId: string) => {
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
            </div>
        </div>
    )
}