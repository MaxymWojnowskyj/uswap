const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const uname = prompt('What is your username?')
appendMessage('You joined')
socket.emit('new-user', uname)

socket.on('chat-message', data => {
  appendMessage(`${data.uname}: ${data.message}`)
})

socket.on('user-connected', uname => {
  appendMessage(`${uname} connected`)
})

socket.on('user-disconnected', uname => {
  appendMessage(`${uname} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}