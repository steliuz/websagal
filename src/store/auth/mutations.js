

export const SET_USER = ( state, payload)  => {
    state.user = payload
}


export const SET_LOGOUT = ( state)  => {
    state.user = null
}

export const SET_TOKEN = ( state, payload)  => {
    localStorage.setItem("access_token", payload);
}