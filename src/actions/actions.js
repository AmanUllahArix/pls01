import axios from 'axios';


export const profileFetch = () => {
    return (dispatch) => {
        dispatch({ type: "PLOADER", response: true });
        axios({
            method: "get",
            headers: {"arixauth" : localStorage.getItem("arixauth"), "arixrdx" : 'OK'},
            url: `${process.env.REACT_APP_APIURL}/lgn/gp`,
          })
            .then((response) => {
                dispatch({ type: "GET_USERDATA", response: response.data });
            })
            .catch((error) => {
                dispatch({ type: "PFAIL", response: false });
                localStorage.removeItem('arixauth');
            })
    }
}
