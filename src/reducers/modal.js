const initialState = {
  messages: []
};

export const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REMOVE_MESSAGE": {
      let messages = state.messages;
      messages.shift();
      return Object.assign({}, state, { messages: messages });
    }
    case "ADD_MESSAGE": {
      const messages = state.messages.concat([action.payload]);
      return Object.assign({}, state, { messages: messages });
    }
    default: {
      return state;
    }
  }
};
