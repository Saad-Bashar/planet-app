import { TextStyle } from "react-native"
import { color, typography } from '../../theme/'

const BASE: TextStyle = {
    fontFamily: typography.primary,
    fontSize: 16,
    color: color.white
}

const BASE_BOLD: TextStyle = {
    fontFamily: typography.primaryBold,
    color: color.white
}

const BOLD: TextStyle = {
    fontFamily: typography.secondary,
    color: color.white
}

export const presets = {
    default: BASE,
    bold: BOLD,
    h1: {
        ...BOLD,
        fontSize: 32,
    },
    h2: {
        ...BOLD,
        fontSize: 28,
    },
    h3: {
        ...BASE_BOLD,
        fontSize: 24,
    },
    h4: {
        ...BASE_BOLD,
        fontSize: 18,
    }
}

/**
 * A list of preset names.
 */
 export type TextPresets = keyof typeof presets

