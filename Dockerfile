# Usamos Node.js completo
FROM node:20-bullseye

# Directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json si existen
COPY package*.json ./

# Instalamos dependencias
RUN npm install --legacy-peer-deps

# Generamos prisma
COPY prisma ./prisma

# Copiamos el resto del proyecto
COPY . .

# Exponemos el puerto de Next.js
EXPOSE 3000

# Comando por defecto para levantar la app
CMD ["npm", "run", "dev"]
