import * as bcrypt from 'bcrypt';

export const generatePassword = async (password:string) => {
  const setRounds = 10;
  const salt = await bcrypt.genSalt(setRounds);
  const passwordHashed = await bcrypt.hash(password, salt);
  return passwordHashed;
}

export const comparePassword = async (password:string, existsPassword:string) => {
  const isPasswordCorrect = await bcrypt.compare(password, existsPassword);

  if (!isPasswordCorrect) {
      throw new Error('unauthrized password')
  }

  return true;
}