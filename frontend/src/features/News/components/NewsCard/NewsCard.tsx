import React from 'react';
import {Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Grid, styled} from '@mui/material';
import {API_URL} from '../../../../constants';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../../../app/hooks';
import {deleteNewsLoading} from '../../newsSlice';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  id: string;
  date: string;
  title: string;
  image: string | null;
  deletePost: (id: string) => void;
}

const NewsCard: React.FC<Props> = ({id,date, title, image, deletePost}) => {
  const cardImage = image ? `${API_URL}/${image}` : null;
  const isDeleting = useAppSelector(deleteNewsLoading);
  const formatDate = dayjs(date).format('DD.MM.YYYY HH:mm:ss');

  return (
    <Grid item sx={{width: '280px'}}>
      <Card sx={{height: '100%', boxShadow: '10'}}>
        <CardHeader title={formatDate} sx={{borderBottom: '1px solid', textAlign: 'center'}}/>
        {cardImage && (
          <ImageCardMedia image={cardImage}/>
        )}
        <CardContent>
          {title}
          <Button variant="outlined" color="primary" component={Link} to={`/news/${id}`}>
            Read full post
          </Button>
          <Button
            variant="outlined" color="warning"
            onClick={() => deletePost(id)}
            className="ms-3 btn btn-danger"
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={24}/> : 'Delete'}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default NewsCard;