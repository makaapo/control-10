import { createSlice } from '@reduxjs/toolkit';
import {News, NewsMutation} from '../../types';
import {addNews, deleteNews, getNews, oneNews} from './newsThunks';


export interface NewsState {
  news: News[];
  newsFetching: boolean;
  isCreating: boolean;
  oneNewsPage: NewsMutation | null;
  oneNewsFetching: boolean;
  deleteNewsLoading: boolean;
}

const initialState: NewsState = {
  news: [],
  newsFetching: false,
  isCreating: false,
  oneNewsPage: null,
  oneNewsFetching: false,
  deleteNewsLoading: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.newsFetching = true;
      })
      .addCase(getNews.fulfilled, (state, {payload: news }) => {
        state.newsFetching = false;
        state.news = news;
      })
      .addCase(getNews.rejected, (state) => {
        state.newsFetching = false;
      });

    builder
      .addCase(addNews.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(addNews.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(addNews.rejected, (state) => {
        state.isCreating = false;
      });
    builder
      .addCase(oneNews.pending, (state) => {
        state.oneNewsPage = null;
        state.oneNewsFetching = true;
      })
      .addCase(oneNews.fulfilled, (state, {payload: oneNewsPage}) => {
        state.oneNewsPage = oneNewsPage;
        state.oneNewsFetching = false;
      })
      .addCase(oneNews.rejected, (state) => {
        state.oneNewsFetching = false;
      });
    builder
      .addCase(deleteNews.pending, (state) => {
        state.deleteNewsLoading = true;
      })
      .addCase(deleteNews.fulfilled, (state) => {
        state.deleteNewsLoading = false;
      })
      .addCase(deleteNews.rejected, (state) => {
        state.deleteNewsLoading = false;
      });
  },
  selectors: {
    selectNews: (state) => state.news,
    selectNewsFetching: (state) => state.newsFetching,
    selectNewsCreating: (state) => state.isCreating,
    selectOneNewsPage: state => state.oneNewsPage,
    selectOneNewsFetching: (state) => state.oneNewsFetching,
    deleteNewsLoading: state => state.deleteNewsLoading,
  },
});

export const newsReducer = newsSlice.reducer;

export const {
  selectNews,
  selectNewsFetching,
  selectNewsCreating,
  selectOneNewsPage,
  selectOneNewsFetching,
  deleteNewsLoading

} = newsSlice.selectors;