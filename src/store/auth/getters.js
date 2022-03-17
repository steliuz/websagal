

// export const userRole = (state) => {
//     if(state.user.role == 1) {
//         return 'admin'
//     }else if ( state.user.role == 2) {
//         return 'Supervisor'
//     }{
//         return 'Bodega'
//     }
//     // return state.user.role
// }
export const isAdmin = (state) => {
    return state.user && state.user.role == 1
}

export const isSupervisor = (state) => {
    return state.user && state.user.role == 2
}

export const isCellar = (state) => {
    return state.user && state.user.role == 3
}