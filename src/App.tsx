import * as React from 'react';
import { Store } from './Store';
import { IEpisode, IAction } from './interfaces';
import './index.css';

export default function App(): JSX.Element {
  const {state, dispatch} = React.useContext(Store);

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

  const toggleFavAction = (episode: IEpisode): IAction => dispatch({
    type: "ADD_FAV",
    payload: episode
  })

  return (
    <React.Fragment>
      <header className="header">
        <h1>Rick and Morty</h1>
        <p>Pick your favorite episode!!</p>
      </header>
      <section className="episode-layout">
        {state.episodes.map((episode: IEpisode) => {
          return (
            <section key = {episode.id} className="episode-box">
              <img src={episode.image ? episode.image.medium : episode.image } alt={`Rick & Morty ${episode.name}`}/>
              <div>{episode.name}</div>
              <section>
                <div>Season: {episode.season} Number: {episode.number}</div>
                <button type="button" onClick={() => toggleFavAction(episode)}>Fav</button>
              </section>
            </section>
          )
        })}
      </section>
    </React.Fragment>
  )
}