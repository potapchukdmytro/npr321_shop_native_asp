import { View, Text, ListRenderItemInfo } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ICategory } from "./types";

export default function CategoriesScreen() {
    const categories = [
        { id: "1", name: "food" },
        { id: "2", name: "shoes" },
        { id: "3", name: "clothes" },
        { id: "4", name: "phones" },
        { id: "5", name: "tv" },
    ];

    const renderItem = ({item}: ListRenderItemInfo<ICategory>) => {
        return (
            <View>
                <Text className="text-center">{item.name}</Text>
            </View>
        );
    };

    return (
        <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    );
}
