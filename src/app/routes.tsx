import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { PetCalendar } from './pages/calendar/calendar';
import { Layout } from './pages/layout/layout';

export const Routes: React.FC = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Layout exact path="/" Component={PetCalendar} />
      </Switch>
    </BrowserRouter>
  </div>
);
