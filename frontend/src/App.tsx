import {Container} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import AppToolbar from './UI/AppToolbar/AppToolbar';
const App = () => (
  <>
    <header>
      <AppToolbar/>
    </header>
    <Container maxWidth="xl" component="main" sx={{marginTop: '2rem'}}>
      <Routes>
        <Route path="/" element={<h1>Home</h1>}/>
      </Routes>
    </Container>
  </>
);

export default App