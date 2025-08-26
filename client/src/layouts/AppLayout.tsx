import Footer from '@/components/Footer'
import Navabar from '@/components/ui/Navabar'
import React from 'react'

type Props = {
    children?: React.ReactNode,
    name?: string
}

const AppLayout: React.FC<Props> = ({ children, name }) => {
    return (
        <>
            <Navabar transparency={name === "home"} />

            {children}

            <Footer />
        </>
    )
}

export default AppLayout