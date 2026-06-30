import type { FastifyReply, FastifyRequest } from "fastify";
// @ts-ignore: module has no declaration file
import { Teams } from "../data/teams";
// @ts-ignore: module has no declaration file
import { WorldCupWinners } from "../data/word-cup-winners";
import type { MyTeams, TeamParams } from "./services.type.ts";

export async function getWordCupData(
  request: FastifyRequest,
  response: FastifyReply,
) {
  response.type("application/json").code(200);
  return WorldCupWinners;
}

export async function getTeamsData(
  request: FastifyRequest,
  response: FastifyReply,
) {
  response.type("application/json").code(200);
  return Teams;
}

export async function getTeamsByFieldHandler(
  request: FastifyRequest<{ Params: TeamParams }>,
  reply: FastifyReply,
) {
  const { id } = request.params;

  // 1. Verificamos se o que foi digitado é um número (ex: "5")
  const isNumber = /^\d+$/.test(id);

  if (isNumber) {
    const titlesCount = parseInt(id, 10);
    // Filtra todas as seleções que têm aquele número exato de títulos
    const filteredTeams = Teams.filter(
      (t: MyTeams) => t.world_cup_titles === titlesCount,
    );

    reply.type("application/json").code(200);
    return { Teams: filteredTeams };
  } else {
    const team = Teams.find(
      (t: MyTeams) => t.name.toLowerCase() === id.toLowerCase(),
    );

    if (!team) {
      reply.type("application/json").code(404);
      return { message: `Seleção '${id}' não encontrada.` };
    }

    reply.type("application/json").code(200);
    return { team };
  }
}
