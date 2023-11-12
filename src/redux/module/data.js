const moduleName = 'data'

const GET_DATA = `${moduleName}/GET_DATA`;
const POST_DATA = `${moduleName}/POST_DATA`;
const SET_DATA = `${moduleName}/SET_DATA`;

const defaultState = {
    data : [],
};

export default (state = defaultState, {type, payload}) =>{
    switch (type){
        case GET_DATA:
            return {...state, data: payload}
        case POST_DATA:
            return state
        case SET_DATA:
            return {...state, data: state.data.map((item,i) => item.podgroups = {...item, podgroups: payload[i]})}
        default:
            return state
    }
};

export const getData = () => async(dispatch) =>{
    try{
        await fetch('https://bgaa.by/test').then((response)=>response.json()).then((data) => dispatch({type: GET_DATA, payload: data.data}))
    } catch(error){
        console.log(error)
    }
}

export const setData = (podgroups) => (dispatch) =>{
    dispatch({type: SET_DATA, payload: podgroups})
}

export const postData = (data) => async (dispatch) =>{
    try{
        await fetch('https://bgaa.by/test_result', {
            mode: 'no-cors',
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
              },
            body: JSON.stringify(data)
        });
        dispatch({type: POST_DATA});
    } catch(error){
        console.log(error)
    }
}