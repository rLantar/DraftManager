export enum AppActions {
    SET_USER = 'SET_USER',
    LOGOUT = 'LOGOUT'
}

export function setUser(user: any) {
    return {type: AppActions.SET_USER, user};
}

export function logout() {
    return {type: AppActions.LOGOUT};
}
