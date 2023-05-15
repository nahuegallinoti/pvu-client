# descarga la imagen de node para ejecutarlo desde docker
FROM node:18

# es como cd a esa carpeta (se puede cambiar el nombre app). los directorios pertenecen al container
# WORKDIR /src/app

# copia el package json de la maquina anfitriona (mia) a la carpeta de arriba (del container)
# COPY package*.json ./

COPY dist /app



# puerto que expone la app al container (mismo puerto en el que corre el server)
EXPOSE 5173

WORKDIR /app
# ejecuta el comando
CMD ["npx", "serve", "-s", "."]