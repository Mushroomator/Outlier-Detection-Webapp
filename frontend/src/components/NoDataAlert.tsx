import { Alert, AlertIcon, AlertTitle, useColorModeValue } from "@chakra-ui/react";
import { colors } from "../colors";

export function NoDataAlert() {
    const bgCol = useColorModeValue(colors.primary.light, colors.primary.dark);

    return (
        <Alert
            status="warning"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius={15}
            height="100px"
            bg={bgCol}
            flexGrow={1}
        >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
                No data
            </AlertTitle>
        </Alert>
    )
}