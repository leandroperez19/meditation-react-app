import TimerProvider from "@/context/TimerContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    if (!fontsLoaded) return null;
    if (!fontsLoaded && !error) return null;

    return (
        <TimerProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                    name="meditate/[id]"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="(modal)/adjust-meditation-duration"
                    options={{
                        headerShown: false,
                        presentation: "modal",
                        animation: "slide_from_bottom",
                    }}
                />
            </Stack>
        </TimerProvider>
    );
};

export default RootLayout;
