import { serverURL } from "./ServerDomain";
import { ChatService } from "./api-client/chat/chat.service";
import { setBaseUrl } from 'nest-client'


setBaseUrl(serverURL)

export let chatService = new ChatService()