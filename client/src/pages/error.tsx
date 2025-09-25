import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
    return;
  }

  if (isRouteErrorResponse(error)) {
    return (
      <Box w={"full"} h={"100vh"} display={"flex"} alignItems={"center"} gap={6} justifyContent={"center"} flexDirection={"column"}>
        <Heading size={"5xl"} color={"red.600"} fontWeight={"bold"}>{error.status}</Heading>
        <Text color={"GrayText"} fontSize={18}>{error.statusText}</Text>
        <Button variant={"subtle"} colorPalette={"red"} onClick={handleBack}> <IoIosArrowBack /> Go Back</Button>
      </Box>
    );
  } else if (error instanceof Error) {

    return (
      <Box w={"full"} h={"100vh"} display={"flex"} alignItems={"center"} gap={6} justifyContent={"center"} flexDirection={"column"}>
        <Heading size={"5xl"} color={"red.600"} fontWeight={"bold"}>Unexpected Error</Heading>
        <Text color={"GrayText"} fontSize={18}>{error.message}</Text>
        <Button variant={"subtle"} colorPalette={"red"} onClick={handleBack}> <IoIosArrowBack /> Go Back</Button>
      </Box>
    );
  } else {
    return (
      <Box w={"full"} h={"100vh"} display={"flex"} alignItems={"center"} gap={6} justifyContent={"center"} flexDirection={"column"}>
        <Heading size={"5xl"} color={"red.600"} fontWeight={"bold"}>Unknown Error</Heading>
        <Text color={"GrayText"} fontSize={18}>Please Report to The Website Owner ASAP!</Text>
        <Button variant={"subtle"} colorPalette={"red"} onClick={handleBack}> <IoIosArrowBack /> Go Back</Button>
      </Box>
    );
  }
}
