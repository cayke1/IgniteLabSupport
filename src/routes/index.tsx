import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { SingIn } from "../screens/SingIn";
import { AppRoutes } from "./app.routes";
import { Loading } from "../components/Loading";

export function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((res) => {
      setUser(res);
      setIsLoading(false);
    });

    return subscriber;
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SingIn />}
    </NavigationContainer>
  );
}
