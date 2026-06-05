import bcrypt from "bcryptjs";

export const saveGlobalPassword=async(password)=>{
    let hashedPassword=bcrypt.hashSync(password,10)
      await window.electronAPI.setGlobalPassword(hashedPassword
      );
}
export const checkGlobalPassword=async(password)=>{

    let HashedDefaultPassword=bcrypt.hashSync("default",10)
    let HashedGlobalPassword=await window.electronAPI.getGlobalPassword();
    let result=bcrypt.compareSync(password,HashedGlobalPassword)
    return result
}