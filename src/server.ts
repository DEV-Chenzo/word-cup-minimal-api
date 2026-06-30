import fastify from "fastify";
import {
  getWordCupData,
  getTeamsData,
  getTeamsByFieldHandler,
} from "./services/services.ts";
const server = fastify({
  logger: true,
});

server.get("/wordcup", await getWordCupData);
server.get("/teams", await getTeamsData);
server.get("/teams/:id", await getTeamsByFieldHandler);

const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

    // 2. Roda o servidor
    await server.listen({
      port: port,
      host: "0.0.0.0", // CRÍTICO para o deploy funcionar!
    });

    console.log(`Servidor rodando na porta ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
