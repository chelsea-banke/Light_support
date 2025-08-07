import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";

export const ChatComponent = () => {
    return (<>
        <div style={{ position: "relative" }} className="h-10/12">
            <div className="bg-[#1e2939] text-white rounded-t-md px-4 py-2 border-b flex items-center">
		    	<div className="w-8 h-8 rounded-full bg-gray-400 mr-3" />
		    	<div>
		    		<div className="text-sm font-semibold">John Doe</div>
		    		<div className="text-xs">xxxx-xxxx-xxxx</div>
		    	</div>
		    	<div className="ml-auto text-sm font-medium">XXXX-XXXX-XXXX</div>
		    </div>
            <MainContainer>
                <ChatContainer>
                <MessageList>
                    <Message
                        model={{
                            message: "Hello my friend",
                            sentTime: "just now",
                            sender: "Joe",
                        }}
                    />
                </MessageList>
                <MessageInput placeholder="Type message here" />
                </ChatContainer>
            </MainContainer>
        </div>
    </>)
}