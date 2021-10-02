import React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './styles/styles.css';
import reducer from './reducers';
import App from './components/App';

const store = createStore(
  reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
const init = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    window.document.querySelector('#app'),
  );
};
init();
