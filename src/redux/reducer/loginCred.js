const initialState = {
    username:'admin',
    password:'Admin@123',
    validUser: false
}

export default function handleUserAuth(state = initialState,action) {
    console.log("logincred",action.payload);
    
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                validUser: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                validUser: action.payload
            }
        default:
            return state;
    }
}