import streams from "../api/streams";
import history from "../history";

export const SIGN_IN = 'SIGN_IN';
export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  }
};

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => {
  return {
    type: SIGN_OUT
  }
};

export const CREATE_STREAM = 'CREATE_STREAM';
export const createStream = values => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const res = await streams.post('/streams', {
    ...values,
    userId
  });
  dispatch({
    type: CREATE_STREAM,
    payload: res.data
  });
  history.push('/');
};

export const FETCH_STREAMS = 'FETCH_STREAMS';
export const fetchStreams = () => async dispatch => {
  const res = await streams.get('/streams');
  dispatch({
    type: FETCH_STREAMS,
    payload: res.data
  })
};

export const FETCH_STREAM = 'FETCH_STREAM';
export const fetchStream = id => async dispatch => {
  const res = await streams.get(`/streams/${id}`);
  dispatch({
    type: FETCH_STREAM,
    payload: res.data
  })
};

export const EDIT_STREAM = 'EDIT_STREAM';
export const editStream = (id, values) => async dispatch => {
  const res = await streams.patch(`/streams/${id}`, values);
  dispatch({
    type: EDIT_STREAM,
    payload: res.data
  });
  history.push('/');
};

export const DELETE_STREAM = 'DELETE_STREAM';
export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({
    type: DELETE_STREAM,
    payload: id
  });
  history.push('/');
};