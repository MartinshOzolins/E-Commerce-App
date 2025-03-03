// To implement role-based access control:
// 1. In the Clerk dashboard, under the "Configure" section within "Sessions," edit the "Customize session token" setting by adding the following:
// {
//   "metadata": "{{user.public_metadata}}"
// }
// This ensures that the returned user metadata includes the property user.public_metadata.

// 2. In the "Users" section, locate the "Metadata" section under "Public," where you can store additional properties such as "role:admin." This will be included in the returned values.

// 3. Configure middleware.js within the 'src' folder.

export const Roles = {
  ADMIN: "admin",
  MODERATOR: "moderator",
};

// Global declarations are not required in JavaScript
const CustomJwtSessionClaims = {
  metadata: {
    role: null, // You can also set a default value here
  },
};

export default CustomJwtSessionClaims;
