const incrementPointsReducer = (state = {data: null}, action)=>{
    switch (action.type){
        case    'UPDATE_POINTS':
            return  {...state,data:action?.payload}

        default:
            return state;

    }
}

export default incrementPointsReducer;