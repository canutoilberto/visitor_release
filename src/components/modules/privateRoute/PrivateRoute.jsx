import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/api/formStore";
import LoadingSpinner from "@/components/modules/loadingSpinner/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const user = useFormStore((state) => state.user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) return null;

  return children;
};

export default PrivateRoute;
