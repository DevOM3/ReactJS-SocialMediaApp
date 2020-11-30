export const initialState = {
    user: null,
    active: "home",
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_ACTIVE: "SET_ACTIVE",
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionTypes.SET_ACTIVE:
            return {
                ...state,
                active: action.active,
            }
        default:
            return state;
    }
};

export default reducer;
