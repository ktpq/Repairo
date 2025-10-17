function generateAccessCodes(dormId, count) {
  const codes = new Set();

  while (codes.size < count) {
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = `${dormId}-${randomPart}`;
    codes.add(code);
  }

  return Array.from(codes);
}

function generateTechCode() {
    let code = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // ตัวเลข+ตัวอักษร
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        code += chars[randomIndex];
    }
    return code;
}

module.exports = {
  generateAccessCodes,
  generateTechCode,
};
