export default (state, action) => {
  switch (action.type) {
    case 'SET_GAME_PARAMS':
      const { height, width, mines } = action.payload;
      return {
        ...state,
        gameParams: {
          ...state.gameParams,
          height,
          width,
          mines,
        },
      };

    case 'TOGGLE_SOUND':
      const { isSfx } = state.gameParams;
      return {
        ...state,
        gameParams: {
          ...state.gameParams,
          isSfx: !isSfx,
        },
      };

    case 'TOGGLE_THEME':
      const { theme } = state.gameParams;
      return {
        ...state,
        gameParams: {
          ...state.gameParams,
          theme: !theme,
        },
      };

    case 'TOGGLE_ANIMATION':
      const { animation } = state.gameParams;
      return {
        ...state,
        gameParams: {
          ...state.gameParams,
          animation: !animation,
        },
      };

    default:
      return state;
  }
};
