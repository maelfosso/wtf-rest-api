const escapeStringRegex = (str: string): string => {
  return str
    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
    .replace(/-/g, '\\x2d');
}

export default escapeStringRegex;
