import { useEffect, useState } from "react";
import {
    where,
    query,
    addDoc,
    orderBy,
    Timestamp,
    collection,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase.config";
import SignOutButton from "./SignOutButton";

interface ChatProps {
    room: string;
    setIsAuth: (value: boolean) => void;
    setRoom: (value: string | null) => void;
}

type Message = {
    id: string;
    text: string;
    createdAt: Timestamp;
    user: string | null;
    room: string;
};

const Chat: React.FC<ChatProps> = ({ room, setIsAuth, setRoom }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");

    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            where("room", "==", room),
            orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            console.log("new message");

            const messages: Message[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                const message: Message = {
                    id: doc.id,
                    text: data.text || "",
                    createdAt: data.createdAt || serverTimestamp(),
                    user: data.user || null,
                    room: data.room || room,
                };
                messages.push(message);
            });

            setMessages(messages);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser?.displayName,
            room,
        });

        setNewMessage("");
    };

    return (
        <>
            <div className="flex flex-col h-screen bg-gray-100">
                <div className="p-4 bg-teal-700 text-white text-center">
                    <h1 className="text-2xl font-semibold relative">
                        {room.toUpperCase()}
                    </h1>
                    <div className="absolute right-2 -top-1">
                        <SignOutButton
                            setIsAuth={setIsAuth}
                            setRoom={setRoom}
                        />
                    </div>
                </div>
                <div className="flex-grow p-4 overflow-y-auto">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`${
                                message.user === auth.currentUser?.displayName
                                    ? "flex justify-end"
                                    : "flex justify-start"
                            } mb-2`}
                        >
                            <div
                                className={`${
                                    message.user ===
                                    auth.currentUser?.displayName
                                        ? "bg-teal-500 text-white rounded-lg self-end"
                                        : "bg-white text-black rounded-lg self-start"
                                } p-2 px-4 max-w-xs`}
                            >
                                <p className="font-thin text-xs">
                                    {message.user ===
                                    auth.currentUser?.displayName
                                        ? "You"
                                        : message.user}
                                </p>
                                <span>{message.text}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="p-4 flex items-center">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(event) => setNewMessage(event.target.value)}
                        className="flex-grow border rounded-full px-4 py-2 mr-2"
                        placeholder="Type your message here..."
                    />
                    <button
                        type="submit"
                        className="bg-teal-500 text-white rounded-full px-4 py-2"
                    >
                        Send
                    </button>
                </form>
            </div>
        </>
    );
};

export default Chat;
