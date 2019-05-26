export interface IState {
  episodes: Array<IEpisode>,
  favorites: Array<any>
}

export interface IAction {
  type: string,
  payload: [],
}

export interface IEpisode {
  airdate: string,
  airstamp: string,
  airtime: string,
  id: number
  image: {medium: string, original: string} | undefined,
  name: string,
  number: number,
  runtime: number,
  season: number,
  summary: string,
  url: string
}