const initialState = {
  objetosAPU : [], 
  llavesProyectos: []
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_OBJETOSAPU':
      return {
        ...state,
        objetosAPU: action.payload, 
      };
    case 'UPDATE_LLAVES_PROYECTOS':
      return {
        ...state,
        llavesProyectos: action.payload, 
      };                                                         
    default:
      return state;
  }
};

export default counterReducer;
