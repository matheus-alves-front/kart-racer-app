import Constants from "expo-constants"
import { io, Socket } from "socket.io-client";

const API_URL = Constants.expoConfig?.extra?.apiURL

export const socketIo: Socket = io(API_URL, {
  transports: ['websocket'], 
  rejectUnauthorized: false,
});

