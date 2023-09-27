
import { io } from 'socket.io-client';
import { ref } from "vue";

export const socket = ref(null as any);

export function connectToSocket(ws: string = "ws://localhost:3000/") {
  return new Promise((resolve, reject) => {
    socket.value = io(ws);
    socket.value.on('connect', () => {
      resolve("Successfully connected to socket");
    });

    socket.value.on('connect_error', (error: any) => {
      reject(new Error(`Failed to connect: ${error}`));
    });
  });
}

export const disconnectFromChannel = (channelName: string) => {
  return new Promise((resolve, reject) => {
    if (!socket.value) {
      reject(new Error("Socket not initialized"));
      return;
    }

    // Emit an event to signal that you're leaving the channel
    socket.value.emit(channelName, { message: 'leave' });

    // Remove the event listener for this channel
    socket.value.off(channelName);

    resolve("Successfully disconnected from channel");
  });
};

// Expose function to send and receive messages
export const sendMessage = (channelName: String, action: string) => {

  const browserDetails = {
    userAgent: navigator.userAgent,
    platform: (navigator as any).userAgentData.platform,
    brands: (navigator as any).userAgentData.brands,
    language: navigator.language
  };

  return new Promise((resolve, reject) => {
    if (!socket.value) {
      reject(new Error("Socket not initialized"));
      return;
    }

    socket.value.emit(channelName, {action, ...browserDetails});
  });
};


