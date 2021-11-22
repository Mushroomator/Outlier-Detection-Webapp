import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const colorModeConfig: ThemeConfig = {
    initialColorMode: "system",
    useSystemColorMode: true,
}

const themeConfig = {
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  config: colorModeConfig
}

const theme = extendTheme(themeConfig);

export default theme;