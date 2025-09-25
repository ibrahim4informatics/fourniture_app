import { Box, Heading, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react';

const OverviewTopSection = () => {

    const [todayDate, setTodayDate] = useState(new Date().toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric", second: undefined, hour: "numeric", minute: "numeric" }));

    
  useEffect(() => {
    const updateDate = () => {
      setTodayDate(
        new Date().toLocaleString("en-US", {
         year: "numeric", month: "short", day: "numeric", second: undefined, hour: "numeric", minute: "numeric" 
        })
      );
    };
    updateDate();
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    const timeout = setTimeout(() => {
      updateDate();
      const interval = setInterval(updateDate, 60 * 1000);
      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(timeout);
  }, []);
    return (

        <Box px={4} pt={12} w={"full"} maxW={1280} mx={"auto"}>
            <Box w={"full"} display={"flex"} py={2} alignItems={"center"} justifyContent={"space-between"} borderBottom={"1px solid rgba(0,0,0,.25)"} pb={8}>
                <Heading size={"3xl"} fontWeight={"normal"}>Overview</Heading>
                <Text fontSize={18} color={"GrayText"}>{todayDate}</Text>
            </Box>
        </Box>
    )
}

export default OverviewTopSection