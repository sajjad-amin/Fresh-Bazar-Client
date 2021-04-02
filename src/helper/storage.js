export const setLoggedInData = data => {
    localStorage.setItem('user',data)
}
export const getLoggedInData = () => {
    const user = localStorage.getItem('user')
    if (user) {
        return JSON.parse(user)
    } else {
        return {}
    }
}
export const clearLoggedInData = () => {
    localStorage.removeItem('user')
}