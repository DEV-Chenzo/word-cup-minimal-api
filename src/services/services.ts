import type { FastifyReply, FastifyRequest } from "fastify"
// @ts-ignore: module has no declaration file
import Teams from "../data/teams"
// @ts-ignore: module has no declaration file
import WordCupWinners from "../data/word-cup-winners"
import type { MyTeams ,TeamParams } from "./services.type.ts"
export async function getWordCupData(request: FastifyRequest , response: FastifyReply ) {
  response.type("application/json").code(200)
  return WordCupWinners
}

export async function getTeamByIdHandler(
  request: FastifyRequest<{ Params: TeamParams }>, // 2. Passamos a tipagem para o Fastify
  reply: FastifyReply
) {
  // 3. Pegamos a variável da URL
  const { id } = request.params; 

  // 4. Aplicamos o filtro na nossa lista de dados
  const team = Teams.find((t: MyTeams) => t.fifa_code === id.toUpperCase());

  // 5. Se não encontrar a seleção, retornamos 404
  if (!team) {
    reply.type("application/json").code(404);
    return { message: "Seleção não encontrada" };
  }

  reply.type("application/json").code(200);
  return { team };
}