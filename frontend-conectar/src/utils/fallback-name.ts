export const fallbackNameCreate = (name: string) => {
  const splitName = name.trim().split(" ");
  const firstName = splitName[0];
  const lastName = splitName[1];

  const letterOne = firstName.charAt(0).toUpperCase();
  const letterTwo = lastName.charAt(0).toUpperCase();

  return `${letterOne}${letterTwo}`;
};
