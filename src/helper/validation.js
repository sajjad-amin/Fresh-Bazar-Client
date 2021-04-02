export const nameIsValid = name => {
    return name.length > 1
}
export const emailIsValid = email => {
    return /\S+@\S+\.\S+/.test(email)
}
export const passwordIsValid = password => {
    return password.length >= 6
}
export const passwordIsMatched = (password, confirmPassword) =>{
    return password === confirmPassword
}