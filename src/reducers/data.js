const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'DATA_LOAD':
      return { ...defaultState, ...action.payload };
    default: return state;
  }
}
