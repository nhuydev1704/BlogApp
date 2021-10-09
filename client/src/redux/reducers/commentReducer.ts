import {
    CREATE_COMMENT,
    ICommentState,
    ICommentType
} from '../types/commentType'

const initialState = {
    data: [],
    total: 1
}


const commentReducer = (state: ICommentState = initialState, action: ICommentType): ICommentState => {
    switch (action.type) {
        case CREATE_COMMENT:
            return {...state, data: [action.payload, ...state.data]}
        default:
            return state
    }
}


export default commentReducer;