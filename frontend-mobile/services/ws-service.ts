let socket: WebSocket | null = null;
let isConnected = false;

type MessageHandler = (data: any) => void;

const connectWebSocket = (
    faultId: string,
    onMessage: MessageHandler,
    onError?: (e: any) => void
) => {
    socket = new WebSocket(`ws://10.0.2.2:8080/api/ws?faultId=${faultId}`);

    socket.onopen = () => {
        isConnected = true;
        console.log('[WebSocket] Connected');
    };

    socket.onmessage = (event) => {
        try {
            const message = JSON.parse(event.data);
            onMessage(message);
        } catch (error) {
            console.error('[WebSocket] Error parsing message:', event.data);
        }
    };

    socket.onerror = (e) => {
        console.error('[WebSocket] Error event:', e);
        onError?.(e);
    };

    socket.onclose = () => {
        isConnected = false;
        console.warn('[WebSocket] Disconnected');
    };
};

const sendMessage = (message: object) => {
    if (socket && isConnected) {
        socket.send(JSON.stringify(message));
    } else {
        console.warn('[WebSocket] Not connected. Cannot send.');
    }
};

const disconnectWebSocket = () => {
    socket?.close();
    socket = null;
    isConnected = false;
};

export default {
    connectWebSocket,
    sendMessage,
    disconnectWebSocket,
    isConnected: () => isConnected,
};