import { CREATE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY, DELETE_CATEGORY ,ICategoryType } from "../types/categoryType";
import { ICategory } from "../../utils/TypesScript";

const categoryReducer = (
    state: ICategory[] = [], action: ICategoryType): ICategory[] => {
    switch(action.type) {
        case CREATE_CATEGORY: 
            return [action.payload, ...state]
        case GET_CATEGORIES:
            return action.payload
        case UPDATE_CATEGORY:
            return state.map(
                item => item._id=== action.payload._id
                ? {...item, name: action.payload.name}
                : item
            )
            case DELETE_CATEGORY:
                return state.filter(
                    item => item._id !== action.payload
                    
                )
        default: 
            return state

    }
}

export default categoryReducer;