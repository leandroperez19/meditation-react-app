import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import AppGradient from "@/components/AppGradient";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { Audio } from "expo-av";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData";
import { TimerContext } from "@/context/TimerContext";

const Meditate = () => {
    const { id } = useLocalSearchParams();
    const { setDuration: setSecondsRemaining, duration: secondsRemaining } =
        useContext(TimerContext);

    // const [secondsRemaining, setSecondsRemaining] = useState(10);
    const [isMeditating, setMeditating] = useState(false);
    const [audioSound, setSoundAudio] = useState<Audio.Sound>();
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (secondsRemaining === 0) {
            setMeditating(false);

            return;
        }

        if (isMeditating) {
            timerId = setTimeout(() => {
                setSecondsRemaining(secondsRemaining - 1);
            }, 1000);
        }

        return () => clearTimeout(timerId);
    }, [secondsRemaining, isMeditating]);

    const toggleMeditationSessionStatus = async () => {
        if (secondsRemaining === 0) setSecondsRemaining(10);

        setMeditating(!isMeditating);

        await togglePlayPause();
    };

    const togglePlayPause = async () => {
        const sound = audioSound ? audioSound : await initializeSound();

        const status = await sound?.getStatusAsync();

        if (status?.isLoaded && !isPlayingAudio) {
            await sound.playAsync();
            setIsPlayingAudio(true);
            return;
        }
        await sound.pauseAsync();
        setIsPlayingAudio(false);
    };

    const initializeSound = async () => {
        const audioFile = MEDITATION_DATA[Number(id) - 1].audio;

        const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFile]);

        setSoundAudio(sound);
        return sound;
    };

    const handleAdjustDuration = () => {
        if (isMeditating) toggleMeditationSessionStatus();

        router.push("/(modal)/adjust-meditation-duration");
    };

    const formattedTimeMinutes = String(
        Math.floor(secondsRemaining / 60)
    ).padStart(2, "0");
    const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

    useEffect(() => {
        return () => {
            audioSound?.unloadAsync();
        };
    }, [audioSound]);

    useEffect(() => {
        if (secondsRemaining === 0) {
            togglePlayPause();
            initializeSound();
        }
    }, [secondsRemaining]);

    useEffect(() => {
        return () => setSecondsRemaining(10);
    }, []);

    return (
        <View className="flex-1">
            <ImageBackground
                source={MEDITATION_IMAGES[Number(id) - 1]}
                resizeMode="cover"
                className="flex-1"
            >
                <AppGradient colors={["transparent", "rgba(0, 0, 0, 0.8)"]}>
                    <Pressable
                        onPress={() => router.back()}
                        className="absolute top-16 left-6 z-10"
                    >
                        <AntDesign name="leftcircleo" size={50} color="white" />
                    </Pressable>
                    <View className="flex-1 justify-center">
                        <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
                            <Text className="text-4xl text-blue-800 font-rmono">
                                {formattedTimeMinutes}:{formattedTimeSeconds}
                            </Text>
                        </View>
                    </View>

                    <View className="mb-5">
                        <CustomButton
                            text="Adjust duration"
                            onPress={handleAdjustDuration}
                        />
                        <CustomButton
                            text={isMeditating ? "Stop" : "Start Meditation"}
                            onPress={toggleMeditationSessionStatus}
                            containerStyles="mt-4"
                        />
                    </View>
                </AppGradient>
            </ImageBackground>
        </View>
    );
};

export default Meditate;
