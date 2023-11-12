const moduleName = 'teacher'

const GET_TEACHER = `${moduleName}/GET_DATA`;

const defaultState = {
    teacher : [],
};

export default (state = defaultState, {type, payload}) =>{
    switch (type){
        case GET_TEACHER:
            return {...state, teacher: payload}
        default:
            return state;
    }
};

export const getTeacher = () => async(dispatch) =>{
    try{
        await fetch('https://bgaa.by/test').then((response)=>response.json()).then((data) => dispatch({type: GET_TEACHER, payload: data.teachers}))
    } catch(error){
        console.log(error)
    }
}