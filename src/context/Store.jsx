import { createStore } from 'redux'; 
// Importing createStore to create a Redux store.

import myReducer from './reducers'; 
// Importing the main reducer that will manage the state.

const Store = createStore(
  myReducer, 
  // Using the reducer to control the store.

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // This allows us to use the Redux DevTools in the browser for debugging.
);

export default Store; 
// Exporting the store so it can be used in other files.
