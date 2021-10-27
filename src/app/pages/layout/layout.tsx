import { AppBar, Button, FormGroup, Grid, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { globalSliceKey, globalReducer } from 'app/global/global.redux';
import { GlobalDisplay } from 'app/global/globalDisplay';
import { Route } from 'react-router-dom';
import { useInjectReducer } from 'utils/redux-injectors';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#262626',
    minHeight: '100vh',
  },
});

export const Layout = ({ Component, ...rest }) => {
  const classes = useStyles();
  useInjectReducer({ key: globalSliceKey, reducer: globalReducer });

  return (
    <Route
      {...rest}
      render={matchProps => (
        <GlobalDisplay>
          <Grid container direction={'column'} className={classes.root}>
            <Grid item xs={12}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    CS 349 - Project 1
                  </Typography>
                  <FormGroup>
                    <Button variant="contained" color="primary">
                      Add Event
                    </Button>
                  </FormGroup>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item xs={12}>
              <Component {...matchProps} />
            </Grid>
          </Grid>
        </GlobalDisplay>
      )}
    />
  );
};
