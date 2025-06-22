import React, { use, useEffect, useState } from "react";
import Chat from "@codsod/react-native-chat";
import { useLocalSearchParams } from "expo-router";
import messagingService from "@/services/messaging-service";
import wsService from "@/services/ws-service";
import bg from "@/assets/images/chat-wallpaper.jpg";

type Message = {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
  };
};

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { id } = useLocalSearchParams();

  const formatMessage = (msg: any) => {
    return {
      _id: msg.id,
      text: msg.content,
      createdAt: new Date(),
      user: {
        _id: msg.type === "sent" ? 1 : 2,
        name: "John Doe",
      },
    };
  }

  const fetchMessages = async () => {
    try {
      const msges = await messagingService.getMessages(id);
      setMessages(
        msges.map((msg: any) => {
          return formatMessage(msg);
        })
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages()
    wsService.connectWebSocket(id, (msg) => {
      setMessages((prev) => [
        ...prev,
        formatMessage(msg)
      ]);
    }, 
    (error) => {
      console.error("WebSocket error:", error);
    });
    return () => {
      wsService.disconnectWebSocket();
    };
  }, []);

  const onSendMessage = (text: string) => {
    wsService.sendMessage({
      "content": text,
      "chatId": id,
    })
  };

  return (
    <Chat
      messages={messages}
      setMessages={(val) => onSendMessage(val)}
      themeColor="#b6d900"
      themeTextColor="white"
      senderContainerColor="#cce8ff"
      senderMessageColor="gray"
      showSenderAvatar={false}
      showReceiverAvatar={true}
      inputBorderColor="#c2e600"
      user={{
        _id: 1,
        name: "Vishal Chaturvedi",
      }}
      backgroundColor="white"
      inputBackgroundColor="white"
      placeholder="Enter Your Message"
      placeholderColor="gray"
      // "https://fastly.picsum.photos/id/54/3264/2176.jpg?hmac=blh020fMeJ5Ru0p-fmXUaOAeYnxpOPHnhJojpzPLN3g"
      backgroundImage={bg}
      showEmoji={true}
      onPressEmoji={() => console.log("Emoji Button Pressed..")}
      showAttachment={true}
      onPressAttachment={() => console.log("Attachment Button Pressed..")}
      timeContainerColor="red"
      timeContainerTextColor="white"
      // onEndReached={() => alert("You have reached the end of the page")}
    />
  );
};

export default ChatScreen;