"use client"

import axios from "axios"
import { useRef, useState } from "react"

export default function ResetPassword() {

    const formRef = useRef<HTMLFormElement>(null)

    const [currentPassword, setCurrentPassword] = useState<string>()
    const [newPassword, setNewPassword] = useState<string>()
    const [newPassword2, setNewPassword2] = useState<string>()
    const [error, setError] = useState<string>()
    const [success, setSuccess] = useState<string>()

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()

        if (newPassword !== newPassword2) {
            setError('New passwords do not match')
            setSuccess('')
            return
        }

        try {
            const userId = localStorage.getItem('user_id')
            const response = await axios.post('http://localhost:8080/api/reset-password', {
                userId,
                currentPassword,
                newPassword
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            })

            if (response.status === 200) {
                setSuccess('Password reset successfully')
                setCurrentPassword('')
                setNewPassword('')
                setNewPassword2('')
                setError('')
                if (formRef.current) {
                    formRef.current.reset()
                }
            }
        } catch (err: any) {
            setSuccess('')
            if (err.response) {
                setError(err.response.data.message || 'Error resetting password')
            } else {
                setError('Network Error')
            }
        }
    }

    return (
        <div>
            <form ref={formRef} className="flex flex-col gap-2" onSubmit={handleResetPassword}>
                <div>
                    <h4 className="font-bold">Current Password</h4>
                    <input
                        type="password"
                        name="email"
                        placeholder="Password"
                        className="w-full mb-3 p-2 border rounded"
                        required
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div>
                    <h4 className="font-bold">New Password</h4>
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        className="w-full mb-3 p-2 border rounded"
                        required
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <h4 className="font-bold">Retype Password</h4>
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        className="w-full mb-3 p-2 border rounded"
                        required
                        onChange={(e) => setNewPassword2(e.target.value)}
                    />
                </div>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
                <button
                    type="submit"
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
