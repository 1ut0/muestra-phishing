# Usa una imagen base oficial de Node.js
FROM node:18

# Crea directorio en el contenedor
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
RUN npm install
COPY . .

# Expone el puerto (Cloud Run usa 8080 por defecto)
ENV PORT=8080
EXPOSE 8080

# Comando para iniciar la app
CMD [ "node", "server.js" ]
