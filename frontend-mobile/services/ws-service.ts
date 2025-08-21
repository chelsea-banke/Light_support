// websocketService.ts
type MessageHandler = (data: any) => void;
type ErrorHandler = (e: any) => void;

interface WSConnection {
    socket: WebSocket;
    isConnected: boolean;
    heartbeatInterval: ReturnType<typeof setInterval> | null;
    reconnectTimeout: ReturnType<typeof setTimeout> | null;
}

export let wsBaseURL = 'ws://10.222.4.45:8080/api/ws'; // mutable outside Redux
export const setWSBaseUrl = (url: string) => {
  wsBaseURL = `ws://${url}:8080/api/ws`; // or use WSS if needed
};

interface WSConnectionParams {
    id: string; // unique key for this connection type, e.g. "alerts", "chat-fault123"
    query: Record<string, string>; // URL params like faultId, userId, role
    onMessage: MessageHandler;
    onError?: ErrorHandler;
}

const connections: Record<string, WSConnection> = {};

// --- Connect a WebSocket for a specific channel ---
const connectWebSocket = (params: WSConnectionParams) => {
    const { id, query, onMessage, onError } = params;

    // Prevent double connection for the same id
    if (connections[id]?.isConnected) {
        console.warn(`[WebSocket:${id}] Already connected`);
        return;
    }

    const queryString = new URLSearchParams(query).toString();
    console.log(queryString);
    
    const socket = new WebSocket(`${wsBaseURL}?${queryString}`);

    connections[id] = {
        socket,
        isConnected: false,
        heartbeatInterval: null,
        reconnectTimeout: null
    };

    socket.onopen = () => {
        connections[id].isConnected = true;
        console.log(`[WebSocket:${id}] Connected`);
        startHeartbeat(id);
    };

    socket.onmessage = (event) => {
        try {
            const message = JSON.parse(event.data);
            onMessage(message);
        } catch (error) {
            console.error(`[WebSocket:${id}] Error parsing message:`, event.data);
        }
    };

    socket.onerror = (e) => {
        console.error(`[WebSocket:${id}] Error event:`, e);
        onError?.(e);
    };

    socket.onclose = () => {
        console.warn(`[WebSocket:${id}] Disconnected`);
        stopHeartbeat(id);
        connections[id].isConnected = false;
        attemptReconnect(params);
    };
};

// --- Send a message on a specific connection ---
const sendMessage = (faultId: string, clientId: string, supportId: string, content: string) => {
    const conn = connections[`client-${faultId}`];
    if (conn && conn.isConnected) {
        conn.socket.send(JSON.stringify({
            type: "",
            content,
            supportId,
            clientId,
            faultId,
            source: "CLIENT"
        }));
    } else {
        console.warn(`[WebSocket:${faultId}] Not connected. Cannot send.`);
    }
};

// --- Disconnect a specific connection ---
const disconnectWebSocket = (id: string) => {
    const conn = connections[id];
    if (conn) {
        stopHeartbeat(id);
        conn.socket.close();
        if (conn.reconnectTimeout) clearTimeout(conn.reconnectTimeout);
        delete connections[id];
    }
};

// --- Heartbeat ---
const startHeartbeat = (id: string) => {
    stopHeartbeat(id);
    const conn = connections[id];
    conn.heartbeatInterval = setInterval(() => {
        if (conn.isConnected) {
            conn.socket.send(JSON.stringify({ type: 'PING' }));
        }
    }, 30000);
};

const stopHeartbeat = (id: string) => {
    const conn = connections[id];
    if (conn?.heartbeatInterval) clearInterval(conn.heartbeatInterval);
    if (conn) conn.heartbeatInterval = null;
};

// --- Auto-reconnect ---
const attemptReconnect = (params: WSConnectionParams) => {
    const { id } = params;
    const conn = connections[id];
    if (conn?.reconnectTimeout) clearTimeout(conn.reconnectTimeout);

    connections[id].reconnectTimeout = setTimeout(() => {
        console.log(`[WebSocket:${id}] Attempting reconnect...`);
        connectWebSocket(params);
    }, 5000);
};

export default {
    connectWebSocket,
    sendMessage,
    disconnectWebSocket
}