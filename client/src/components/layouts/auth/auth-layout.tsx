import { AuthImagePattern } from "../chat/auth-image-pattern";

export const AuthLayout = ({children}:{children : React.ReactNode}) => {
  return (
    <>
      <div className="min-h-screen grid lg:grid-cols-2 bg-gray-900">
        {/* left side */}
        {children}
        {/* Right side */}
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with others and share your thoughts"
        />
      </div>
    </>
  );
};
