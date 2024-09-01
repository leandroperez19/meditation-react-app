import { SafeAreaView } from "react-native";
import { FC, ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";

type AppGradientProps = {
    children: ReactNode;
    colors: string[];
};

const AppGradient: FC<AppGradientProps> = ({ children, colors }) => {
    return (
        <LinearGradient colors={colors} className="flex-1">
            <SafeAreaView className="flex-1 px-5 pb-5 pt-12">
                {children}
            </SafeAreaView>
        </LinearGradient>
    );
};

export default AppGradient;
