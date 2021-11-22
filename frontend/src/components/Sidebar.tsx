import { GridItem, VStack } from "@chakra-ui/react"
import { IOutlierData, THistory } from "../types"
import { Details } from "./Details"
import { History } from "./History"

export interface ISidebarComp {
    details: IOutlierData | undefined
    history: THistory
    isLive: boolean
    setIsLive: React.Dispatch<React.SetStateAction<boolean>>
    setCurOutlier: React.Dispatch<React.SetStateAction<IOutlierData | undefined>>
}

export function Sidebar({ details, history, isLive, setIsLive, setCurOutlier }: ISidebarComp) {
    return (
        <GridItem
            gridArea={"sidebar"}
            w={"100%"}
            h={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyItems={"center"}
        >
            <VStack
                bg={"white"}
                h={"100%"}
                w={"100%"}
                p={5}
                borderRight={"1px"}
                borderColor={"gray.200"}
                alignItems={"start"}
            >
                <Details details={details} />
                <History history={history} isLive={isLive} setIsLive={setIsLive} setCurOutlier={setCurOutlier} />
            </VStack>
        </GridItem >
    )
}
