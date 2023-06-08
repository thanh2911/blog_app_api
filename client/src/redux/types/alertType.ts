import { IAlert } from "../../utils/TypesScript";

export const ALERT = 'ALERT';

export interface IAlertType {
    type: typeof ALERT,
    payload: IAlert
}