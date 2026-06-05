import { Link } from "react-router-dom";
import { IconMapPin, IconRoad, IconBulb, IconMessageChatbot, IconShield, IconDroplet, IconTrash, IconTree, IconDots} from "@tabler/icons-react";

const problemas = [
    { icone: <IconRoad size={22}/>, titulo: "Buracos", desc: "Vias danificadas" },
    { icone: <IconBulb size={22}/>, titulo: "Iluminação", desc: "Postes apagados" },
    { icone: <IconDroplet size={22}/>, titulo: "Vazamentos", desc: "Água e esgoto" },
    { icone: <IconTrash size={22}/>, titulo: "Lixo", desc: "Acúmulo irregular" },
    { icone: <IconTree size={22}/>, titulo: "Árvores", desc: "Quedas e riscos" },
    { icone: <IconDots size={22}/>, titulo: "Outros", desc: "Demais problemas" },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-center px-6">
            
            {/* badge */}
            <span className="bg-green-500/15 border border-green-500/30 text-green-400 text-sm px-4 py-1 rounded-full mb-8 flex">
                <IconMapPin size={18}/>Plataforma de zeladoria urbana
            </span>

            {/* título */}
            <h1 className="text-5xl text-slate-100 font-medium mb-4">
                Sua cidade merece <span className="text-green-400">cuidado</span>
            </h1>

            {/* descrição */}
            <p className="text-slate-400 text-2xl m-10">Registre problemas urbanos como buracos, postes apagados e vazamentos. Nosso chatbot inteligente cuida do resto</p>

            <Link to="/chat" className="flex items-center justify-center gap-2 p-2 w-full max-w-xs text-white border rounded-2xl m-2">
                <IconMessageChatbot/>Registrar ocorrência
            </Link>
            <Link to="/admin" className="flex items-center justify-center gap-2 p-2 w-full max-w-xs text-white border rounded-2xl m-2">
                <IconShield/>Painel administrativo
            </Link>

            <div className="grid grid-cols-3 gap-3 m-10 max-w-lg w-full">
                {problemas.map((element, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
                        <div className="text-green-400 mb-2">{element.icone}</div>
                        <p className="text-slate-200 text-sm font-medium">{element.titulo}</p>
                        <p className="text-slate-500 text-xs">{element.desc}</p>
                    </div>
                ))}
            </div>

            <div className="text-slate-400 flex gap-2">
                <div>Powered by AI Groq</div>
                <div>| Gratuito |</div>
                <div>Resposta rápida</div>
            </div>
        </div>
    );
}