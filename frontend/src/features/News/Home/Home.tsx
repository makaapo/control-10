import {Button, CircularProgress, Grid, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectNews, selectNewsFetching} from '../newsSlice';
import {deleteNews, getNews} from '../newsThunks';
import {useEffect} from 'react';
import NewsCard from '../components/NewsCard/NewsCard';
import {toast} from 'react-toastify';

const Home = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const isFetching = useAppSelector(selectNewsFetching);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const newsDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    } try {
      await dispatch(deleteNews(id));
      dispatch(getNews());
      toast.success('Post deleted!');
    } catch (error) {
      toast.error('Post not deleted!');
    }
  };

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">News</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              component={Link} to="/news/new"
            >
              Add new post
            </Button>
          </Grid>
        </Grid>
        {isFetching ? (
            <CircularProgress />
          ) :
          <Grid item container spacing={1} marginBottom={5} justifyContent="center">
            {news.map((msg, index) => (
              <NewsCard
                key={index}
                id={msg.id}
                date={msg.date}
                title={msg.title}
                image={msg.image ?? null}
                deletePost={newsDelete}
              />
            ))}
          </Grid>}
      </Grid>
    </>
  );
};

export default Home;
