import CustomersTable from '@/components/ui/dashboard/customers/CustomersTable'
import CustomerTopSection from '@/components/ui/dashboard/customers/CustomersTopSection'
import DashboardLayout from '@/layouts/DashboardLayout'
import { Box } from '@chakra-ui/react'


//types
export type Customer = {
  id: number,
  first_name: string,
  last_name: string,
  phone: string,
  email: string,


}



const CustomersManagement = () => {

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
      <Box w={"full"} maxW={1280} mx={"auto"}>
        <CustomerTopSection />
        <CustomersTable customers={customers} />
      </Box>

    </DashboardLayout>
  )
}

export default CustomersManagement;