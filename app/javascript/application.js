// Entry point for the build script in your package.json
import React from 'react';
import { render } from 'react-dom';

import Kville from './src/app'

document.addEventListener('DOMContentLoaded', () => {
  render(<Kville />,  document.getElementById('root'));
});
