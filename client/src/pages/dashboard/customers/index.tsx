import DashboardLayout from '@/layouts/DashboardLayout'
import { Box, Button, ButtonGroup, IconButton, Input, InputGroup, Menu, Pagination, Portal, Table, Text } from '@chakra-ui/react'
import type { ChangeEvent, EventHandler, InputEventHandler } from 'react'
import { IoIosAdd, IoIosMore, IoIosSearch, IoIosSettings } from 'react-icons/io'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { Link, useSearchParams } from 'react-router-dom'


//types
type Customer = {
  id: number,
  first_name: string,
  last_name: string,
  phone: string,
  email: string,


}

type CustomersTableProps = {
  customers: Customer[]
}



const CustomerTopSection = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{

    const newSearchParams = new URLSearchParams(searchParams);
    const value = e.target.value;
    if(value.trim().length > 0){
      newSearchParams.set("search", value);
    }
    else {
      newSearchParams.delete("search")
    }
    setSearchParams(newSearchParams)

    // TODO: invalidate query to force refetch
  }
  return (
    <Box gap={6} w={"full"} py={4} display={"flex"} alignItems={"center"}>

      <Text fontSize={27}>Customers</Text>
      <InputGroup flex={1} px={6} py={8} startElement={<IoIosSearch size={25} color='#a1a1aa' />} >
        <Input onChange={handleChange} colorPalette={"red"} variant={"subtle"} placeholder='Search By Name.'  value={searchParams.get("search") || ""} size={"lg"} rounded={"full"} />
      </InputGroup>


      <Box display={"flex"} alignItems={"center"} gap={4}>


        <Button size={"lg"} onClick={() => { console.log("show filters customer") }} variant={"subtle"}>
          <IoIosSettings />
          Filters
        </Button>

        <Button size={"lg"} onClick={() => { console.log("show create customer form") }} colorPalette={"red"}>
          <IoIosAdd />
          Create Customer
        </Button>


      </Box>




    </Box>
  )
}


const CustomersTable: React.FC<CustomersTableProps> = ({ customers }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const getPage = ()=> Number.parseInt(searchParams.get("page") || "1");
  const setPage = (page:number)=>{
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
            {customers.slice((getPage() - 1) * 10 , getPage() * 10 ).map(customer => (
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
            <IconButton onClick={()=> {setPage(getPage() - 1)} }>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: "ghost", _selected: "outline" }} onClick={()=>{setPage(page.value)}}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton onClick={()=> {setPage(getPage() + 1)} }>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </>
  )
}

const Customers = () => {

  const customers = [
    { id: 1, first_name: "John", last_name: "Smith", email: "john@yahoo.com", phone: "0654512365" },
    { id: 2, first_name: "Sara", last_name: "Khellaf", email: "sara@gmail.com", phone: "0667891234" },
    { id: 3, first_name: "Yacine", last_name: "Touati", email: "yacine@hotmail.com", phone: "0673214567" },
    { id: 4, first_name: "Lina", last_name: "Chouikh", email: "lina@yahoo.com", phone: "0654789654" },
    { id: 5, first_name: "Khaled", last_name: "Mansouri", email: "khaled@gmail.com", phone: "0778541236" },
    { id: 6, first_name: "Rania", last_name: "Saidi", email: "rania@hotmail.com", phone: "0754123698" },
    { id: 7, first_name: "Nabil", last_name: "Hamidi", email: "nabil@gmail.com", phone: "0698745231" },
    { id: 8, first_name: "Samira", last_name: "Cherif", email: "samira@yahoo.com", phone: "0652314789" },
    { id: 9, first_name: "Adel", last_name: "Ziani", email: "adel@gmail.com", phone: "0778965412" },
    { id: 10, first_name: "Meriem", last_name: "Toufik", email: "meriem@hotmail.com", phone: "0674125986" },
    { id: 11, first_name: "Omar", last_name: "Haddad", email: "omar@yahoo.com", phone: "0698451237" },
    { id: 12, first_name: "Imane", last_name: "Cherkaoui", email: "imane@gmail.com", phone: "0758963214" },
    { id: 13, first_name: "Fouad", last_name: "Bachir", email: "fouad@hotmail.com", phone: "0774123569" },
    { id: 14, first_name: "Salma", last_name: "Boumediene", email: "salma@yahoo.com", phone: "0665412789" },
    { id: 15, first_name: "Hakim", last_name: "Belkacem", email: "hakim@gmail.com", phone: "0678954123" },
    { id: 16, first_name: "Nour", last_name: "Sahnoun", email: "nour@hotmail.com", phone: "0698745123" },
    { id: 17, first_name: "Walid", last_name: "Bouzid", email: "walid@gmail.com", phone: "0758964123" },
    { id: 18, first_name: "Houda", last_name: "Cherkaoui", email: "houda@yahoo.com", phone: "0774125896" },
    { id: 19, first_name: "Karim", last_name: "Mokhtar", email: "karim@gmail.com", phone: "0654789321" },
    { id: 20, first_name: "Yasmine", last_name: "Lahlou", email: "yasmine@hotmail.com", phone: "0678956231" }
  ];

  return (
    <DashboardLayout>

      <CustomerTopSection />


      <CustomersTable customers={customers} />


    </DashboardLayout>
  )
}

export default Customers