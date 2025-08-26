import { Box, Button, NativeSelect, Text } from "@chakra-ui/react"
import { useState } from "react"
import { LuArrowUpDown, LuSettings2 } from "react-icons/lu"
import { useSearchParams } from "react-router-dom"
import { AnimatedFiltersMenu } from "./FiltersMenu"
import { AnimatePresence } from "motion/react"

type Props = {
  result_count: number
}

const FiltersContainer: React.FC<Props> = ({ result_count }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [showFiltersMenu, setShowFilterMenu] = useState(false);

  const [sortOption, setSortOption] = useState(searchParams.get("sort") || undefined);

  const handleSelectSortOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.currentTarget.value);
  }

  const handleSort = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (sortOption?.trim()) {

      newSearchParams.set("sort", sortOption!);
    }
    else {
      newSearchParams.delete("sort");
    }
    setSearchParams(newSearchParams);
  }
  return (
    <>
      <Box zIndex={200} pos={"sticky"} top={"55px"} w={"full"} py={6} px={4} bg={"red.200"} >
        <Box w={"full"} maxW={720} mx={"auto"} display={"flex"} alignItems={"center"} flexWrap={"wrap"} gap={2} justifyContent={{ base: "center", md: "flex-start" }}>

          <Button variant={"ghost"} colorPalette={"red"} borderEndRadius={0} roundedEnd={"none"} borderEnd={"solid 2px rgba(0,0,0,.15)"} onClick={() => setShowFilterMenu(true)}>
            <LuSettings2 />
            Filters
          </Button>

          <Text color={"GrayText"} ml={2} fontSize={14} mr={"auto"}>{result_count} Products Found on Result</Text>

          <NativeSelect.Root w={200} bg={"white"} rounded={"md"}>
            <NativeSelect.Field value={sortOption} onChange={handleSelectSortOption} placeholder='Sort By'>
              <option value="pasc">Price ASC</option>
              <option value="pdesc">Price DESC</option>
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>


          <Button colorPalette={"red"} mx={2} onClick={handleSort}>
            Sort
            <LuArrowUpDown />
          </Button>

        </Box>

      </Box>


      <AnimatePresence initial={false}>
        {showFiltersMenu && <AnimatedFiltersMenu initial={{ right: "-100%", opacity: 0 }} animate={{ right: 0, opacity: 1 }} exit={{ right: "-100%", opacity: 0 }} setShowFilterMenu={setShowFilterMenu} />}
      </AnimatePresence>
    </>
  )
}

export default FiltersContainer