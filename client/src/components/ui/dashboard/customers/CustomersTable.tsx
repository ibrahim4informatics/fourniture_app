import type { Customer } from "@/pages/dashboard/customers";
import { Button, ButtonGroup, IconButton, Menu, Pagination, Portal, Table, Text } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";

type CustomersTableProps = {
  customers: Customer[]
}






const CustomersTable: React.FC<CustomersTableProps> = ({ customers }) => {

  const [searchParams, setSearchParams] = useSearchParams();
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
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>First Name</Table.ColumnHeader>
              <Table.ColumnHeader>Last Name</Table.ColumnHeader>
              <Table.ColumnHeader>Phone Number</Table.ColumnHeader>
              <Table.ColumnHeader>Email Address</Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {customers.slice((getPage() - 1) * 10, getPage() * 10).map(customer => (
              <Table.Row key={customer.id}>
                <Table.Cell>{customer.id}</Table.Cell>
                <Table.Cell>{customer.first_name}</Table.Cell>
                <Table.Cell>{customer.last_name}</Table.Cell>
                <Table.Cell>{customer.phone}</Table.Cell>
                <Table.Cell>{customer.email}</Table.Cell>
                <Table.Cell>

                  <Menu.Root>
                    <Menu.Trigger asChild>
                      <Button variant={"subtle"}><IoIosMore /></Button>
                    </Menu.Trigger>
                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content>
                          <Menu.Item asChild value='show-order'>
                            <Text color={"GrayText"} cursor={"pointer"} textDecor={"underline"} _hover={{ color: "red.600" }} outline={"none"} asChild><Link to={`/admin/customers/${customer.id}`}>Show Customer</Link></Text>
                          </Menu.Item>
                          <Menu.Item asChild value='edit-order'>
                            <Text color={"GrayText"} cursor={"pointer"} textDecor={"underline"} _hover={{ color: "red.600" }} outline={"none"} asChild><Link to={`/admin/customers/edit/${customer.id}`}>Edit Customer</Link></Text>
                          </Menu.Item>

                          <Menu.Item asChild value='delete-order'>
                            <Text color={"red.700"} cursor={"pointer"} textDecor={"underline"} _hover={{ color: "red.600" }} outline={"none"} asChild><Button variant={"plain"} onClick={() => { console.log("delete customer id" + customer.id) }}>Delete Customer</Button></Text>
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
      <Pagination.Root mt={2} colorPalette={"red"} count={customers.length} pageSize={10} page={getPage()}>
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

export default CustomersTable;