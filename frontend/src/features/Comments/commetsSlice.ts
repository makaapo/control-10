import {createSlice} from '@reduxjs/toolkit';
import {Comment} from '../../types';
import {addComment, deleteComment, getCommentWithNews} from './commentsThunks';


export interface CommentState {
  comments: Comment[];
  commentsFetching: boolean;
  isCreating: boolean;
  deleteCommentsLoading: boolean;
}

const initialState: CommentState = {
  comments: [],
  commentsFetching: false,
  isCreating: false,
  deleteCommentsLoading: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentWithNews.pending, (state) => {
        state.commentsFetching = true;
      })
      .addCase(getCommentWithNews.fulfilled, (state, {payload: comments }) => {
        state.commentsFetching = false;
        state.comments = comments;
      })
      .addCase(getCommentWithNews.rejected, (state) => {
        state.commentsFetching = false;
      });

    builder
      .addCase(addComment.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(addComment.rejected, (state) => {
        state.isCreating = false;
      });
    builder
      .addCase(deleteComment.pending, (state) => {
        state.deleteCommentsLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.deleteCommentsLoading = false;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.deleteCommentsLoading = false;
      });
  },
  selectors: {
    selectComm: (state) => state.comments,
    selectCommFetching: (state) => state.commentsFetching,
    selectCommCreating: (state) => state.isCreating,
    deleteCommLoading: state => state.deleteCommentsLoading,
  },
});

export const commentsReducer = commentsSlice.reducer;

export const {
  selectComm,
  selectCommFetching,
  selectCommCreating,
  deleteCommLoading,

} = commentsSlice.selectors;