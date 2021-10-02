const defaultState = {
  main: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'OVERLAYS_MAIN_STATE':
      return { ...defaultState, main: action.payload };
    default: return state;
  }
}
