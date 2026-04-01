import { useState, FormEvent, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'bot';
  content: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "👋 Bonjour ! Je suis l'agent IA d'Ahmed. Je connais parfaitement ses compétences et les projets qu'il a réalisés. Que souhaitez-vous savoir ?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Pour scroller automatiquement vers le bas à chaque nouveau message
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://portfolio-ia-fullstack.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', content: "⚠️ Erreur de connexion avec le serveur d'Ahmed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
      {/* En-tête du CV */}
      <header className="bg-white shadow-sm rounded-2xl p-6 mb-4 flex items-center justify-between border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ahmed HADI GONI BOULAMA</h1>
          <p className="text-indigo-600 font-medium">Etudiant Ingénieur Data & Full Stack</p>
        </div>
        <div className="hidden sm:flex space-x-2">
          <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">Python</span>
          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">FastAPI</span>
          <span className="bg-cyan-100 text-cyan-800 text-xs px-3 py-1 rounded-full font-semibold">React</span>
          <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-semibold">TypeScript</span>
          <span className="bg-cyan-100 text-cyan-800 text-xs px-3 py-1 rounded-full font-semibold">CI/CD</span>
          <span className="bg-cyan-100 text-cyan-800 text-xs px-3 py-1 rounded-full font-semibold">Machine Learning</span>
        </div>
      </header>

      {/* Zone de Chat */}
      <main className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50/50">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-500 border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex space-x-2 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Zone de saisie */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={sendMessage} className="flex gap-3">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: Raconte-moi ton projet sur Databricks..." 
              className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              Envoyer
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default App