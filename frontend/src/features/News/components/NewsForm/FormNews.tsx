import React, {useState} from 'react';
import {Button, CircularProgress, Grid, TextField} from '@mui/material';
import {NewsForm} from '../../../../types';
import {selectNewsCreating} from '../../newsSlice';
import {useAppSelector} from '../../../../app/hooks';
import FileInput from '../../../../UI/FileInput/FileInput';


interface Props {
  onSubmit: (news: NewsForm) => void;
}

const MessageForm: React.FC<Props> = ({onSubmit}) => {
  const isCreating = useAppSelector(selectNewsCreating);
  const [state, setState] = useState<NewsForm>({
    title: '',
    text: '',
    image: null,
  });

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...state});

  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid item>
        <TextField
          sx={{
            width: '100%',
          }}
          label="Title"
          id="title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
          required
        />
      </Grid>
      <Grid item>
        <TextField
          sx={{
            width: '100%',
          }}
          required
          multiline
          minRows={3}
          label="Text"
          id="text"
          name="text"
          value={state.text}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
      </Grid>
      <Grid item>
        <Button
          disabled={state.text.trim().length === 0 || state.title.trim().length === 0 || isCreating}
          variant="contained"
          type="submit">
          {isCreating ? <CircularProgress size={24}/> : 'Send'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default MessageForm;