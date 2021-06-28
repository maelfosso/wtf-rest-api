const escapeStringRegex = (str: string): string => str
  .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
  .replace(/-/g, '\\x2d');

export default escapeStringRegex;
