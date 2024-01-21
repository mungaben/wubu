import bcrypt from 'bcrypt';


export const hashed_password=async (password:string) => {
    //generate salt
    const salt = await bcrypt.genSalt(10);
    //hash password
    const hashedPassword = bcrypt.hash(password, salt);
    // return hashed password
    return hashedPassword;
    
}