import {Container} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import Home from './features/News/Home/Home';
import NewMessage from './features/News/NewNews/NewNews';
const App = () => (
  <>
    <header>
      <AppToolbar/>
    </header>
    <Container maxWidth="xl" component="main" sx={{marginTop: '2rem'}}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/news/new" element={<NewMessage/>}/>
      </Routes>
    </Container>
  </>
);

export default App