import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import {News, NewsForm, NewsMutation} from '../../types';


export const getNews = createAsyncThunk<News[]>('news/fetchAll', async () => {
  const {data: news} = await axiosApi.get<News[]>('/news');
  return news;
});


export const oneNews = createAsyncThunk<NewsMutation, string>('news/fetchOne', async (id) => {
  const {data: news} = await axiosApi.get<NewsMutation>(`/news/${id}`);
  return news;
});

export const addNews = createAsyncThunk<void, NewsForm>('news/add', async (newsMutation) => {
  const formData = new FormData();
  formData.append('text', newsMutation.text);
  formData.append('title', newsMutation.title);

  if (newsMutation.image) {
    formData.append('image', newsMutation.image);
  }

  await axiosApi.post('/news', formData);
});



export const deleteNews = createAsyncThunk<void, string>(
  'news/delete',
  async (id: string) => {
    await axiosApi.delete(`news/${id}`);
  });