import {
    Button,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    StyleSheet,
    View,
    Image,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import "../../global.css";
import axios from "axios";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const user = {
            login: email,
            password: password,
        };

        const url = "https://www.spr311telegrambot.somee.com/api/account/login";
        axios
            .post(url, user)
            .then((response) => {
                if(response.status === 200) {
                    return response.data;
                }
                console.log(response);
            })
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: "https://www.go.ooo/img/bg-img/Login.jpg",
                    }}
                />
            </View>

            <View style={styles.form}>
                <Text style={styles.title}>Login</Text>

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

                <Button color="coral" title="Login" onPress={handleLogin} />
                <View className="my-4">
                    <Button title="Back" onPress={() => router.back()} />
                </View>
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
        height: 200,
    },
});
