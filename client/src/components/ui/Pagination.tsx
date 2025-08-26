import { Box, ButtonGroup, IconButton, Pagination as Pg } from '@chakra-ui/react';
import React from 'react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { useSearchParams } from 'react-router-dom';

type Props = {
    count: number,
    pageSize?: number
}

const Pagination: React.FC<Props> = ({ count, pageSize }) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const handleNextTrigger = () => {

        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("page", (parseInt(searchParams.get("page") || "1") + 1).toString());
        setSearchParams(newSearchParams);

    }

    const handlePrevTerigger = () => {

        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("page", (parseInt(searchParams.get("page") || "2") - 1).toString());
        setSearchParams(newSearchParams);

    }

    const handlePageButton = (page: { type: string, value: number }) => {

        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("page", page.value.toString());
        setSearchParams(newSearchParams);

    }
    return (
        <Box w={"full"} display={"flex"}>
            <Pg.Root mx={"auto"} my={2} count={count} pageSize={pageSize || 10} defaultPage={parseInt(searchParams.get("page") || "1")} colorPalette={"red"}>
                <ButtonGroup variant="ghost">
                    <Pg.PrevTrigger asChild>
                        <IconButton onClick={handlePrevTerigger}>
                            <LuChevronLeft />
                        </IconButton>
                    </Pg.PrevTrigger>

                    <Pg.Items
                        render={(page) => (
                            <IconButton variant={{ base: "ghost", _selected: "outline" }} onClick={() => handlePageButton(page)}>
                                {page.value}
                            </IconButton>
                        )}
                    />

                    <Pg.NextTrigger asChild>
                        <IconButton onClick={handleNextTrigger}>
                            <LuChevronRight />
                        </IconButton>
                    </Pg.NextTrigger>
                </ButtonGroup>
            </Pg.Root>
        </Box>
    )
}

export default Pagination