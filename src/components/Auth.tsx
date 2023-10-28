import Cookies from "universal-cookie";
import { logEvent } from "firebase/analytics";
import { signInWithPopup } from "firebase/auth";

import { auth, analytics, googleAuthProvider } from "../firebase.config";

const cookies = new Cookies();

interface AuthProps {
    setIsAuth: (value: boolean) => void;
}

const Auth: React.FC<AuthProps> = ({ setIsAuth }) => {
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
            logEvent(analytics, "sign_in_with_google");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white flex items-center justify-center flex-col p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <p className="text-gray-600 mb-4">
                    Welcome to our awesome chat app. Sign in to get started!
                </p>
                <img
                    src="https://jep-content.s3.ap-south-1.amazonaws.com/jio/svg/logo/jiochat.svg"
                    alt="Chat App Image"
                    className="rounded-lg h-40 text-center mb-4"
                />
                <button
                    onClick={signInWithGoogle}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md my-4 focus:outline-none focus:ring focus:ring-blue-400"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Auth;
