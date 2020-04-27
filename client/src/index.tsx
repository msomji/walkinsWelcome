import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from 'redux-saga'
import App from './App'
import './index.scss'
import * as serviceWorker from './serviceWorker'
import { rootReducer } from './store'
import  rootSaga from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware();
const devTools: any = process.env.NODE_ENV === 'development' ? composeWithDevTools() : (x:any) => x;
console.log(process.env.NODE_ENV)

const store = createStore(//
  rootReducer,
  compose(
  applyMiddleware(sagaMiddleware), 
  devTools)
  )

  sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
