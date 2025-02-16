
interface Message extends Document {
    content: string;
    createdAt: Date;
}

export interface ApiResponse {
    split(arg0: string): unknown;
    success: boolean;
    message: string;
    isAcceptingMessage?: boolean;
    messages?: Array<Message>;
}