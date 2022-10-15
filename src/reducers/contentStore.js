const initialState = {
    contentloading: false,
    contentData : []
  };
  
  const contentStore = (state = initialState, action ) => {
      switch(action.type){
          case "CONTENTLOADER": {
            return {...state, contentloading:action.response }
          }
          case "GET_CONTENTDATA": {
            return { ...state, contentData: action.response, contentloading:false };
          }
          case "UPDATE_CONTENTDATA":{
            return { ...state, contentData: action.response, contentloading:false};
          }
          case "CONTENTFAIL":{
            return { ...state, contentloading: action.response };
          }
          default:
            return { ...state };
    }
  }
  
  export default contentStore;