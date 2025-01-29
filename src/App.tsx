import './App.css'
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState<string>("");
  const [messageReceived, setMessageReceived] = useState<string>("");

  useEffect(() => {
    socket.on("receie_message", (data) => {
      setMessageReceived(data.message);
    })
  }, [socket])

  const sendMessage = () => {
    socket.emit("send_message", {message})
  }

  return (
    <>
      <input placeholder='Message...' onChange={(e) => {setMessage(e.target.value)}}/>
      <button onClick={sendMessage}>Send Message</button>
      <h2>Messages:</h2>
      {messageReceived}
    </>
  )
}

export default App
