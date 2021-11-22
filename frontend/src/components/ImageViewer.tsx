import { GridItem, Heading, Image, VStack } from "@chakra-ui/react";
import { NoDataAlert } from "./NoDataAlert";

export interface IImageViewer {
    heading: string
    gridArea: string
    image: string | undefined
}

export function ImageViewer({ heading, gridArea, image }: IImageViewer) {
    return (
        <GridItem
            gridArea={gridArea}
            w={"100%"}
            h={"100%"}
            maxH={"100%"}
            p={5}
            borderRadius={5}
        >
            <VStack h={"100%"} maxH={"100%"} w={"auto"}>
                <Heading size={"lg"} isTruncated>{heading}</Heading>
                {image ?
                    <Image src={image} width={"auto"} h={"100%"} maxH={"100%"}
                        objectFit={"contain"}
                        borderRadius={15}
                        minH={0}
                    />
                    :
                    <NoDataAlert/>
                }
            </VStack>
        </GridItem>
    )
}