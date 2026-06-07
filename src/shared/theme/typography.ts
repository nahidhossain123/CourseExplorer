import { fontScale } from "../utils/dimensions";


export const fontSize = {
    _4: fontScale(4),
    _8: fontScale(8),
    _10: fontScale(10),
    _12: fontScale(12),
    _14: fontScale(14),
    _16: fontScale(16),
    _18: fontScale(18),
    _20: fontScale(20),
    _24: fontScale(24),
    _28: fontScale(28),
    _32: fontScale(32),
    _36: fontScale(36),
    _40: fontScale(40),
    _48: fontScale(48),
}

export const fontweight = {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
} as const;