import { UserProfile } from "@clerk/nextjs";

// This page uses the UserProfile component from Clerk to display the user's profile.
// The folder structure is an optional catch-all segment, as Clerk automatically adds the necessary
// endpoints based on what the user interacts with in their profile (like viewing or editing profile details).

// The Link within navigation component is set to "/user-profile", which is this optional catch-all segment.
//Once clicked, it opens this component, and Clerk will automatically add additional endpoints based on user interactions within the <UserProfile/> component, such as "/edit-profile", "/change-name", etc.

export default function UserProfilePage() {
  return (
    <div className="flex justify-center items-center py-8">
      <UserProfile path="/user-profile" />
    </div>
  );
}
