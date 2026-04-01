# 🤖 AI-Powered Portfolio Agent (Full Stack & RAG)

> **Ahmed HADI GONI BOULAMA** > *Data Engineering | Software Engineering | GenAI*

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/fastapi-109989?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)](https://langchain.com/)

---

## 🚀 Live Demo
**[🔗 Accéder au Portfolio Interactif](https://portfolio-ia-fullstack-5mvbpvfhf-hgbahmeds-projects.vercel.app/)** *(Note : Le backend étant hébergé sur un tier gratuit, le premier message peut nécessiter ~40s pour réveiller le serveur).*

---

## 📝 À propos du projet
Ce projet n'est pas un simple portfolio statique. Il s'agit d'une application **Full Stack conteneurisée** intégrant un **Agent IA conversationnel**. 

L'agent utilise une architecture **RAG-lite (Retrieval-Augmented Generation)** pour répondre aux recruteurs en se basant sur 4 versions spécifiques de mon CV (Data Engineering, Data Science, Data Analysis, Full Stack). L'IA adapte son discours et les projets mis en avant selon le contexte de la question posée.

### Points forts techniques :
* **Context Routing :** L'agent identifie l'intention du recruteur pour puiser dans le bloc de compétences le plus pertinent (Big Data, Web, Statistiques, etc.).
* **Architecture Découplée :** Frontend React (Vite) et Backend FastAPI communiquant via une API REST sécurisée.
* **Industrialisation :** Backend packagé avec **Docker** pour garantir la portabilité et la facilité de déploiement.

---

## 🛠️ Stack Technique

### Backend (Le Cerveau)
* **Framework :** FastAPI (Python 3.10)
* **Orchestration IA :** LangChain
* **LLM :** Google Gemini 2.0 Flash (via API Google AI Studio)
* **Sécurité :** Gestion des secrets via variables d'environnement (`python-dotenv`).

### Frontend (L'Interface)
* **Framework :** React + **TypeScript** (pour la robustesse du typage)
* **Style :** **Tailwind CSS** (Design moderne, responsive et épuré)
* **Outils :** Vite (Build ultra-rapide)

### DevOps & Déploiement
* **Conteneurisation :** Docker (Dockerfile multi-stage optimisé)
* **CI/CD :** Déploiement automatique via GitHub sur **Vercel** (Frontend) et **Render** (Backend Dockerisé).

---

## 📁 Structure du Projet
```text
.
├── backend/
│   ├── Dockerfile          # Recette de construction de l'image
│   ├── main.py             # API FastAPI & Logique d'agent LangChain
│   ├── cv_data.py          # Base de connaissances (4 versions de CV)
│   ├── requirements.txt    # Dépendances Python (FastAPI, LangChain, etc.)
│   └── .env                # Variables d'environnement (Clé API)
└── frontend/
    ├── src/
    │   ├── App.tsx         # Interface de chat et logique de fetch
    │   └── main.tsx        # Point d'entrée React & Tailwind import
    ├── tailwind.config.js  # Configuration des styles Tailwind
    └── package.json        # Dépendances JS/TS

## Backend
cd backend
python -m venv venv
source venv/bin/activate  # Sur Windows: .\venv\Scripts\activate
pip install -r requirements.txt
# Créer un fichier .env avec votre GOOGLE_API_KEY
uvicorn main:app --reload

## Frontend
cd frontend
npm install
npm run dev

Contact
Ahmed HADI GONI BOULAMA 📍 Étudiant à l'ECE Paris 
https://www.linkedin.com/in/ahmed-hadi-goni-boulama/
