// services/stompService.ts
import { Client } from '@stomp/stompjs'

let stompClient: Client | null = null

const connectStomp = () => {
    stompClient = new Client({
        brokerURL: 'ws://10.0.2.2:8080/api/ws', // Your Spring server WebSocket endpoint
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
            console.log('[STOMP] Connected')
            // Subscribe to topic/queue
            stompClient?.subscribe('/topic/messages', (message) => {
                console.log('[STOMP] Message received:', message.body);    
            })
        },
        onWebSocketError: (error)=>{
            console.log(error);
        },
        onStompError: (frame) => {
            console.error('[STOMP] Error:', frame.headers['message'])
        },
        onDisconnect: () => {
            console.log('[STOMP] Disconnected')
        },
    })
    // console.log(stompClient.webSocket);
    stompClient.activate()
    console.log(stompClient.connectHeaders);
    // console.log(stompClient.connected);
    
}

const sendMessage = (message: any) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: '/app/send', // your backend @MessageMapping endpoint
            body: JSON.stringify(message),
        })
    } else {
        console.warn('[STOMP] Cannot send, not connected')
    }
}

const disconnectStomp = () => {
    if (stompClient && stompClient.connected) {
        stompClient.deactivate()
        console.log('[STOMP] Disconnected')
    }
}

export default {
    connectStomp,
    sendMessage,
    disconnectStomp
}