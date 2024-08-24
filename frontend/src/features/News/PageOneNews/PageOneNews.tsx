import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {CardMedia, CircularProgress, Grid, styled, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectOneNewsFetching, selectOneNewsPage} from '../newsSlice';
import {oneNews} from '../newsThunks';
import {API_URL} from '../../../constants';
import dayjs from 'dayjs';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

const PageOneNews = () => {
  const {id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectOneNewsPage);
  const isFetching = useAppSelector(selectOneNewsFetching);

  const cardImage = news?.image ? `${API_URL}/${news.image}` : null;

  const formatDate = dayjs(news?.date).format('DD.MM.YYYY HH:mm:ss');

  useEffect(() => {
    dispatch(oneNews(id));
  }, [dispatch, id]);

  return (
    <Grid container direction="column" spacing={2}>
      {isFetching && (
        <Grid item>
          <CircularProgress />
        </Grid>
      )}
      {news && (
        <>
          <Grid item component={Typography} variant="h4">
            {news.title}
          </Grid>
          <Grid item component={Typography} variant="h6">
            {news.text}
          </Grid>
          <Grid item component={Typography} variant="body1">
            {formatDate}
          </Grid>
          <Grid item component={Typography} variant="body1" sx={{width: '280px'}}>
            {cardImage && (
              <ImageCardMedia image={cardImage}/>
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PageOneNews;