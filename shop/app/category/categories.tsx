import {
    View,
    ListRenderItemInfo,
    Button,
    Image,
    StyleSheet
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Category } from "@/store/category/types";
import {
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
} from "@/store/category/categoryApi";
import "../../global.css";
import { ActivityIndicator } from "@/components/ActivityIndicator";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";

export default function CategoriesScreen() {
    const { data: categories, isLoading, isError } = useGetCategoriesQuery();
    const [deleteCategory] = useDeleteCategoryMutation();

    const deleteHandler = async (id: string) => {
        await deleteCategory(id);
    };

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
            <Button title="Add" onPress={() => router.navigate('/category/createCategory')}/>
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
    }
});
