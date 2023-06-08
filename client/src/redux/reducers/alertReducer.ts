import { ALERT, IAlertType } from "../types/alertType";
import { IAlert } from "../../utils/TypesScript";

const alertReducer = (state: IAlert = {}, action: IAlertType): IAlert => {
    switch(action.type) {
        case ALERT: 
            return action.payload
        default: 
            return state

    }
}

export default alertReducer;