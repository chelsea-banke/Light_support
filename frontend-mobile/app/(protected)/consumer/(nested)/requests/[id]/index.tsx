import React, { use, useEffect, useState } from "react";
import Chat from "@codsod/react-native-chat";
import { useLocalSearchParams } from "expo-router";
import messagingService from "@/services/messaging-service";
import wsService from "@/services/ws-service";
import bg from "../../../../../../assets/images/chat-wallpaper-2.jpg";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import faultService from "@/services/fault-service";

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
  const [fault, setFault] = useState<any>(null);
  const { id } = useLocalSearchParams();
  const normalizedId = Array.isArray(id) ? id[0] : id ?? "";
  const clientState = useSelector((states: RootState) => states.client);

  const formatMessage = (msg: any): Message => {
    const date = toDate(msg.createdDate);
    return {
      _id: msg.id,
      text: msg.content,
      createdAt:
        date instanceof Date && !isNaN(date.getTime()) ? date : new Date(),
      user: {
        _id: msg.source === "CLIENT" ? 1 : 2,
        name: "John Doe",
      },
    };
  };

  const fetchMessages = async () => {
    try {
      const msges = await messagingService.getMessages(normalizedId);
      setMessages(msges.map((msg: any) => formatMessage(msg)));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  function toDate(value: string | any[]): Date {
    
    if (Array.isArray(value)) {
      // Expected format: [year, month, day, hour, minute, second, nanoseconds]
      if (value.length >= 6) {
        const [year, month, day, hour, minute, second, nanoseconds = 0] = value;
        return new Date(
          year,
          month - 1,
          day,
          hour,
          minute,
          second,
          Math.floor(nanoseconds / 1_000_000)
        );
      } else {
        console.warn("Invalid array length for date parts");
        return new Date();
      }
    } else if (typeof value === "string") {
      const trimmed = value.substring(0, 23); // Keep up to ms
      const date = new Date(trimmed);
      return isNaN(date.getTime()) ? new Date() : date;
    } else {
      console.warn("Unsupported date format");
      return new Date();
    }
  }

  useEffect(() => {

    // First fetch existing messages
    fetchMessages();

    faultService.getFault(normalizedId)
      .then((res) => { 
        setFault((prev: any) => res);
      }
    );

    // Setup WebSocket
    wsService.connectWebSocket({
      id: `client-${normalizedId}`,
      query: {
        faultId: `client-${normalizedId}`,
        userId: clientState.client?.contact ?? "",
        role: "CLIENT",
      },
      onMessage: (msg: any) => {
        if (msg.type === "CHAT") {
          setMessages((prev) => [...prev, formatMessage(msg)]);
        }
      },
      onError: (err) => console.error("WebSocket error:", err),
    });

    return () => {
      wsService.disconnectWebSocket(`client-${normalizedId}`);
    };
  }, [normalizedId, clientState.client?.contact]);

  const onSendMessage = (text: string) => {
    wsService.sendMessage(
      fault.id ?? "",
      fault.clientId ?? "",
      fault.deskSupportId ?? "",
      text,
    );
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
      showReceiverAvatar={false}
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
      timeContainerColor="#0d6ca7"
      timeContainerTextColor="white"
      // onEndReached={() => alert("You have reached the end of the page")}
    />
  );
};

export default ChatScreen;