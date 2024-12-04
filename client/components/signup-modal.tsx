'use client';

export default function SignUpModal({ setSignUpModalOpen, setLoginModalOpen }: { setSignUpModalOpen: (open: boolean) => void, setLoginModalOpen: (open: boolean) => void }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-5 z-50">
            <div className="bg-white p-6 shadow-lg w-96 flex flex-col gap-5">
                <div className="w-full flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-2">Sign Up</h2>
                    <p>
                        Already a member?{' '}
                        <button
                            onClick={() => {
                                setSignUpModalOpen(false);
                                setLoginModalOpen(true);
                            }}
                            className="text-blue-700 underline"
                        >
                            Log In
                        </button>
                    </p>
                </div>
                <form className="flex flex-col gap-2">
                    <div>
                        <h4 className="font-bold">Email</h4>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full mb-3 p-2 border rounded"
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">Password</h4>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full mb-3 p-2 border rounded"
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">Re-enter password</h4>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full mb-3 p-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                    >
                        Register
                    </button>
                </form>
                <button
                    onClick={() => setSignUpModalOpen(false)}
                    className="mt-4 text-red-600 underline"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
