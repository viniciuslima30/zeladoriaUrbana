import { useState, useEffect } from "react";
import api from "../services/api.js";
import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

export default function Admin() {

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [autenticado, setAutenticado] = useState(false);
    const [senha, setSenha] = useState('');

    async function fetchTickets() {
            const res = await api.get('/api/tickets');
            setTickets(res.data.resposta);
        }

        useEffect(() => {
            fetchTickets();
        }, [])

        async function updateStatus(id, status) {
            await api.patch(`/api/tickets/${id}`, { status });
            fetchTickets();
    }

    async function deleteTicket(id) {
        await api.delete(`/api/tickets/${id}`);
        fetchTickets();
    }

    const total = tickets.length;
    const abertos = tickets.filter(t => t.status === 'aberto').length;
    const emAndamento = tickets.filter(t => t.status === 'em_andamento').length;
    const resolvidos = tickets.filter(t => t.status === 'resolvido').length;

    function login() {
        if (senha === 'admin123') {
            setAutenticado(true);
        } else {
            setSenha('');
            alert('Senha incorreta');
        }
    }

    if (!autenticado) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col gap-4 w-80">
                    <div className="flex items-center gap-2 mb-2">
                        <Link to="/" className="text-slate-400 hover:text-white">
                            <IconArrowLeft size={18}/>
                        </Link>
                        <h1 className="text-white text-xl font-medium">Acesso Admin</h1>
                    </div>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && login()}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm outline-none"
                    />
                    <button onClick={login} className="bg-green-500 text-white py-2 rounded-xl text-sm">
                        Entrar
                    </button>
                </div>
            </div>
        );
    }

   

    return (        
        <div className="min-h-screen bg-[#0f172a] p-6">

            <div className="flex items-center justify-between mb-6">
                <Link to="/" className="text-slate-400 hover:text-white">
                    <IconArrowLeft size={20}/>
                </Link>
                <h1 className="text-white text-2xl font-medium">Painel Administrativo</h1>
                <span className="text-slate-400 text-sm">{tickets.length} chamados</span>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-slate-400 text-xs mb-1">Total</p>
                    <p className="text-white text-2xl font-medium">{total}</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <p className="text-red-400 text-xs mb-1">Abertos</p>
                    <p className="text-red-400 text-2xl font-medium">{abertos}</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                    <p className="text-yellow-400 text-xs mb-1">Em andamento</p>
                    <p className="text-yellow-400 text-2xl font-medium">{emAndamento}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <p className="text-green-400 text-xs mb-1">Resolvidos</p>
                    <p className="text-green-400 text-2xl font-medium">{resolvidos}</p>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {tickets.map((ticket, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">

                        <div className="flex items-center justify-between mb-2">
                            <p className="text-white font-medium">{ticket.user_name}</p>
                            <span className={`text-xs px-3 py-1 rounded-full ${
                                ticket.status === 'aberto' ? 'bg-red-500/20 text-red-400' :
                                ticket.status === 'em_andamento' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-green-500/20 text-green-400'
                            }`}>
                                {ticket.status}
                            </span>
                        </div>

                        {ticket.status === 'resolvido' && (
                            <button 
                                onClick={() => deleteTicket(ticket.id)} 
                                className="text-xs px-3 py-1 rounded-lg border border-red-500/30 text-red-400 hover:text-red-300 mb-2"
                            >
                                Deletar chamado
                            </button>
                        )}

                        <p className="text-slate-300 text-sm mb-3">{ticket.description}</p>

                        <div className="flex gap-4 text-xs text-slate-500 mb-3">
                            <span>{ticket.category}</span>
                            <span>{ticket.user_phone}</span>
                            <span>{ticket.user_email}</span>
                            <span>{ticket.id}</span>
                            <span>{new Date(ticket.created_at).toLocaleDateString('pt-BR')}</span>
                        </div>

                        {ticket.image_url ? (
                            <a href={ticket.image_url} target="_blank" rel="noreferrer">
                                <img src={ticket.image_url} className="w-40 h-40 object-cover rounded-lg mb-3 cursor-pointer hover:opacity-80"/>
                            </a>
                                ) : (
                            <p className="text-white text-xs mb-3 ">Sem foto</p>
                        )}

                        <div className="flex gap-2">
                            <button onClick={() => updateStatus(ticket.id, 'aberto')} className="text-xs px-3 py-1 rounded-lg border border-white/10 text-slate-400 hover:text-white">Aberto</button>
                            <button onClick={() => updateStatus(ticket.id, 'em_andamento')} className="text-xs px-3 py-1 rounded-lg border border-white/10 text-slate-400 hover:text-white">Em andamento</button>
                            <button onClick={() => updateStatus(ticket.id, 'resolvido')} className="text-xs px-3 py-1 rounded-lg border border-white/10 text-slate-400 hover:text-white">Resolvido</button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}