import type { FastifyReply, FastifyRequest } from "fastify";
// @ts-ignore: module has no declaration file
import { Teams } from "../data/teams";
// @ts-ignore: module has no declaration file
import { WorldCupWinners } from "../data/world-cup-winners";
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
  if (!id || id.trim() === "") {
    reply.type("application/json").code(400);
    return { message: "Por favor, informe o nome da seleção ou o número de títulos." };
  }

  const isNumber = /^\d+$/.test(id);

  if (isNumber) {
    const titlesCount = parseInt(id, 10);
    const filteredTeams = Teams.filter(
      (t: MyTeams) => t.world_cup_titles === titlesCount,
    );

    reply.type("application/json").code(200);
    return { Teams: filteredTeams };
  } else {
    const team = Teams.find(
      (t: MyTeams) => t.name.toLowerCase() === id.toLowerCase() || t.fifa_code === id.toUpperCase(),
    );

    if (!team) {
      reply.type("application/json").code(404);
      return { message: `Seleção '${id}' não encontrada.` };
    }

    reply.type("application/json").code(200);
    return { team };
  }
}
