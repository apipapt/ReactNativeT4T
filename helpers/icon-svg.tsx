// import React from 'react';
// import {View, ViewStyle} from 'react-native';
// import Svg, {Path} from 'react-native-svg';

// /**
//  * IconSvg Component - A reusable SVG icon component for React Native applications
//  *
//  * This component renders an SVG icon using react-native-svg library. It allows you to create
//  * custom icons by providing SVG path data and customizing various properties like color,
//  * dimensions, and viewBox.
//  *
//  * @param {Object[]} paths - An array of objects containing SVG path data
//  * @param {string} paths[].d - The SVG path data string that defines the icon shape
//  * @param {string} color - The fill color for the icon (e.g., '#000000', 'red', etc.)
//  * @param {number} [width=23] - The width of the icon in pixels (default: 23)
//  * @param {number} [height=23] - The height of the icon in pixels (default: 23)
//  * @param {string} [viewBox='0 0 23 23'] - The SVG viewBox attribute that defines the coordinate system
//  *
//  * @example
//  * // Example usage:
//  * <IconSvg
//  *   paths={[{ d: 'M10 10L20 20' }]}
//  *   color="#FF0000"
//  *   width={30}
//  *   height={30}
//  *   viewBox="0 0 30 30"
//  * />
//  */

// const IconSvg = ({
//   paths,
//   color,
//   width = 23,
//   height = 23,
//   viewBox = '0 0 23 23',
//   style,
// }: {
//   paths: {d: string}[];
//   color: string;
//   width?: number;
//   height?: number;
//   viewBox?: string | undefined;
//   style?: ViewStyle | ViewStyle[];
// }) => (
//   <View style={[style]}>
//     <Svg width={width} height={height} viewBox={viewBox}>
//       {paths.map((path, index: number) => (
//         <Path key={index} d={path.d} fill={color} />
//       ))}
//     </Svg>
//   </View>
// );

// export default IconSvg;
