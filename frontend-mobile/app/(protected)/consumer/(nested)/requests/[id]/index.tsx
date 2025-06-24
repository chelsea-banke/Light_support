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
      createdAt: toDate(msg.createdDate), // Adjusting date format
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

  function toDate(value: string | any[]): Date | null {
    if (Array.isArray(value)) {
      // Expected format: [year, month, day, hour, minute, second, nanoseconds]
      if (value.length >= 6) {
        const [year, month, day, hour, minute, second, nanoseconds = 0] = value;
        return new Date( year, month - 1, day, hour, minute, second, Math.floor(nanoseconds / 1_000_000));
      } else {
        console.warn("Invalid array length for date parts");
        return null;
      }
    } else if (typeof value === "string") {
      // Handle high-precision ISO string (microseconds or nanoseconds)
      const trimmed = value.substring(0, 23); // Keep up to milliseconds
      const date = new Date(trimmed);
      return isNaN(date.getTime()) ? null : date;
    } else {
      console.warn("Unsupported date format");
      return null;
    }
  }


  useEffect(() => {
    fetchMessages()
    wsService.connectWebSocket(id, (msg) => {
      console.log('[WebSocket] Sent:', msg);
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
      messages={messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()).reverse()}
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