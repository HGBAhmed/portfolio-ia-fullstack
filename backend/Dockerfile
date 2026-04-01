# 1. On part d'une image Python officielle, légère et optimisée
FROM python:3.10-slim

# 2. On définit le dossier de travail à l'intérieur du conteneur
WORKDIR /app

# 3. On copie le fichier des dépendances et on les installe
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. On copie tout le reste de notre code (main.py, cv_data.py, etc.)
COPY . .

# 5. On expose le port 8000 (celui de FastAPI)
EXPOSE 8000

# 6. La commande pour démarrer le serveur une fois en ligne
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]