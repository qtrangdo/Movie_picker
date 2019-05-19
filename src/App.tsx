import * as React from 'react';
import { Store } from './Store';



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
  console.log(state)
  return (
    <React.Fragment>
      <h1>Rick and Morty</h1>
      <p>Pick your favorite episode!!</p>
      <section>
        {state.episodes.map((episode: any) => {
          return (
            <section key = {episode.id}>
              <img src={episode.image ? episode.image.medium : episode.image } alt={`Rick & Morty ${episode.name}`}/>
              <div>{episode.name}</div>
              <section>
                Season: {episode.season} Number: {episode.number}
              </section>
            </section>
          )
        })}
      </section>
    </React.Fragment>
  )
}