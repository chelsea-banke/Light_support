import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import wsService from "../../../../services/ws-service";
import faultService from "../../../../services/fault-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";

export const ChatComponent = ({ request, closeChatHandler }) => {

    const clientState = useSelector((state)=> state.client)
    const userState = useSelector((state)=> state.user)
    const faultState = useSelector((state)=> state.fault)
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(request === null) return;

        getMessages(request.id).then(res => {
            setMessages(res);
        })
        
        wsService.connectWebSocket({
            id: `support-${request.id}`,
            query: { faultId: `support-${request.id}`, userId: userState.user.matricule, role: 'AGENT' },
            onMessage: (msg) => {
                if (msg.type === 'CHAT' ) {
                    setMessages((prev)=>[...prev, msg])
                    toast.info(msg.content, { position: toast.POSITION.TOP_RIGHT });
                }
            }
        });

        return () => {
            wsService.disconnectWebSocket(`support-${request.id}`);
        };
    }, [request]);

    const getMessages = async (faultId) => {
        try{
            const response = await axiosInstance.get("/messages/get-all", { params: { faultId } })
            return response.data
        }
        catch{(error) => {
                if (error.response) {
                    console.error("Error response:", error.response.data);
                    throw new Error(error.response.data.message || "An error occurred while fetching messages.");
                } else if (error.request) {
                    console.error("Error request:", error.request);
                    throw new Error("No response received from the server.");
                } else {
                    console.error("Error message:", error.message);
                    throw new Error("An unexpected error occurred.");
                }
            }
        };
    };

    if(request === null) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">Select a request to start chatting</div>
            </div>
        );
    }
    
    return (<>
        <div style={{ position: "relative" }} className="h-10/12">
            <div className="bg-[#1e2939] text-white rounded-t-md px-4 py-2 border-b flex items-center">
                <div className="flex">
                    <button className="hover:cursor-pointer mr-2" onClick={()=>{closeChatHandler()}}>
                        <FontAwesomeIcon icon={'angles-left'} size="xl" />
				    </button>
                    <div className="w-8 h-8 rounded-full bg-gray-400 mr-3" />
                </div>
		    	<div>
		    		<div className="text-sm font-semibold">{clientState.client.firstName} {clientState.client.lastName}</div>
		    		<div className="text-xs">{clientState.client.id}</div>
		    	</div>
		    	<div className="ml-auto text-sm font-medium text-gray-200">{request.id}</div>
		    </div>
            <MainContainer>
                <ChatContainer style={{height: '75vh'}}>
                <MessageList>
                    {messages.map(msg => {
                        return(
                            <Message
                                model={{
                                    direction: (msg.source === "SUPPORT_AGENT" ? "outgoing" : "incoming"),
                                    message: msg.content,
                                    sentTime: "just now",
                                    sender: "Joe",
                                }}
                            />
                        )
                    })}
                </MessageList>
                <MessageInput placeholder="Type message here" onSend={(message) => {
                    wsService.sendMessage(faultState.fault.id, faultState.fault.clientId, faultState.fault.deskSupportId, message);
                }} />
                </ChatContainer>
            </MainContainer>
        </div>
    </>)
}