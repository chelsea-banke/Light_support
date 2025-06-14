import React, { useEffect, useState } from "react";
import Chat from "@codsod/react-native-chat";

type Message = {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
  };
};

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hey!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "CodSod",
        },
      },
      {
        _id: 2,
        text: "Hello CodSod",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "Vishal Chaturvedi",
        },
      },
    ]);
  }, []);

  const onSendMessage = (text: string) => {
    setMessages((prevMessages: any) => [
      {
        _id: prevMessages.length + 1,
        text,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "Vishu Chaturvedi",
        },
      },
      ...prevMessages,
    ]);
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
      // backgroundImage={
      //   "https://fastly.picsum.photos/id/54/3264/2176.jpg?hmac=blh020fMeJ5Ru0p-fmXUaOAeYnxpOPHnhJojpzPLN3g"
      // }
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

export default Home;