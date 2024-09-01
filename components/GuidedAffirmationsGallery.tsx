import { View, Text, FlatList, Pressable, Image } from "react-native";
import React, { FC } from "react";
import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";
import { Link } from "expo-router";

type GuideAffirmationsGalleryProps = {
    title: string;
    previews: GalleryPreviewData[];
};

const GuidedAffirmationsGallery: FC<GuideAffirmationsGalleryProps> = ({
    title,
    previews,
}) => {
    return (
        <View className="my-5">
            <View className="mb-2">
                <Text className="font-bold text-white text-xl">{title}</Text>
            </View>
            <View className="space-y-2">
                <FlatList
                    data={previews}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Link href={`/affirmations/${item.id}`} asChild>
                            <Pressable>
                                <View className="h-36 w-32 rounded-md mr-4">
                                    <Image
                                        source={item.image}
                                        resizeMode="cover"
                                        className="w-full h-full"
                                    />
                                </View>
                            </Pressable>
                        </Link>
                    )}
                    horizontal
                />
            </View>
        </View>
    );
};

export default GuidedAffirmationsGallery;
