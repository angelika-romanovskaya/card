const moduleName = 'podgroups'

const SET_INFO = `${moduleName}/SET_INFO`;

const defaultState = {
    podgroups : [],
};

export default (state = defaultState, {type, payload}) =>{
    switch (type){
        case SET_INFO:
            return {...state, podgroups: payload}
        default:
            return state
    }
};

export const setInfo = (data) => (dispatch) =>{
    dispatch({type: SET_INFO, payload: data})
}