export function checkAuthUser(data) {
    return {
        type: "LOGIN",
        payload: data

    }
}

export function removeAuthUser(data) {
    return {
        type: "LOGOUT",
        payload: data

    }
}