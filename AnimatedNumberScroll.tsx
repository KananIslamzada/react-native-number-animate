import React, { memo, useCallback, useEffect } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import Animated, { EasingFunction, cancelAnimation, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { EntryOrExitLayoutType } from './index';

interface IAnimatedNumberScroll {
    value: number;
    enteringAnimation?: EntryOrExitLayoutType;
    exitingAnimation?: EntryOrExitLayoutType;
    disableDefaultAnimations?: boolean;
    textContainerStyle?: ViewStyle;
    textStyle?: TextStyle | TextStyle[];
    duration?: number;
    easing?: EasingFunction;
    textHeight: number

}
const scrollArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const AnimatedNumberScroll: React.FC<IAnimatedNumberScroll> = ({
    value = 0,
    enteringAnimation,
    exitingAnimation,
    disableDefaultAnimations,
    textContainerStyle,
    textStyle,
    duration,
    easing,
    textHeight
}) => {

    const translateY = useSharedValue(0);

    useEffect(() => {
        translateY.value = withTiming(value * textHeight, { duration, easing });

        return () => cancelAnimation(translateY);
    }, [value]);

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: -translateY.value }]
        }
    }, []);


    const _renderItem = useCallback((item: number) => {
        return (
            <View
                key={`index-row-${item}`}
                style={textContainerStyle} >
                <Text style={textStyle}>{item}</Text>
            </View >
        );
    }, []);

    return (
        <Animated.View
            style={containerStyle}
            entering={disableDefaultAnimations ? undefined : enteringAnimation}
            exiting={disableDefaultAnimations ? undefined : exitingAnimation}
        >
            {scrollArr.map(_renderItem)}
        </Animated.View>
    );
};


export default memo(AnimatedNumberScroll);