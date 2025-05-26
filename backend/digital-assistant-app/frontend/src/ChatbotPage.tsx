import React from 'react';

export default function ChatbotPage() {
  const [messages, setMessages] = React.useState<{ text: string; from: 'user' | 'bot' }[]>([]);
  const [input, setInput] = React.useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, from: 'user' }]);
    const res = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages((msgs) => [...msgs, { text: data.response, from: 'bot' }]);
    setInput('');
  };

  return (
    <div>
      <h2>Чат-бот с ИИ</h2>
      <div style={{ minHeight: 200, border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.from === 'user' ? 'right' : 'left' }}>
            <b>{msg.from === 'user' ? 'Вы' : 'Бот'}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
}
