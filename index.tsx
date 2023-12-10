import React, { memo, useCallback, useMemo, useRef } from 'react';
import { View, Text, TextStyle, ViewStyle, } from 'react-native';
import AnimatedNumberScroll from './AnimatedNumberScroll';
import Animated, { AnimatedProps, BaseAnimationBuilder, Easing, EasingFunction, EntryExitAnimationFunction, FadeIn, FadeOut, LinearTransition, } from 'react-native-reanimated';
import { ReanimatedKeyframe } from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation/animationBuilder/Keyframe';

export type EntryOrExitLayoutType = BaseAnimationBuilder | typeof BaseAnimationBuilder | EntryExitAnimationFunction | ReanimatedKeyframe;
interface IAnimatedNumber {
    number: number | string;
    enteringAnimation?: EntryOrExitLayoutType;
    exitingAnimation?: EntryOrExitLayoutType;
    commaLayoutAnimation?: AnimatedProps<Text>['layout']
    textStyle?: TextStyle,
    containerStyle?: ViewStyle,
    disableDefaultAnimations?: boolean;
    textContainerStyle?: ViewStyle;
    duration?: number;
    easing?: EasingFunction;
    textHeight?: number;
}

const DEFAULT_HEIGHT = 25;
const AnimatedNumber: React.FC<IAnimatedNumber> = ({
    number,
    enteringAnimation,
    exitingAnimation,
    commaLayoutAnimation,
    textStyle,
    containerStyle,
    disableDefaultAnimations,
    textContainerStyle,
    duration,
    easing,
    textHeight = DEFAULT_HEIGHT
}) => {

    const commaArr = useRef<string[]>([]);
    const remain = useRef<number>(0);
    const prevNumber = useRef<number | string>();

    const handleNumber = (number: number | string) => {
        if (prevNumber.current !== number) {
            remain.current = 0
            prevNumber.current = number;
        }
        const str = typeof number === "number" ? number.toString() || "" : number;
        const splitted = str.split("");
        return splitted;
    }

    const currentNumber = useMemo(() => handleNumber(number), [number]);

    const _renderNumber = useCallback((item: string, index: number) => {
        if (['.', ','].includes(item)) {
            let current = commaArr.current[remain.current];
            if (!current) {
                current = `comma-${index}`;
                commaArr.current.push(current);
            }
            remain.current++
            return <Animated.View
                key={`index-column-${current}`}
                style={textContainerStyle}
                layout={disableDefaultAnimations ? undefined : commaLayoutAnimation}
                entering={disableDefaultAnimations ? undefined : enteringAnimation}
                exiting={disableDefaultAnimations ? undefined : exitingAnimation}
            >
                <Text style={textStyle}>{item}</Text>
            </Animated.View>
        }

        return <AnimatedNumberScroll
            enteringAnimation={disableDefaultAnimations ? undefined : enteringAnimation}
            exitingAnimation={disableDefaultAnimations ? undefined : exitingAnimation}
            disableDefaultAnimations={disableDefaultAnimations}
            textContainerStyle={textContainerStyle}
            textStyle={textStyle}
            key={`index-column-${index}`}
            value={+item}
            duration={duration}
            easing={easing}
            textHeight={textHeight}
        />
    }, []);

    return (
        <View style={[containerStyle, { height: textHeight }]}>
            {currentNumber.map(_renderNumber)}
        </View>
    )
};


AnimatedNumber.defaultProps = {
    number: 0,
    enteringAnimation: FadeIn.duration(400),
    exitingAnimation: FadeOut.duration(400),
    commaLayoutAnimation: LinearTransition.springify(),
    textStyle: {
        fontSize: DEFAULT_HEIGHT,
        lineHeight: DEFAULT_HEIGHT,
        color: "#fff",
    },
    containerStyle: {
        flexDirection: 'row',
        height: DEFAULT_HEIGHT,
        overflow: "hidden",
    },
    disableDefaultAnimations: false,
    textContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    duration: 1000,
    easing: Easing.inOut(Easing.ease),
    textHeight: DEFAULT_HEIGHT
}

export default memo(AnimatedNumber);