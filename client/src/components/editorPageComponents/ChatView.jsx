import React, { useContext, useEffect, useState } from "react";
import { MessagesContext } from "../../context/Messages.context";
import InputBox from "../homePageComponents/InputBox";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { AtomIcon, UserIcon } from "lucide-react";

const ChatView = () => {
  const { message, setMessage } = useContext(MessagesContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const lastMessageObj = message[message.length - 1];
    const lastMessage = lastMessageObj?.message;
    const fetchMessage = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}/chat`, {
          prompt: lastMessage,
        });
        const message = response.data.response || response.data;
        setMessage((prev) => [...prev, { role: "ai", message }]);
      } catch (error) {
        console.error("Error fetching template:", error.message);
      } finally {
        setIsLoading(true);
      }
    };
    if (lastMessageObj?.role === "user") {
      fetchMessage();
    }
  }, [message]);

  return (
    <div className="bg-[#00000023] h-[99vh] border border-[#1dd9ff22] p-3 rounded-lg flex flex-col justify-between relative overflow-hidden">
      {}
      <div className="overflow-y-auto px-2 flex-1 flex flex-col gap-4 pr-3 w-full [&::-webkit-scrollbar]:hidden">
        {message.map((msg, i) => (
          <div
            key={i}
            className={`${
              msg.role === "ai" && "self-end w-full max-w-[80%]"
            } max-w-[70%] bg-[#242424] text-neutral-300 px-3 py-2 rounded-sm border border-[#27bbf614] text-sm`}
          >
            <p className="break-words line-clamp-4 leading-5">{msg.message}</p>
            <div className="flex items-center gap-2 mt-2 text-neutral-500 text-xs ">
              <div className="border-1 px-1 rounded-full border-[#02eef721] bg-[#00f7ff0a] text-[#00eeff]">
                {msg.role === "user" ? (
                  <UserIcon className="w-4" />
                ) : (
                  <AtomIcon className="w-4" />
                )}
              </div>
              {msg.role}
            </div>
          </div>
        ))}
      </div>

      {}
      <div className="mt-3">
        <InputBox size="large" />
      </div>
    </div>
  );
};

export default ChatView;
