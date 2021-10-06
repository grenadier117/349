import { Grid, GridSize, Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  paper: {
    minHeight: '100px',
    width: '100%',
    textAlign: 'center',
    '&.small': {
      minHeight: '30px',
    },
  },
  box: {
    margin: '40px',
  },
});

export const Home = () => {
  const classes = useStyles();
  const gridGeneration = [
    [4, 3, 5],
    [5, 4, 3],
    [3, 5, 4],
    [2, 8, 2],
    [7, 2, 3],
    [2, 8, 2],
    [4, 3, 5],
    [3, 2, 7],
    [2, 8, 2],
  ];

  return (
    <Box className={classes.box}>
      <Grid container spacing={4}>
        <Grid item container xs={6}>
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ height: '100%' }}>
              349 React Group Placeholder
            </Paper>
          </Grid>
        </Grid>
        <Grid item container direction={'row'} spacing={4} xs={6}>
          <Grid item xs={12} style={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <Grid xs={2} item key={index}>
                  <Paper className={classes.paper}>..</Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} direction="column">
              {gridGeneration.map((item, index) => (
                <Grid key={index} item container spacing={1}>
                  {item.map(item2 => (
                    <Grid key={item2} item xs={item2 as GridSize}>
                      <Paper className={`${classes.paper} small`}>..</Paper>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
