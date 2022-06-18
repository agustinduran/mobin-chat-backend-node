module.exports = (io) => {

    // 
    const chatSocket = io.of('/chat');
    chatSocket.on('connection', (socket) => {
        console.log('user connected to chat socket', socket.id);

        socket.on('new-message', (message) => {
            console.log('new-message', message);
            chatSocket.emit(`message/${message.id_chat}`, message);
        });
        
        socket.on('disconnect', () => {
            console.log('user disconnected from chat socket', socket.id);
        });
    });

}