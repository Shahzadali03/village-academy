import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actionType"

const getStoredUser = () => {
    try {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    } catch {
        return null;
    }
};

const initialValue = {
    loading: false,
    user: getStoredUser(),
    success: false,
};

const authReducer = (state = initialValue, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {
                ...state,
                loading: false,
                success: true,
                user: action.payload.user,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
            };
        default:
            return state;
    }
};

export default authReducer;
