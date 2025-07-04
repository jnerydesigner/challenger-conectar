import * as bcrypt from 'bcrypt';

export const passwordHash = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
