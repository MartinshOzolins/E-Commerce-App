"use client";

import { UserProfile } from "@clerk/nextjs";

// This page uses the UserProfile component from Clerk to display the user's profile.
// The folder structure is an optional catch-all segment, as Clerk automatically adds the necessary
// endpoints based on what the user interacts with in their profile (like viewing or editing profile details).

// The Link within navigation component is set to "/user-profile", which is this optional catch-all segment.
//Once clicked, it opens this component, and Clerk will automatically add additional endpoints based on user interactions within the <UserProfile/> component, such as "/edit-profile", "/change-name", etc.

import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export default function UserProfilePage() {
  return (
    <div className="flex justify-center items-center py-8 min-h-screen">
      <UserProfile path="/user-profile">
        <UserProfile.Link
          label="Orders"
          url="/orders"
          labelIcon={
            <LocalShippingIcon
              sx={{
                width: "18px",
                height: "18px", // Ensures proper icon size
                // Ensures alignment with text
              }}
            />
          }
        />
      </UserProfile>
    </div>
  );
}
