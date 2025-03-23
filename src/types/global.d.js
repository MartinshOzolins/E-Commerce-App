export const Roles = {
  ADMIN: "admin",
  MODERATOR: "moderator",
};

// Global declarations are not required in JavaScript
const CustomJwtSessionClaims = {
  metadata: {
    role: null,
  },
};

export default CustomJwtSessionClaims;
