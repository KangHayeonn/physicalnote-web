import { getAccessToken } from "@/utils/tokenControl";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthenticated = getAccessToken();
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [router, pathname]);

  return <>{children}</>;
};

export default AuthLayout;
