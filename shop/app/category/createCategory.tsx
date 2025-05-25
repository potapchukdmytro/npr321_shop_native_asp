import { useState } from "react";
import { TextInput, Button, StyleSheet, Image, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import * as ImagePicker from "expo-image-picker";
import { useCreateCategoryMutation } from "@/store/category/categoryApi";
import { router } from "expo-router";

export default function CreateCategoryScreen() {
    const [categoryName, setCategoryName] = useState<string>("");
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const [createCategory] = useCreateCategoryMutation();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "videos"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    const submitHandler = async () => {
        const formData = new FormData()
        formData.append("name", categoryName);

        if (image) {
            const response = await fetch(image.uri);    
            const blob = await response.blob();
            const file = new File([blob], image.fileName ? image.fileName : "image", {
                type: blob.type,
                lastModified: Date.now()
            });

            formData.append("image", file);
        }

        const response = await createCategory(formData);
        console.log(response);
        if(!response.error) {
            router.navigate('/categories')
        }
    };

    return (
        <ThemedView>
            <View className="m-2">
                <TextInput
                    style={styles.input}
                    value={categoryName}
                    onChangeText={setCategoryName}
                    placeholder="Name"
                    keyboardType="default"
                />
            </View>

            <View className="m-auto">
                <Image
                    alt={categoryName}
                    style={styles.stretch}
                    source={{
                        uri: image
                            ? image.uri
                            : "https://www.thewall360.com/uploadImages/ExtImages/images1/def-638240706028967470.jpg",
                    }}
                />
            </View>

            <View className="m-2">
                <Button
                    color="darkgreen"
                    onPress={() => pickImage()}
                    title="Add image"
                />
            </View>

            <View className="m-2">
                <Button
                    color="coral"
                    onPress={() => submitHandler()}
                    title="Submit"
                />
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stretch: {
        width: 400,
        height: 150,
        resizeMode: "stretch",
        marginBottom: 15,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 2,
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 15,
    },
    button: {
        margin: 5,
    },
});
