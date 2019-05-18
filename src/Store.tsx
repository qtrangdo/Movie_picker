import * as React from 'react';

interface IState {
  episodes: Array<''>,
  favorites: Array<''>
}

interface IAction {
  type: string,
  payload: [],
}

const initialState: IState = {
  episodes: [],
  favorites: []
};

export const Store = React.createContext<IState>(initialState)

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, episodes: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props: any): JSX.Element {
  return <Store.Provider value={initialState}>{props.children}</Store.Provider>
}