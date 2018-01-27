import React from 'react';
import { LocaleProvider, Button, Slider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { render } from 'react-dom';
import 'antd/dist/antd.css';

const root = document.getElementById('root');
document.addEventListener('DOMContentLoaded', () => {
  render(
    <div>
      ressdf
      <Button type="primary">Primary</Button>
      <Slider defaultValue={30} disabled={false} />
    </div>, root,
  );
});
