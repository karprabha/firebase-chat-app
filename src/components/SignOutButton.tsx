import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";

import { auth } from "../firebase.config";

const cookies = new Cookies();

interface SignOutButtonProps {
    setIsAuth: (value: boolean) => void;
    setRoom: (value: string | null) => void;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({
    setIsAuth,
    setRoom,
}) => {
    const signUserOut = async () => {
        await signOut(auth);
        cookies.remove("auth-token");
        setIsAuth(false);
        setRoom(null);
    };

    return (
        <button
            type="button"
            onClick={signUserOut}
            className="bg-blue-500 w-max hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md my-4 focus:outline-none focus:ring focus:ring-blue-400"
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;
