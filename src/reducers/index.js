import { combineReducers } from 'redux';
import overlays from './overlays';
import settings from './settings';
import data from './data';

export default combineReducers({
  overlays,
  settings,
  data
});
