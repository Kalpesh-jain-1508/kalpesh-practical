import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import { Container, Typography } from '@mui/material';

const App = () => {
  return (
    <Provider store={store}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Book Management
        </Typography>
        <BookForm />
        <BookList />
      </Container>
    </Provider>
  );
};

export default App;
