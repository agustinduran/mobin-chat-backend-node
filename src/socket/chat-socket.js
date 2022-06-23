module.exports = (io) => {

    console.log('Socket');
    const chatSocket = io.of('/sockets/chat/');
    chatSocket.on('connection', (socket) => {
        console.log('user connected to chat socket', socket.id);

        socket.on('message', (message) => {
            console.log('message', message);
            chatSocket.emit(`message/${message.id_chat}`, message);
        });

        socket.on('writing', (data) => {
            console.log('User writing', data);
            chatSocket.emit(`writing/${data.id_chat}/${data.id_user}`, data);
        });

        socket.on('seen', (data) => {
            console.log('User seen', data);
            chatSocket.emit(`seen/${data.id_chat}`, data);
        });
        
        socket.on('disconnect', () => {
            console.log('user disconnected from chat socket', socket.id);
        });
    });

}