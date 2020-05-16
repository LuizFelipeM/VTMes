type Message = {
    header: string;
    payload: string | ArrayBufferTypes | unknown;
}

export default Message;