import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import {Comment, CommentForm} from '../../types';


export const getCommentWithNews = createAsyncThunk<Comment[], string>(
  'comments/get-with-news-id',
  async (id: string) => {
    const {data: comments} = await axiosApi.get<Comment[]>(`comments?news_id=${id}`);
    return comments;
  });

export const addComment = createAsyncThunk<void, CommentForm>(
  'comments/add',
  async (comment) => {
    await axiosApi.post(`comments`, comment);
  });


export const deleteComment = createAsyncThunk<void, string>(
  'comments/delete',
  async (id: string) => {
    await axiosApi.delete(`comments/${id}`);
  });