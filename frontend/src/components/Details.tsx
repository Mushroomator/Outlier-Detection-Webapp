import { Alert, AlertIcon, AlertTitle, Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IOutlierData } from "../types";
import { NoDataAlert } from "./NoDataAlert";

export interface IDetailsComp {
    details: IOutlierData | undefined
}

export function Details({ details }: IDetailsComp) {
    let content;
    if (!details) {
        content = <NoDataAlert/>
    }
    else {
        const isOk = details.details?.isOk;
        content = <>
            <Alert
                status={isOk ? "success": "error"}
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                borderRadius={15}
                height="100px"
                bg={"white"}
            >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                    {isOk ? "Ok" : "Outlier detected!"}
                </AlertTitle>
            </Alert>
            <HStack pt={5} justifyContent={"space-between"} w={"100%"}>
                <Text fontWeight={"600"}>Status:</Text>
                {isOk ?
                    <FontAwesomeIcon icon={faCheckCircle} color='#38A169'></FontAwesomeIcon>
                    :
                    <FontAwesomeIcon icon={faTimesCircle} color='#E53E3E'></FontAwesomeIcon>
                }
            </HStack>
            <HStack justifyContent={"space-between"} w={"100%"}>
                <Text fontWeight={"600"}>Time:</Text>
                <Text>{details.time.toLocaleTimeString("de-DE", { hour: "2-digit", second: "2-digit", minute: "2-digit" })}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} w={"100%"}>
                <Text fontWeight={"600"}>Quadratic error:</Text>
                <Text>{details.details.quadraticError}</Text>
            </HStack>
        </>
    }

    return (
        <>
            <Heading size={"md"} alignSelf={"start"}>Details</Heading>
            <Divider />
            <VStack w={"100%"} p={5}>
                {content}
            </VStack>
        </>
    )
}