import React from 'react';
import { render } from 'react-dom';

import Kville from './../src/app'

const root = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
  render(<Kville />, root);
});
