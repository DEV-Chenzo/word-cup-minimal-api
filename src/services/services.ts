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
  request: FastifyRequest<{ Params: TeamParams }>,
  reply: FastifyReply
) {
  const { id } = request.params; 
  const team = Teams.find((t: MyTeams) => t.fifa_code === id.toUpperCase());
  if (!team) {
    reply.type("application/json").code(404);
    return { message: "Seleção não encontrada" };
  }

  reply.type("application/json").code(200);
  return { team };
}