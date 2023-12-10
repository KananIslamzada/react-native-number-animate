[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)]()
  ![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS%20%7C%20Web-brightgreen.svg?style=for-the-badge&colorB=191A17)
# React Native Number Animate

🚀 Introducing __react-native-number-animate__

Elevate your React Native app's user experience with the power of animated numbers! I'm thrilled to present __react-native-number-animate__, a lightweight and customizable package designed to seamlessly integrate animated numeric displays into your React Native projects.


## Features


🔢 __Smooth Animations__: Bring numbers to life with smooth and eye-catching animations. Whether it's counting up, counting down, or transitioning between values, our package ensures a visually engaging experience for your users.

⚙️ __Customization__: Tailor the appearance and behavior of animated numbers to suit your app's design language. With customizable fonts, colors, and animation styles, you have the flexibility to create a seamless integration with your app's aesthetics.

🔄 __Versatile Usage__: Perfect for a variety of use cases, from displaying real-time data updates to creating dynamic counters or countdowns. __react-native-number-animate__ adapts to your needs, providing a versatile solution for numeric animations.

📦 __Easy Integration__: Effortlessly integrate animated numbers into your React Native application. Our package is designed for simplicity and ease of use, allowing you to focus on enhancing your app's user interface without the hassle of complex implementation.

## Demo

![](https://s5.gifyu.com/images/Siddk.gif)


## Installation

This package is using [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started). It should be installed first. 

```bash
npm install react-native-reanimated react-native-gesture-handler && cd ios && pod install
```

Then

```bash
npm install react-native-number-animate
```




## !! IMPORTANT !!

• __lineHeight__ in textStyle prop and __textHeight__ prop must be __THE SAME__ (Default value is the 25 for both)

• for iOS, you can use just __fontSize__ prop in textStyle prop but it makes glitch in Android when you do not use __lineHeight__. 

• DO NOT FORGET to use __overflow:"hidden"__ and __flexDirection:"row"__ when you change style of container

```javascript
<AnimatedNumber 
    number={number}
    textStyle={{
        fontSize: 25,
        color: "#fff",
    l   ineHeight: 25
    }}
    textHeight={25}
    containerStyle={{
        height: 25,
        flexDirection: 'row',
        overflow: "hidden"
    }}
/>

```
## Basic Usage

```javascript
import AnimatedNumber from 'react-native-number-animate';

function App() {
  return <AnimatedNumber number={number}/>
}
```


## Props

| Prop                        | Description                                                                           | Type                          | Default Value       | Required |
| :--------------------------:|:--------------------------------------------------------------------------------------|:-----------------------------:|:-------------------:|:--------:|
| number                      | number to animate                                                                        | Number or String                        | 0                   | true     |
| enteringAnimation           | reanimated entering animation                        | EntryOrExitLayoutType                        | FadeIn.duration(400)                   | false    |
| exitingAnimation            | reanimated exiting animation                                                      | EntryOrExitLayoutType                        | FadeOut.duration(400)       | false    |
| commaLayoutAnimation        | comma layout animation (reanimated layout animation)                                                                 | AnimatedProps<Text>['layout']  | LinearTransition.springify()     | false    |
| textStyle                   | number text style                                                   |        TextStyle                 |    {fontSize: 25,lineHeight: 25,color: "#fff"}               | false    |
| containerStyle         | general container style               | ViewStyle                        |           { flexDirection: 'row',height: 25,overflow: "hidden"}         | false    |
| disableDefaultAnimations                    | disable all animations                                                           | Boolean                        | false                 | false    |
| textContainerStyle                       | number text container style                             | ViewStyle                        |{justifyContent: 'center',alignItems: 'center'}                   | false    |
| duration                    | number animation duration (ms) | Number                        | 1000                 | false    |
| easing       | number animation easing function (reanimated)                                                | EasingFunction                        | Easing.inOut(Easing.ease)                   | false    |
| textHeight                 | number container height for animate (you must read !! IMPORTANT !! section)             | Number                        | 25                   | false  |


## License
This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.


