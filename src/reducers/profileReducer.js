const initialState = {
    ploading: false,
    userData : {}
  };
  
  const profileReducer = (state = initialState, action ) => {
      switch(action.type){
          case "PLOADER": {
            return {...state, ploading:action.response }
          }
          case "GET_USERDATA": {
            return { ...state, userData: action.response, ploading:false };
          }
          case "UPDATE_USERDATA":{
            return { ...state, userData: action.response, ploading:false};
          }
          case "PFAIL":{
            return { ...state, ploading: action.response };
          }
          default:
            return { ...state };
    }
  }
  
  export default profileReducer;
  