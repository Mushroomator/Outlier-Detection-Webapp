import { Divider, Heading, HStack, IconButton, Switch, Table, Tbody, Td, Text, Tr, useColorModeValue, VStack } from "@chakra-ui/react";
import { IOutlierData, THistory } from "../types";
import { NoDataAlert } from "./NoDataAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faChevronRight, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../colors";

export interface IHistoryComp {
    history: THistory
    isLive: boolean
    setIsLive: React.Dispatch<React.SetStateAction<boolean>>
    setCurOutlier: React.Dispatch<React.SetStateAction<IOutlierData | undefined>>
}

export function History({ history, isLive, setIsLive, setCurOutlier }: IHistoryComp) {
    const hoverCol = useColorModeValue(colors.hover.light, colors.hover.dark);

    let content;
    if (history.length === 0) content = <NoDataAlert />;
    else {
        content = <Table size="sm">
            <Tbody>
                {content = history.map((it, idx) => (
                    <Tr
                        key={idx}
                        _hover={{
                            backgroundColor: hoverCol,
                            borderLeftRadius: "100px"
                        }}
                    >
                        <Td w={"10px"}>
                            {it.details.isOk ?
                                <FontAwesomeIcon icon={faCheckCircle} color='#38A169'></FontAwesomeIcon>
                                :
                                <FontAwesomeIcon icon={faTimesCircle} color='#E53E3E'></FontAwesomeIcon>
                            }
                        </Td>
                        <Td>{it.time.toLocaleTimeString("de-DE", { day: "2-digit", month: "short", hour: "2-digit", second: "2-digit", minute: "2-digit" })}</Td>
                        <Td isNumeric >
                            <IconButton
                                aria-label={`Show history for ${it.time.toLocaleTimeString("de-DE", { day: "2-digit", month: "short", hour: "2-digit", second: "2-digit", minute: "2-digit" })}`}
                                variant={"link"}
                                icon={<FontAwesomeIcon icon={faChevronRight} size="sm" color="black" />}
                                onClick={() => { if (history) setCurOutlier(history[idx]) }}
                            />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    }

    return (
        <>
            <Heading size={"md"} alignSelf={"start"}>History</Heading>
            <Divider />
            <HStack w={"100%"} p={5} justifyContent={"space-between"}>
                <Text textDecoration={"InactiveCaptionText"}>Show live data</Text>
                <Switch defaultChecked={isLive} colorScheme={"orange"} size={"md"} colo onChange={() => setIsLive(!isLive)} />
            </HStack>
            <VStack
                disabled={isLive}
                _disabled={{
                    opacity: 0.5,
                    pointerEvents: "None",
                }}
                alignItems={"start"}
                h={"100%"}
                w={"100%"}
                spacing={5}
                overflowX={"hidden"}
                overflowY={"auto"}
                direction={"row"}
                css={{
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    "::-webkit-scrollbar-corner": {
                        backgroundColor: "transparent"
                    },
                    "&::-webkit-resizer": {
                        backgroundColor: "transparent"
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: "var(--chakra-colors-gray-200)",
                        borderRadius: "5px"
                    },
                }}
            >
                {content}
            </VStack>
        </>
    )
}