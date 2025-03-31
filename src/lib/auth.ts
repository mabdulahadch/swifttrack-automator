
// This is a simplified auth utility with no actual authentication 
// since we're removing login/registration functionality

export const generateToken = () => {
  return "mock-token";
};

export const verifyToken = () => {
  return { id: "guest" };
};

export const getUserFromToken = () => {
  return { id: "guest" };
};
