'use client';

export default function LoginModal({ setLoginModalOpen, setSignUpModalOpen }: { setLoginModalOpen: (open: boolean) => void, setSignUpModalOpen: (open: boolean) => void }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-5 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col gap-5">
                <div className="w-full flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-2">Log In</h2>
                    <p>
                        Not a member yet?{' '}
                        <button
                            onClick={() => {
                                setLoginModalOpen(false);
                                setSignUpModalOpen(true);
                            }}
                            className="text-blue-700 underline"
                        >
                            Sign Up
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
                    <button
                        type="submit"
                        className="bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                    >
                        Submit
                    </button>
                </form>
                <button
                    onClick={() => setLoginModalOpen(false)}
                    className="mt-4 text-red-600 underline"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
