# Use uma imagem base do Node.js (versão 20)
FROM node:20

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie todos os arquivos do projeto para dentro do container
COPY . .

# Instale as dependências do projeto localmente
RUN npm install

# Instale as dependências globais necessárias
RUN npm install -g expo-cli json-server @expo/ngrok@^4.1.0

# Exponha as portas para o React Native e o json-server
EXPOSE 8081 3000

# Crie o script start.sh
RUN echo '#!/bin/bash \n\
npm run server & \n\
npm run start' > start.sh && chmod +x start.sh


# Comando para rodar o script start.sh quando o container for iniciado
CMD ["./start.sh"]
