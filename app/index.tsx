import { Text, SafeAreaView, ImageBackground, View } from "react-native";
import beachImage from "@/assets/meditation-images/beach.webp";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import AppGradient from "@/components/AppGradient";

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View className="flex-1">
            <ImageBackground
                source={beachImage}
                resizeMode="cover"
                className="flex-1"
            >
                <AppGradient
                    colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}
                >
                    <SafeAreaView className="flex-1 px-1 justify-between">
                        <View>
                            <Text className="text-center text-white font-bold text-4xl">
                                Simple Meditation
                            </Text>
                            <Text className="text-center text-white text-normal text-2xl mt-3">
                                Simplifying Meditation for Everyone
                            </Text>
                        </View>
                        <View>
                            <CustomButton
                                text="Get Started"
                                onPress={() => router.push("/nature-meditate")}
                            />
                        </View>
                        <StatusBar style="light" />
                    </SafeAreaView>
                </AppGradient>
            </ImageBackground>
        </View>
    );
}
