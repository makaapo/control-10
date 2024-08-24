import React from 'react';
import {Card, CardContent, CardHeader, CardMedia, Grid, styled} from '@mui/material';
import {API_URL} from '../../../../constants';
import dayjs from 'dayjs';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  date: string;
  title: string;
  image: string | null;
}

const NewsCard: React.FC<Props> = ({date, title, image}) => {
  const cardImage = image ? `${API_URL}/${image}` : null;

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
        </CardContent>
      </Card>
    </Grid>
  );
};

export default NewsCard;