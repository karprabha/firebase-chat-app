import Cookies from "universal-cookie";
import { useState, useRef } from "react";

import Auth from "./components/Auth";
import Chat from "./components/Chat";
import SignOutButton from "./components/SignOutButton";

const cookies = new Cookies();

const App = () => {
    const roomInputRef = useRef<HTMLInputElement>(null);
    const [room, setRoom] = useState<string | null>(null);
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

    if (!isAuth) return <Auth setIsAuth={setIsAuth} />;

    const handleEnterChat = () => {
        const room = roomInputRef.current?.value ?? null;
        setRoom(room);
    };

    return (
        <>
            {room ? (
                <Chat room={room} setIsAuth={setIsAuth} setRoom={setRoom} />
            ) : (
                <>
                    <div className="min-h-screen flex items-center justify-center bg-gray-100">
                        <div className="bg-white  p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">
                                Enter Room Name
                            </h2>
                            <form onSubmit={handleEnterChat}>
                                <input
                                    type="text"
                                    ref={roomInputRef}
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder="Room Name"
                                />

                                <div className="flex items-center gap-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 w-max hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md my-4 focus:outline-none focus:ring focus:ring-blue-400"
                                    >
                                        Enter Chat
                                    </button>
                                    <SignOutButton
                                        setIsAuth={setIsAuth}
                                        setRoom={setRoom}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default App;
