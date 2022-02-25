/**
 * Takes a string and checks whether it matches a certain regex
 * @param password - the password string
 * @returns - boolean for whether password matches the expected regex
 */

export const passwordCheck = (password: string): boolean => {
    const passwordReg = new RegExp("(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])");
    return passwordReg.test(password);
};