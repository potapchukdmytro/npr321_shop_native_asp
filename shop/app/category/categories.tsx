import {
    View,
    ListRenderItemInfo,
    Button,
    Image,
    StyleSheet,
    TextInput,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Category } from "@/store/category/types";
import {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
} from "@/store/category/categoryApi";
import "../../global.css";
import { ActivityIndicator } from "@/components/ActivityIndicator";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { Asset, launchImageLibrary, launchCamera } from "react-native-image-picker";

export default function CategoriesScreen() {
    const [categoryName, setCategoryName] = useState<string>("");
    const [photo, setPhoto] = useState<Asset | undefined>(undefined);

    const { data: categories, isLoading, isError } = useGetCategoriesQuery();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [createCategory] = useCreateCategoryMutation();

    const deleteHandler = async (id: string) => {
        await deleteCategory(id);
    };

    const createHandler = async () => {
        const category: Category = {
            id: "",
            image: "",
            name: categoryName
        }
        const res = await createCategory(category);
        if(!res.error) {
            setCategoryName("")
        }
    }  

    const selectImage = async () => {
        launchCamera({mediaType: "photo"}, response => {
            console.log(response);
        });
        console.log("in");
        await launchImageLibrary({mediaType: "photo"}, (response) => {
            console.log(response);
            
            if(response.didCancel || response.errorCode) {
                return;
            }

            if(response.assets) {
                setPhoto(response.assets[0])
            }
        })
    }

    const renderItem = ({ item }: ListRenderItemInfo<Category>) => {
        return (
            <View className="m-4">
                <Image
                    alt={item.name}
                    style={styles.stretch}
                    source={{
                        uri: item.image
                            ? item.image
                            : "https://www.thewall360.com/uploadImages/ExtImages/images1/def-638240706028967470.jpg",
                    }}
                />
                <ThemedText type="subtitle">{item.name}</ThemedText>
                <Button
                    onPress={() => deleteHandler(item.id)}
                    title="Delete"
                    color="darkred"
                />
            </View>
        );
    };

    return (
        <>
            {!isLoading && !isError ? (
                <FlatList
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <View className="p-4">
                    <ActivityIndicator />
                </View>
            )}
            <View>
                <TextInput
                    style={styles.input}
                    value={categoryName}
                    onChangeText={setCategoryName}
                    placeholder="Name"
                    keyboardType="default"
                />
                <Button color="darkgreen" onPress={() => selectImage()} title="Add image"/>
                <Button title="Add" onPress={createHandler}/>
            </View>
        </>
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
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 15,
    },
});
