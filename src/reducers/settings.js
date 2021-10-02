const defaultState = {
  screenWidth: window.document.documentElement.clientWidth,
  screenHeight: window.document.documentElement.clientHeight,
  choiceFile: null,
  choiceGroup: null,
  choiceSubgroup: null,
  choiceItem: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SETTINGS_RESIZE':
      const {screenWidth, screenHeight} = action.payload;
      return { ...state, screenWidth, screenHeight };
    case 'SETTINGS_ART_CHOICE':
      return { ...state, ...action.payload };
    default: return state;
  }
}
