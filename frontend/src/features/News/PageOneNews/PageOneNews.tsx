import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
  Box, Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  styled,
  Typography
} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectOneNewsFetching, selectOneNewsPage} from '../newsSlice';
import {oneNews} from '../newsThunks';
import {API_URL} from '../../../constants';
import dayjs from 'dayjs';
import FormComments from '../../Comments/components/FormComments/FormComments';
import {addComment, deleteComment, getCommentWithNews} from '../../Comments/commentsThunks';
import {CommentForm} from '../../../types';
import {deleteCommLoading, selectComm, selectCommFetching} from '../../Comments/commetsSlice';
import {toast} from 'react-toastify';
import imageNotFound from '../../../assets/images/image-not-found.png';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

const PageOneNews = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectOneNewsPage);
  const isFetching = useAppSelector(selectOneNewsFetching);
  const comments = useAppSelector(selectComm);
  const isCommFetching = useAppSelector(selectCommFetching);
  const isCommDeleting = useAppSelector(deleteCommLoading);

  let cardImage = imageNotFound;

  if (news?.image) {
    cardImage = `${API_URL}/${news.image}`;
  }

  const formatDate = dayjs(news?.date).format('DD.MM.YYYY HH:mm:ss');

  useEffect(() => {
    dispatch(oneNews(id));
    dispatch(getCommentWithNews(id));
  }, [dispatch, id]);

  const onFormCommSubmit = async (commMutation: CommentForm) => {
    await dispatch(addComment(commMutation));
    await dispatch(getCommentWithNews(id));
  };

  const commentDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return;
    }
    try {
      await dispatch(deleteComment(commentId));
      await dispatch(getCommentWithNews(id));
      toast.success('Comment deleted!');
    } catch (error) {
      toast.error('Comment not deleted!');
    }
  };

  return (
    <Grid container direction="column" spacing={2} marginBottom={5}>
      {isFetching && (
        <Grid item
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
        }}>
          <CircularProgress />
        </Grid>
      )}
      {news && (
        <>
          <Grid item>
            <Typography variant="h4" sx={{fontWeight: 'bold', marginBottom: 2}}>
              {news.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" sx={{marginBottom: 2, lineHeight: 1.6}}>
              {news.text}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={{color: 'gray', marginBottom: 2}}>
              {formatDate}
            </Typography>
          </Grid>
          <Grid item sx={{width: '280px'}}>
            {cardImage && (
              <ImageCardMedia image={cardImage}/>
            )}
          </Grid>
          <hr/>
          <h3>Comments:</h3>
          {isCommFetching ? (
            <CircularProgress/>
          ) : (
            <>
              {comments.length > 0 ? (
                <Box className="comments-block">
                  {comments.map(comment => (
                    <Card
                      key={comment.id}
                      variant="outlined"
                      sx={{
                        marginBottom: 2,
                        padding: 2,
                        marginX: 'auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6">Author: {comment.author}</Typography>
                        <Typography variant="body1">{comment.text}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => commentDelete(comment.id)}
                          disabled={isCommDeleting}
                        >
                          {isCommDeleting ? <CircularProgress size={24}/> : 'Delete'}
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Typography variant="subtitle1" className="opacity-50">
                  No comments
                </Typography>
              )}
            </>
          )}
          <Grid item component={Typography} variant="body1">
            <Typography variant="h5" sx={{mb: 2}}>
              Add new comment
            </Typography>
            <FormComments onSubmit={onFormCommSubmit} id={id}/>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PageOneNews;
