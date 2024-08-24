import {Button, Grid, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const Home = () => {

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">News</Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" component={Link} to="/news/new">
              Add news
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
