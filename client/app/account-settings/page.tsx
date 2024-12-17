"use client";

import axios from "axios";
import { useRef, useState } from "react";

export default function ResetPassword() {
  const formRef = useRef<HTMLFormElement>(null);

  const [currentPassword, setCurrentPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [newPassword2, setNewPassword2] = useState<string>();

  const [resetPasswordError, setResetPasswordError] = useState<string>();
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<string>();
  const [deleteAccountError, setDeleteAccountError] = useState<string>();
  const [deleteAccountSuccess, setDeleteAccountSuccess] = useState<string>();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== newPassword2) {
      setResetPasswordError("New passwords do not match");
      setResetPasswordSuccess("");
      return;
    }

    try {
      const userId = localStorage.getItem("user_id");
      const response = await axios.post(
        "http://localhost:8080/api/reset-password",
        {
          userId,
          currentPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200) {
        setResetPasswordSuccess("Password reset successfully");
        setCurrentPassword("");
        setNewPassword("");
        setNewPassword2("");
        setResetPasswordError("");
        if (formRef.current) {
          formRef.current.reset();
        }
      }
    } catch (err: any) {
      setResetPasswordSuccess("");
      if (err.response) {
        setResetPasswordError(
          err.response.data.message || "Error resetting password"
        );
      } else {
        setResetPasswordError("Network Error");
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/api/users/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { userId },
        }
      );

      // const response = await fetch("", {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({ userId }),
      // });

      if (response.data.message) {
        localStorage.clear();
        window.location.href = "/login";
      } else {
        const errorData = response.data.error;
        setDeleteAccountError(errorData.message || "Error deleting account");
        setConfirmDelete(false);
      }
    } catch (err: any) {
      setDeleteAccountError("Network Error: Unable to delete account");
      setConfirmDelete(false);
    }
  };

  return (
    <div className="flex bg-gray-100 justify-center min-h-screen p-6">
      <div className="w-full max-w-6xl">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Reset Password Container */}
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4 self-start">
            <div className="border-b pb-3">
              <h1 className="text-xl font-bold text-gray-800">
                Reset Password
              </h1>
            </div>
            <form
              ref={formRef}
              className="space-y-4"
              onSubmit={handleResetPassword}
            >
              <div className="space-y-2">
                <label className="block text-gray-600 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-600 mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-600 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={(e) => setNewPassword2(e.target.value)}
                />
              </div>
              {resetPasswordError && (
                <p className="text-red-500 text-sm">{resetPasswordError}</p>
              )}
              {resetPasswordSuccess && (
                <p className="text-green-500 text-sm">{resetPasswordSuccess}</p>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Reset Password
              </button>
            </form>
          </div>

          {/* Delete Account Container */}
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4 self-start">
            <div className="border-b pb-3">
              <h1 className="text-xl font-bold text-red-600">Delete Account</h1>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                Deleting your account is a permanent action. All your data will
                be removed and cannot be recovered.
              </p>

              {!confirmDelete ? (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete Account
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md text-center">
                    <p className="text-yellow-800 font-semibold">
                      Are you sure you want to delete your account?
                    </p>
                    <p className="text-yellow-700 text-sm mt-1">
                      This action cannot be undone.
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                      Confirm Delete
                    </button>
                  </div>
                </div>
              )}

              {deleteAccountError && (
                <p className="text-red-500 text-sm text-center mt-2">
                  {deleteAccountError}
                </p>
              )}
              {deleteAccountSuccess && (
                <p className="text-green-500 text-sm text-center mt-2">
                  {deleteAccountSuccess}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
