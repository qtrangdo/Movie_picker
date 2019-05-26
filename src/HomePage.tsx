import React from 'react';
import { Store } from './Store';
import { IEpisode, IAction, IEpisodeProps } from './interfaces';

const EpisodeList = React.lazy<any>(() => import('./EpisodeList'))

export default function Homepage() {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction()
  })

  const fetchDataAction = async () => {
    const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes');
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    })
  }

  const toggleFavAction = (episode: IEpisode): IAction => {
    const episodeInFav = state.favorites.includes(episode);
    let dispatchObj = {
      type: "ADD_FAV",
      payload: episode
    }
    if (episodeInFav) {
      const favWithoutEpisode = state.favorites.filter((fav: IEpisode) => fav.id !== episode.id)
      dispatchObj = {
        type: "REMOVE_FAV",
        payload: favWithoutEpisode
      }
    }
    return dispatch(dispatchObj);
  }

  const props: IEpisodeProps = {
    episodes: state.episodes,
    toggleFavAction,
    favorites: state.favorites
  }

  return (
    <React.Fragment>
      <React.Suspense fallback={<div>Loading...</div>}>
        <section className="episode-layout">
          <EpisodeList {...props} />
        </section>
      </React.Suspense>
    </React.Fragment>
  )
}