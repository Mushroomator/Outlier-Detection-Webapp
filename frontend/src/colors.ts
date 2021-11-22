export interface IColorMode {
    light: string
    dark: string
}

export type TColors = Record<string, IColorMode>;

export const colors: TColors = {
    primary: {
        light: "white",
        dark: "gray.900"
    },
    secondary: {
        light: "gray.50",
        dark: "gray.800"
    },
    hover: {
        light: "var(--chakra-colors-gray-100)",
        dark: "var(--chakra-colors-gray-800)"
    }
}