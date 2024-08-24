import React, { useState } from 'react';
import {Button, CircularProgress, Grid, TextField} from '@mui/material';
import {CommentForm} from '../../../../types';
import {useAppSelector} from '../../../../app/hooks';
import {selectCommCreating} from '../../commetsSlice';



interface Props {
  onSubmit: (comments: CommentForm) => void;
  id: string;
}

const FormComments: React.FC<Props> = ({onSubmit, id}) => {
  const isCreating = useAppSelector(selectCommCreating);
  const [state, setState] = useState<CommentForm>({
    news_id: id,
    author: '',
    text: '',
  });

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({...state});

    setState({
      news_id: id,
      author: '',
      text: '',
    });
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitForm}>
      <Grid item>
        <TextField
          sx={{
            width: '100%',
          }}
          label="Text"
          id="text"
          name="text"
          value={state.text}
          onChange={inputChange}
          required
        />
      </Grid>
      <Grid item>
        <TextField
          sx={{
            width: '100%',
          }}
          label="Author"
          id="author"
          name="author"
          value={state.author}
          onChange={inputChange}
        />
      </Grid>
      <Grid item>
        <Button
          disabled={state.text.trim().length === 0 || isCreating}
          variant="contained"
          type="submit">
          {isCreating ? <CircularProgress size={24}/> : 'Send'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormComments;