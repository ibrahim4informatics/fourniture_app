import { useAppDispatch } from "@/hooks/stateHooks";
import { setEditingProductId, setShownProductID } from "@/store/slices/dashboardSlice";
import type { ProductCardProps } from "@/types/product";
import {  Button, ButtonGroup, FormatNumber, IconButton, Image, Menu, Pagination, Portal, Table, Text } from "@chakra-ui/react";
import {  IoIosMore } from "react-icons/io";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";

type ProductsTableProps = {
  products: ProductCardProps[],
  length: number
}






const ProductsTable: React.FC<ProductsTableProps> = ({ products, length }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const getPage = () => Number.parseInt(searchParams.get("page") || "1");
  const setPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    setSearchParams(newSearchParams);
  }
  return (
    <>
      <Table.ScrollArea w={"full"}>

        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Thumbnail</Table.ColumnHeader>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Sku</Table.ColumnHeader>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Stock</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader>Created At</Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {products.map((product: any) => (
              <Table.Row key={product.id}>
                <Table.Cell><Image rounded={"md"} w={12} h={12} src={product.thumbnail} /> </Table.Cell>
                <Table.Cell>{product.id}</Table.Cell>
                <Table.Cell>{product.sku}</Table.Cell>
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell>{product.stock}</Table.Cell>
                <Table.Cell><Text color={"green.600"}><FormatNumber value={product.price} style="currency" currency="USD" /></Text></Table.Cell>
                <Table.Cell>{new Date(product.createdAt).toDateString()}</Table.Cell>
                <Table.Cell>

                  <Menu.Root>
                    <Menu.Trigger asChild>
                      <Button variant={"subtle"}><IoIosMore /></Button>
                    </Menu.Trigger>
                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content>
                          <Menu.Item asChild value='show'>
                            <Text color={"GrayText"} cursor={"pointer"} textDecor={"underline"} _hover={{ color: "red.600" }} outline={"none"} onClick={() => { dispatch(setShownProductID(product.id)) }} >Show</Text>
                          </Menu.Item>
                          <Menu.Item asChild value='edit'>
                            <Text color={"GrayText"} cursor={"pointer"} textDecor={"underline"} _hover={{ color: "red.600" }} outline={"none"} onClick={() => { dispatch(setEditingProductId(product.id)) }}>Edit</Text>
                          </Menu.Item>
                          <Menu.Item asChild value='delete'>
                            <Text color={"red.700"} cursor={"pointer"} textDecor={"underline"} _hover={{ color: "red.600" }} outline={"none"} onClick={() => { console.log("delete product id" + product.id) }}>Delete</Text>
                          </Menu.Item>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </Menu.Root>
                </Table.Cell>

              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

      </Table.ScrollArea>
      <Pagination.Root mt={2} colorPalette={"red"} count={length} pageSize={5} page={getPage()}>
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
          <Pagination.PrevTrigger asChild>
            <IconButton onClick={() => { setPage(getPage() - 1) }}>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: "ghost", _selected: "outline" }} onClick={() => { setPage(page.value) }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton onClick={() => { setPage(getPage() + 1) }}>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>


    </>
  )
}

export default ProductsTable;