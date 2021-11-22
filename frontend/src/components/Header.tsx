import { Grid, GridItem, Heading, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/Continental_AG_logo.svg";

export function Header() {
    return (
        <GridItem maxH={"100%"} h={"100%"} w={"100%"} bg={"white"} gridArea={"header"} borderBottom={"1px"} borderColor={"gray.200"}>
            <Grid
                w={"100%"}
                h={"100%"}
                gridTemplateAreas={
                    [
                        `"left middle middle"`,
                        `"left middle right"`
                ]}
                gridTemplateRows={"100%"}
                gridTemplateColumns={"100% 0% 0%"}
            >
                <GridItem
                    gridArea={"left"}
                >
                    <HStack h={"100%"} maxH={"100%"} alignItems={"center"} justifyContent={"start"} w={"100%"}>
                        <Image objectFit={"contain"} h={"100%"} maxW={"auto"} maxH={"100%"} src={logo} alt="Continental AG Logo" justifySelf={"start"} borderRightRadius={24}/>
                        <Heading pl={4} display={["none", null, null, "block"]} size={"md"} justifyContent={"start"}>Outlier Detection</Heading>
                    </HStack>
                </GridItem>
                <GridItem
                    gridArea={"middle"}
                    w={"100%"}
                    h={"100%"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}>
                </GridItem>
            </Grid>
        </GridItem>
    )
}