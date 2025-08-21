// services/websocketService.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
    constructor() {
        this.client = null;
    }

    connect(chatId, onMessageReceived) {
        this.client = new Client({
            brokerURL: `ws://localhost:8080/api/ws`, // Direct WebSocket URL
            webSocketFactory: () => new SockJS(`http://localhost:8080/api/ws`), // SockJS fallback
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('✅ Connected to WebSocket');
                this.subscribeToChat(chatId, onMessageReceived);
            },
            onStompError: (frame) => {
                console.error('❌ STOMP Error:', frame.headers['message']);
                console.error('Details:', frame.body);
            },
        });

        this.client.activate();
    }

    subscribeToChat(chatId, onMessageReceived) {
        this.client.subscribe(`/topic/chat/${chatId}`, (message) => {
            if (message.body) {
                onMessageReceived(JSON.parse(message.body));
            }
        });
    }

    sendMessage(chatId, message) {
        if (this.client && this.client.connected) {
            this.client.publish({
                destination: `/app/chat/${chatId}`,
                body: JSON.stringify(message),
            });
        }
    }

    disconnect() {
        if (this.client) {
            this.client.deactivate();
            console.log('🔌 Disconnected from WebSocket');
        }
    }
}

export default new WebSocketService();
