import { FC } from "react";
import { TouchableOpacity, Text } from "react-native";

type ButtonProps = {
    text: string;
    onPress: () => void;
    textStyles?: string;
    containerStyles?: string;
};

const CustomButton: FC<ButtonProps> = ({
    onPress,
    text,
    textStyles,
    containerStyles,
}) => {
    return (
        <TouchableOpacity
            className={`bg-white rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <Text className={`font-semibold text-lg ${textStyles}`}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
