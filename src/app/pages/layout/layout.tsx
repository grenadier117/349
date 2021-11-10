import { AppBar, FormControlLabel, FormGroup, Switch, Grid, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { globalSliceKey, globalReducer } from 'app/global/global.redux';
import { GlobalDisplay } from 'app/global/globalDisplay';
import { Route } from 'react-router-dom';
import { useInjectReducer } from 'utils/redux-injectors';
import { useCookies } from 'react-cookie';
import React from 'react';
import { ColorMode } from 'app/app';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#262626',
    minHeight: '100vh',
  },
  title: {
    color: '#fff',
  },
});

export const Layout = ({ Component, ...rest }) => {
  const classes = useStyles();
  useInjectReducer({ key: globalSliceKey, reducer: globalReducer });
  const [cookies, setCookie] = useCookies(['colorMode']);
  const [checked, setChecked] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (cookies.colorMode === ColorMode.light) setChecked(true);
  }, [cookies.colorMode]);

  const onChange = event => {
    if (event.target.checked) setCookie('colorMode', ColorMode.light);
    else setCookie('colorMode', ColorMode.dark);
  };

  return (
    <Route
      {...rest}
      render={matchProps => (
        <GlobalDisplay>
          <Grid container direction={'column'} className={classes.root}>
            <Grid item xs={12}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h5" component="div" className={classes.title} sx={{ flexGrow: 1 }}>
                    PET CALENDAR
                  </Typography>
                  <Typography variant="h5" component="div" className={classes.title} sx={{ flexGrow: -1 }}>
                    CS 349 - Project 1
                  </Typography>
                  <FormGroup style={{ paddingLeft: '20px' }}>
                    <FormControlLabel
                      control={<Switch color="secondary" checked={checked} onChange={onChange} />}
                      label="Light Mode"
                    />
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
