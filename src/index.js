import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";

import { ApolloProvider } from '@apollo/client';
import ApolloClient from './apollo'

import AppMain from './AppMain'

// import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

var hist = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter history={hist}>
    <StylesProvider injectFirst>
      <ApolloProvider client={ApolloClient}>
        <AppMain/>
      </ApolloProvider>
    </StylesProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
