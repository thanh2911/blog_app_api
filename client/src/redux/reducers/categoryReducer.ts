import { CREATE_CATEGORY, GET_CATEGORIES ,ICategoryType } from "../types/categoryType";
import { ICategory } from "../../utils/TypesScript";

const categoryReducer = (
    state: ICategory[] = [], action: ICategoryType): ICategory[] => {
    switch(action.type) {
        case CREATE_CATEGORY: 
            return [action.payload, ...state]
        case GET_CATEGORIES:
            return action.payload
        default: 
            return state

    }
}

export default categoryReducer;