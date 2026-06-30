// 1. Definimos o formato do parâmetro que vem na URL
export interface TeamParams {
  id: string; // ou 'fifa_code', depende de como você quer filtrar
}

export interface MyTeams {
  name: string;
  fifa_code: string;
  continent: string;
  world_cup_titles: number;
  title_years: Array<number>;
  appearances: Array<number>;
  total_appearances: number;
}
