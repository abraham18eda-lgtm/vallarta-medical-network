{/* 
    -- checar los contenedores
    docker compose up -d   "levantar el contenedor"
    docker compose ps   "ver los contenedores"
    docker compose exec <servicio> sh/bash  "entrar al contenedor"
    npm install <react-icons> --legacy-peer-deps "forsa install dep"

    --conectar postgres a la bse de datos del proyecto:

    docker compose down --remove-orphans --remueve lo viejo
    docker compose down -v  --borra volumen
    docker exec -it postgres_db psql -U postgres -d vallarta-medical -- instala nuevos datos a la conexion
    comando dentro de sql::
    \l        -- listar bases
    \dt       -- listar tablas
    SELECT now();
    \q        -- salir

    Instalacion de prisma la v5 y hay que correrlo dentro del contenedor de docker y en el proyecto
    npm uninstall prisma @prisma/client
    npm install prisma@5 @prisma/client@5
    npx prisma -v
    npx prisma migrate dev --name init
    npx prisma generate

    Instalar node v20 LTS - Descarga del sitio official 

    // CAMBIO NORMAL (el 90% de los casos)
    docker compose exec web npx prisma migrate dev
    // CAMBIO PEQUEÑO (solo para DEV)
    docker compose exec web npx prisma migrate reset
*/}