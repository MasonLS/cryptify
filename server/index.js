import express from 'express';
import morgan from 'morgan';
import session from 'client-sessions';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../app/routes';
import spotify from './spotify';
import actionTypes from '../app/store/actions/types';
import { receiveFromApi, setSelectedTrack } from '../app/store/actions/creators';
import configureStore from '../app/store/configure';
import initialState from '../app/store/state';
import authRouter from './routes/auth';
import tracksRouter from './routes/tracks';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', './');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(morgan('dev'));
app.use(session({
  cookieName: 'session',
  secret: 'a really hard to guess secret',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));

app.use('/auth', authRouter);

app.use((req, res, next) => {
  if (req.path !== '/' && !req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
});

app.use('/tracks', tracksRouter);

app.get('*', (req, res, next) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      next(error);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const store = configureStore(initialState);

      if (req.path === '/home') {
        spotify.getUserTopTracks(req.session.user.access_token)
          .then(json => {
            const tracks = json.items;

            store.dispatch(receiveFromApi(actionTypes.FETCH_TRACKS_SUCCESS, tracks));
            store.dispatch(setSelectedTrack(tracks[0]));
            renderRoute(res, renderProps, store);
          })
          .catch(next);
      } else {
        renderRoute(res, renderProps, store);
      }
    } else {
      res.status(404).send('Not found');
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

function renderRoute(response, renderProps, store) {
  response.render('index', {
    initialState: JSON.stringify(store.getState()),
    content: renderToString((<Provider store={store} ><RouterContext {...renderProps} /></Provider>))
  });
}
