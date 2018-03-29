import React from 'react';
import { render } from 'react-dom';

import Kville from './../src/app'

document.addEventListener('DOMContentLoaded', () => {
  render(<Kville />,  document.getElementById('root'));
});
