import type { User } from '@/types/User'
import { Box, Button, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import UserProfileForm from './forms/UserProfileForm'
import { IoEye, IoPencil } from 'react-icons/io5'

type Props = {
    user: User | null
}

const UserProfile: React.FC<Props> = ({ user }) => {
    const [mode, setMode] = useState("r");


    const setEditingMode = () => {
        setMode("w");
    }

    const setReadMode = () => {
        setMode("r")
    }
    return (
        <Box display={"flex"} flexDir={"column"} w={"full"} py={4}>

            <Heading color={"red.600"} textAlign={"center"} size={"xl"} >Profile</Heading>

            <Box display={"flex"} justifyContent={"flex-end"} w={"full"} py={2} mb={6}>
                {
                    mode === "w" ? <Button onClick={setReadMode} colorPalette={"blue"}><IoEye/></Button> : <Button onClick={setEditingMode} colorPalette={"red"}><IoPencil /></Button>
                }
            </Box>

            <UserProfileForm is_active={mode === "w"} user={{ first_name: "Ibrahim", last_name: "Benyahia", email: "khalil@gmail.com", id: 1, phone:"0512451222",is_admin: false, password: "123456", avatar_url: "https://imgs.search.brave.com/0devDKpYF8huZp3oLrlWKWu2RvTzgxnpV91KrzpW1xw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjE3/ODUzMzE1L3Bob3Rv/L3BvcnRyYWl0LW9m/LW1pZC1hZHVsdC1t/YW4uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPU9YUW9jYmUw/UF9kRmJRMEZvVjJf/azZWRlpVbE9QV3Nx/ZER1RVNzbEZLdlk9" }} />




        </Box>
    )
}

export default UserProfile