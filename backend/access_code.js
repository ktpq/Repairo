function generateAccessCodes(dormId, count) {
  const codes = new Set();

  while (codes.size < count) {
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = `${dormId}-${randomPart}`; 
    codes.add(code);
  }

  return Array.from(codes);
}

module.exports = generateAccessCodes