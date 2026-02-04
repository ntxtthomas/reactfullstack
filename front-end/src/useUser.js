import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useUser() {
  const [isloading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), function(user) {
      setUser(user);
      setIsLoading(false);
      });
    return () => unsubscribe();
    }, []);

  return { user, isloading };
}

export default useUser;