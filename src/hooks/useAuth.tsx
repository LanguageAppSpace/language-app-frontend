import { useEffect } from "react";
import { auth } from "@/utils/firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setLoadingUser,
  selectCurrentUser,
  selectIsLoadingUser,
  setAccessToken,
} from "@/redux/auth/authSlice";
import { showNotification } from "@/redux/notification/notificationSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isUserLoading = useSelector(selectIsLoadingUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const { uid, displayName, email } = authUser;
        dispatch(
          setUser({
            uid,
            displayName,
            email,
          })
        );
        authUser.getIdToken().then((accessToken) => {
          dispatch(setAccessToken(accessToken));
        });
      } else {
        dispatch(
          showNotification({
            message: "You have been logged out",
            severity: "success",
          })
        );
      }
      dispatch(setLoadingUser(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { user, isUserLoading };
};

export default useAuth;
