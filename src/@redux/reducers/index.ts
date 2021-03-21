import {AppActions} from '../actions';
import {AnyAction} from 'redux';

type User = {
    name: string,
    token: string,
}

export interface AppStore {
    user?: User;
}

const initialState: AppStore = {};

const rootReducer = (state = initialState, action: AnyAction) => {
    if (action.type === AppActions.SET_USER) {
        return {...state, user: action.user};
    }
    if (action.type === AppActions.LOGOUT) {
        return {...state, user: undefined};
    }
    return state;
};

export default rootReducer;
