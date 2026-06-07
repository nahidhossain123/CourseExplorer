import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

  export { SCREEN_WIDTH, SCREEN_HEIGHT, BASE_WIDTH, BASE_HEIGHT }; // <-- export here

// Base design size (Figma)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/**
 * Scale size horizontally based on screen width
 */
export const scale = (size: number): number =>
  (SCREEN_WIDTH / BASE_WIDTH) * size;

/**
 * Scale size vertically based on screen height
 */
export const verticalScale = (size: number): number =>
  (SCREEN_HEIGHT / BASE_HEIGHT) * size;

/**
 * Moderate scaling (recommended for font sizes & paddings)
 */
export const moderateScale = (
  size: number,
  factor: number = 0.5,
): number =>
  size + (scale(size) - size) * factor;

/**
 * Font scaling with respect to system settings
 */
export const fontScale = (size: number): number =>
  size * PixelRatio.getFontScale();
