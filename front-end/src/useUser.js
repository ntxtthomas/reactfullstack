import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), function(user) {
      setUser(user);
      setIsLoading(false);
      });
    return () => unsubscribe();
    }, []);

  const getToken = async () => {
    if (!user) return null;
    return user.getIdToken();
  };

  return { user, isLoading, getToken };
}

export default useUser;