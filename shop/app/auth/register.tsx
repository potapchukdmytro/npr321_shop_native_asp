import {
    Button,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    StyleSheet,
    View,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useRegisterMutation } from "@/store/authApi";
import "../../global.css";

export default function RegisterScreen() {
    const [email, setEmail] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [validError, setValidError] = useState<string | null>(null);
    const [register] = useRegisterMutation();
    const router = useRouter();    

    const handleRegister = async () => {
        if(validError) {
            setValidError(null);
        }

        try {
            if (confirmPassword !== password) {
                setValidError("Passwords do not match");
                return;
            }

            const result = await register({
                userName,
                email,
                password,
            }).unwrap();
            if (!result.success) {
                throw new Error(result.message);
            }
            router.replace("/auth/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.form}>
                <Text style={styles.title}>Register</Text>

                <TextInput
                    style={styles.input}
                    value={userName}
                    onChangeText={setUserName}
                    placeholder="Username"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm password"
                    secureTextEntry
                    autoCapitalize="none"
                />

                <Button
                    color="coral"
                    title="Register"
                    onPress={handleRegister}
                />
                <View className="my-4">
                    <Button title="Back" onPress={() => router.back()} />
                </View>
                <View>
                    <Text
                        onPress={() => router.replace("/auth/login")}
                        className="text-center text-blue-500"
                    >
                        Have account? Login.
                    </Text>
                </View>
                {validError && (
                    <View>
                        <Text className="text-center text-red-500">
                            {validError}
                        </Text>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
    },
    form: {
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        marginTop: 100,
        color: "coral",
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 15,
    },
    logoContainer: {
        marginBottom: 20,
        flex: 0,
        alignItems: "center",
    },
    logo: {
        width: 400,
        height: 100,
    },
});
