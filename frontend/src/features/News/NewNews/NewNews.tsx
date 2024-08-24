import {Box, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {NewsForm} from '../../../types';
import {addNews} from '../newsThunks';
import FormNews from '../components/NewsForm/FormNews';
import {useAppDispatch} from '../../../app/hooks';


const NewMessage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFormSubmit = async (newsMutation: NewsForm) => {
    await dispatch(addNews(newsMutation));
    navigate('/');
  };

  return (
    <>
      <Box sx={{
        width: '100%',
        padding: 2,
        borderRight: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 1,
      }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
          Add new post
        </Typography>
        <FormNews onSubmit={onFormSubmit} />
      </Box>
    </>
  );
};

export default NewMessage;