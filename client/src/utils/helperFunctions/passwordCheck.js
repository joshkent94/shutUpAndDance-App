export const passwordCheck = (password) => {
    const passwordReg = new RegExp("(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])");
    return passwordReg.test(password);
};