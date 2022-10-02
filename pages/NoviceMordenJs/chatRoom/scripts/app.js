// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');

// class isntances 
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'shaun');

newChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)

})

// get chats and render
chatroom.getChats((data) => {
    chatUI.render(data);
})

