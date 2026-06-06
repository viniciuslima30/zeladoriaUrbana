import { useState, useRef } from "react";
import api from "../services/api.js";
import { Link } from "react-router-dom";
import { IconArrowLeft, IconPaperclip, IconSend } from "@tabler/icons-react";

export default function Chat() {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [ticketSalvo, setTicketSalvo] = useState(false);
    const imageUrlRef = useRef(null);

    // função sendMessage
    async function sendMessage() {
        if (!input.trim() || loading) return; // evita envio duplo
    try {
        const texto = input;
        setInput("");
        setMessages(prev => [...prev, { role: 'user', content: texto }]);
        setLoading(true);

        const res = await api.post('/api/chat', { message: texto, history: messages });
        const resposta = res.data.resposta;

        const match = resposta.match(/\{[\s\S]*"coletado"\s*:\s*true[\s\S]*\}/);
        if (match && !ticketSalvo) {
            const dados = JSON.parse(match[0]);
            delete dados.coletado;
            if (imageUrlRef.current) dados.image_url = imageUrlRef.current;
            await api.post('/api/tickets', dados);
            setTicketSalvo(true);
        }

        const respostaSemJson = resposta
            .replace(/\{[\s\S]*"coletado"\s*:\s*true[\s\S]*\}/, '')
            .trim();

        setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: respostaSemJson || 'Sua reclamação foi registrada com sucesso! Você receberá atualizações por email.' 
        }]);

    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
}

    // função handleUpload

    async function handleUpload(event) {
    const arquivo = event.target.files[0];
    const formData = new FormData();
    formData.append('image', arquivo);
    
    const res = await api.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data'}
    });
    
    const url = res.data.resposta;
    setImageUrl(url);
    imageUrlRef.current = url;

    // adiciona no histórico
    const msgImagem = '[IMAGEM ANEXADA COM SUCESSO - o usuário enviou uma foto do problema]';
    setMessages(prev => [...prev, { role: 'user', content: msgImagem }]);
    setLoading(true);

    // avisa a IA que a imagem foi enviada
    try {
        const chatRes = await api.post('/api/chat', {
            message: msgImagem,
            history: messages
        });
        const resposta = chatRes.data.resposta;
        setMessages(prev => [...prev, { role: 'assistant', content: resposta }]);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
}
    
    // return com o JSX

return (
        <div className="min-h-screen bg-[#0f172a] flex flex-col">

            {/* header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10">
                <Link to="/" className="text-slate-400 hover:text-white">
                    <IconArrowLeft size={20}/>
                </Link>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">Z</div>
                <div>
                    <p className="text-white text-sm font-medium">Zela</p>
                    <p className="text-green-400 text-xs">Online</p>
                </div>
            </div>

            {/* área de mensagens */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {messages.map((msg, i) => (
                    <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                        <span className={`inline-block px-4 py-2 rounded-2xl text-sm ${
                            msg.role === 'user'
                            ? 'bg-green-500 text-white'
                            : 'bg-white/10 text-slate-200'
                        }`}>
                            {msg.content}
                        </span>
                    </div>
                ))}
                {loading && <div className="text-slate-400 text-sm">Zela está digitando...</div>}
            </div>

            {/* input */}
            <div className="p-4 border-t border-white/10 flex gap-2 items-center">
                <label className="cursor-pointer text-slate-400 hover:text-white">
                    <IconPaperclip size={20}/>
                    <input type="file" accept="image/*" onChange={handleUpload} className="hidden"/>
                </label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm outline-none"
                />
                <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded-xl">
                    <IconSend size={18}/>
                </button>
            </div>
        </div>
    );
}