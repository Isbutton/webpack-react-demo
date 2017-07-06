import 'react-hot-loader/patch';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Title from './components/title';

if (module.hot) {
    module.hot.accept();
}

const div = document.getElementById('example');
ReactDOM.render(<Title />,div);