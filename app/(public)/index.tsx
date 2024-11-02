import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startInstagramAuthFlow } = useOAuth({
    strategy: "oauth_facebook",
  });

  const data = useQuery(api.users.getAllUsers);

  console.log("~Index ~ data : ", data);

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.error("Google OAuth Error:", error);
    }
  };

  const handleInstagramLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startInstagramAuthFlow();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.error("Instagram OAuth Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/login.png")}
        style={styles.image}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>How would you like to use Threads?</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButtonContainer}
            onPress={handleInstagramLogin}
          >
            <View style={styles.loginButtonContent}>
              <Image
                source={require("@/assets/images/instagram.webp")}
                style={styles.instagram}
              />
              <Text style={styles.loginButtonText}>
                Continue with Instagram
              </Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={Colors.border}
              />
            </View>
            <Text style={styles.loginButtonSubtitle}>
              Log in or create a THreads profile with your Instagram account.
              With a profile, you can post, interact and get personalised
              recommendations.
            </Text>
          </TouchableOpacity>

          {/* Google login */}
          <TouchableOpacity
            style={styles.loginButtonContainer}
            onPress={handleGoogleLogin}
          >
            <View style={styles.loginButtonContent}>
              <Image
                source={require("@/assets/images/google.png")}
                style={styles.google}
              />
              <Text style={styles.loginButtonText}>Continue with Google</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={Colors.border}
              />
            </View>
            <Text style={styles.loginButtonSubtitle}>
              Log in or create a THreads profile with your Google account.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButtonContainer}>
            <View style={styles.loginButtonContent}>
              <Image
                source={require("@/assets/images/threads.png")}
                style={styles.google}
              />
              <Text style={styles.loginButtonText}>Use without a profile</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={Colors.border}
              />
            </View>
            <Text style={styles.loginButtonSubtitle}>
              Continue without logging in or creating a profile.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.switchAccount}>Switch accounts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 18,
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 20,
  },
  loginButtonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,

    backgroundColor: "#fff",
  },
  loginButtonText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 15,
  },
  instagram: {
    width: 40,
    height: 40,
  },
  google: {
    width: 50,
    height: 50,
  },
  loginButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loginButtonSubtitle: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    marginTop: 5,
    color: "#acacac",
  },
  switchAccount: {
    fontSize: 14,
    color: Colors.border,
    alignSelf: "center",
  },
});
