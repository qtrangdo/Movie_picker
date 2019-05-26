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

export interface IEpisodeProps {
  episodes: Array<IEpisode>,
  store: {state: IState, dispatch: any},
  toggleFavAction: (state: IState, dispatch: any, episode: IEpisode) => IAction,
  favorites: Array<any>
}