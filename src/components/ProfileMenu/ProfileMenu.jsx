import PropTypes from 'prop-types';
// import s from './ProfileMenu.module.css';
import { useRef, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Divider, TextField }
  from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from '@mui/system';
import { FormControlUnstyled } from '@mui/base';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../store/auth/authSlice';
import { itemsSetQuery } from '../../store/items/itemsSlice';

export const ProfileMenu = ({ closeFunc }) => {
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchInit = useSelector(state => state.items.query);
  const [searchError, setSearchError] = useState('');

  const handleLogout = (e) => {
    dispatch(authLogout());
  };

  const handleMyliked = (e) => {
    closeFunc();
    navigate('/liked');
  };

  const handlerSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchRef.current.value) {
      setSearchError('Please, enter something!');
    } else {
      setSearchError('');
      dispatch(itemsSetQuery(searchRef.current.value));
      closeFunc();
      navigate('/search');
    }
    console.log(searchRef.current.value);
  };

  return (
    <Dialog open keepMounted onClose={closeFunc}
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle>User Actions</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 3, mx: 2 }}>
          <form onSubmit={handlerSearchSubmit}>
            <Stack spacing={2}>
              <DialogContentText>
                Looking for something specific?
              </DialogContentText>
              <FormControlUnstyled variant="standard"
                sx={{ m: 1, mt: 3, width: '25ch' }} >
                <TextField inputRef={searchRef}
                  error={searchError !== ''}
                  variant="standard"
                  aria-describedby="search-text"
                  inputProps={{
                    'aria-label': 'search query text',
                  }}
                  defaultValue={searchInit}
                  helperText={searchError}
                />
                <Button type="submit">Search</Button>
              </FormControlUnstyled>
            </Stack>
          </form>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ my: 3, mx: 2 }}>
          <Stack spacing={2}>
            <Button variant="outlined" onClick={handleMyliked}>
              My Favourites
            </Button>
            <Button variant="outlined"
              onClick={() => {
                handleLogout();
                closeFunc();
              }}>Log Out</Button>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeFunc} variant="outlined">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

ProfileMenu.propTypes = {
  closeFunc: PropTypes.func,
};
