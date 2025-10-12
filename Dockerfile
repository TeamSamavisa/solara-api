FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./

#Trocado install por ci para garantir que as versões do package-lock.json sejam respeitadas
RUN npm ci

COPY . .

COPY wait-for-it.sh ./

RUN if [ ! -f .env ]; then cp .env.example .env; fi

RUN npm run build

FROM node:22-bookworm-slim AS prod

# Usando um usuário padrão para evitar problemas de segurança
USER node

ENV NODE_ENV=production

WORKDIR /app

COPY --chown=node:node package*.json .

RUN npm ci --only=production

#Trocando o owner para o usuário node (padrão)
COPY --from=builder --chown=node:node /app/dist ./dist

COPY --from=builder --chown=node:node /app/.env ./

COPY --from=builder --chown=node:node /app/wait-for-it.sh ./

RUN chmod +x wait-for-it.sh

EXPOSE ${APP_PORT} ${DATABASE_PORT}

# Obs.: Coloquei esse entrypoint para garantir que o wait-for-it.sh seja executado antes do comando CMD.
# Pelo fato de o banco iniciar mais lentamente que a aplicação.
# Vai ajudar a evitar erros de conexão com o banco.
ENTRYPOINT ["./wait-for-it.sh"]

CMD ["npm", "run", "start:prod"]