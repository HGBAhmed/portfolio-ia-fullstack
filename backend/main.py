import os
from fastapi import FastAPI
from cv_data import CV_FULL_STACK, CV_DATA_ANALYSIS, CV_DATA_ENGINEERING, CV_DATA_SCIENCE
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage

# 1. Charger la clé API depuis le fichier .env
load_dotenv()

app = FastAPI(title="API CV Ahmed")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Initialiser le modèle d'IA (Gemini Flash)
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

# 3. Définir le format des messages que le frontend va nous envoyer
class ChatRequest(BaseModel):
    message: str

# 4. LE SECRET DE TON IA : Le Prompt Système
SYSTEM_PROMPT = f"""Tu es l'assistant personnel expert d'Ahmed. 
Ton rôle est d'aider les recruteurs à comprendre son parcours. 
Tu as accès à ses 4 profils spécialisés. Analyse la question du recruteur et utilise les informations du profil le plus pertinent sans jamais citer le nom du fichier.

PROFIL DATA ENGINEER :
{CV_DATA_ENGINEERING}

PROFIL DATA ANALYST :
{CV_DATA_ANALYSIS}

PROFIL DATA SCIENTIST :
{CV_DATA_SCIENCE}

PROFIL FULL STACK :
{CV_FULL_STACK}

CONSIGNES :
1. Sois très précis sur les technos et les chiffres cités dans les CVs.
2. Si on te pose une question transverse, synthétise les informations.
3. Garde un ton professionnel, chaleureux et direct.
4. Si tu ne trouves pas une info précise, propose de contacter Ahmed au 06 67 37 60 65.

STYLE : 
- Ne dis JAMAIS "Je regarde dans le CV de Data Engineer". Réponds naturellement comme si tu connaissais Ahmed par cœur.
- Sois pro, concis et mets en avant les technos citées dans l'offre du recruteur.
- Si une question est trop vague, donne une réponse équilibrée citant sa polyvalence (Data & Web).
"""

# 5. La route IA qui recevra les questions des recruteurs
@app.post("/chat")
def chat_with_ahmed(request: ChatRequest):
    try:
        # On prépare la conversation : Les consignes (Système) + La question du recruteur (Humain)
        messages = [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=request.message)
        ]
        
        # On envoie tout à l'IA et on récupère la réponse
        response = llm.invoke(messages)
        return {"reply": response.content}
    
    except Exception as e:
        return {"reply": f"Erreur de l'assistant : {str(e)}"}