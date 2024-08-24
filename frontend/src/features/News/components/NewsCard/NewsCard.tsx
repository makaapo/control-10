import React from 'react';
import {Button, Card, CardMedia, CircularProgress, Grid, Typography, Box} from '@mui/material';
import {API_URL} from '../../../../constants';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../../../app/hooks';
import {deleteNewsLoading} from '../../newsSlice';
import imageNotFound from '../../../../assets/images/image-not-found.png';

interface Props {
  id: string;
  date: string;
  title: string;
  image: string | null;
  deletePost: (id: string) => void;
}

const NewsCard: React.FC<Props> = ({id, date, title, image, deletePost}) => {
  let cardImage = imageNotFound;

  if (image) {
    cardImage = `${API_URL}/${image}`;
  }
  const isDeleting = useAppSelector(deleteNewsLoading);
  const formatDate = dayjs(date).format('DD.MM.YYYY HH:mm:ss');

  return (
    <Grid item sx={{ width: '100%', marginBottom: 2 }}>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          boxShadow: 3
      }}>
        {cardImage && (
          <CardMedia
            component="img"
            image={cardImage}
            alt={title}
            sx={{
              width: 80,
              height: 80,
              marginRight: 2,
              borderRadius: 1}}
          />
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1
        }}>
          <Typography variant="h6" sx={{fontWeight: 'bold'}}>
            {title}
          </Typography>
          <Typography variant="caption" sx={{color: 'gray'}}>
            {formatDate}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 1}}>
            <Button
              variant="text"
              color="primary"
              component={Link}
              to={`/news/${id}`}>
              Read Full Post &gt;&gt;
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => deletePost(id)}
              disabled={isDeleting}
            >
              {isDeleting ? <CircularProgress size={14}/> : 'Delete'}
            </Button>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default NewsCard;
