import { Image, StyleSheet, Platform, Text, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { clearUser } from "@/store/slices/authSlice";
import "../../global.css";

export default function HomeScreen() {
    const { isAuth, email } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(clearUser());
    }   

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <Image
                    source={require("@/assets/images/partial-react-logo.png")}
                    style={styles.reactLogo}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">NPR321</ThemedText>
                <HelloWave />
            </ThemedView>
            {email && (
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">{email}</ThemedText>
                </ThemedView>
            )}
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 1: Try it</ThemedText>
                <ThemedText>
                    Edit{" "}
                    <ThemedText type="defaultSemiBold">
                        app/(tabs)/index.tsx
                    </ThemedText>{" "}
                    to see changes. Press{" "}
                    <ThemedText type="defaultSemiBold">
                        {Platform.select({
                            ios: "cmd + d",
                            android: "cmd + m",
                            web: "F12",
                        })}
                    </ThemedText>{" "}
                    to open developer tools.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 2: Explore</ThemedText>
                <ThemedText>
                    Tap the Explore tab to learn more about what's included in
                    this starter app.
                </ThemedText>
                <Text className="font-bold">Hello world</Text>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">
                    Step 3: Get a fresh start
                </ThemedText>
                <ThemedText>
                    When you're ready, run{" "}
                    <ThemedText type="defaultSemiBold">
                        npm run reset-project
                    </ThemedText>{" "}
                    to get a fresh{" "}
                    <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
                    directory. This will move the current{" "}
                    <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
                    <ThemedText type="defaultSemiBold">app-example</ThemedText>.
                </ThemedText>
            </ThemedView>

            {!isAuth ? (
                <ThemedView>
                    <Button
                        title="Login"
                        onPress={() => router.navigate("/auth/login")}
                    />
                </ThemedView>
            ) : (
                <ThemedView>
                    <Button
                        title="Logout"
                        onPress={logout}
                    />
                </ThemedView>
            )}
            <ThemedView>
                    <Button
                        title="Categories"
                        onPress={() => router.navigate('/category/categories')}
                    />
                </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
