# 🏙️ Zeladoria Urbana

Plataforma web de zeladoria urbana onde cidadãos podem registrar problemas urbanos através de um chatbot inteligente disponível 24/7. O sistema coleta as informações do cidadão, registra o chamado e notifica o usuário por email quando o status é atualizado.

## Funcionalidades

- **Landing page** apresentando a plataforma e os tipos de problemas aceitos
- **Chatbot inteligente** com a assistente virtual Zela, powered by Groq AI, que conduz o cidadão pelo processo de registro de forma conversacional
- **Coleta de dados** via chat: nome, telefone, email e descrição do problema
- **Upload de imagem** para anexar foto do problema reportado
- **Geração automática de protocolo** para cada chamado registrado
- **Classificação automática** do problema por categoria via IA (buraco, poste, lixo, vazamento, árvore)
- **Painel administrativo** protegido por senha para visualizar chamados, imagens, alterar status e deletar pedidos já resolvidos
- **Notificação por email** automática ao cidadão quando o status do chamado é atualizado

## Tecnologias

**Frontend:** React, Vite, TailwindCSS, React Router, Axios  
**Backend:** Node.js, Express, Multer  
**Banco de dados:** Supabase (PostgreSQL + Storage)  
**IA:** Groq — modelo llama-3.3-70b-versatile  
**Email:** Resend  
**Deploy:** Vercel (frontend) + Render (backend)

## Como rodar localmente

### Pré-requisitos
- Node.js 18+
- Conta no Supabase
- Conta no Groq
- Conta no Resend

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Variáveis de ambiente

### Backend — crie um arquivo `.env` em `/backend`

SUPABASE_URL=sua_url
SUPABASE_ANON_KEY=sua_chave
GROQ_API_KEY=sua_chave
RESEND_API_KEY=sua_chave
PORT=3000

### Frontend — crie um arquivo `.env` em `/frontend`

VITE_API_URL=http://localhost:3000

## Banco de dados

Execute no SQL Editor do Supabase:

```sql
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  user_email TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'aberto',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Crie também um bucket chamado `tickets-image` no Supabase Storage com policy de leitura e inserção pública.

## Deploy

- **Frontend:** https://zeladoria-urbana.vercel.app  
- **Backend:** https://zeladoriaurbana.onrender.com

## Autor

Vinícius Lima Carneiro  
[GitHub](https://github.com/viniciuslima30) · [LinkedIn](https://linkedin.com/in/vinicius-lima-carneiro-824ba0379)