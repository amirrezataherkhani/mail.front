import sidebars from './sidebars.reducer';
import user from './user.reducer';
import contacts from './contacts.reducer';
import chat from './chat.reducer';
import backButton from './handleBack.reducer';
import {combineReducers} from 'redux';

const reducer = combineReducers({
  sidebars,
  user,
  contacts,
  chat,
  backButton,
});

export default reducer;
