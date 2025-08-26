import { GlobalContext } from '@/contexts/CLientContext'
import type { ProductCardProps } from '@/types/product'
import { Box, Button, FormatNumber, Image, Input, Table, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { LuTrash } from 'react-icons/lu'

type Props = {

    cartProducts: CartProductType[]
}

type CartProductType = {
    product: ProductCardProps, quantity: number
}


const CartProduct: React.FC<CartProductType> = ({ product, quantity }) => {

    const { global, setGlobal } = useContext(GlobalContext);

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const index = global.cart.findIndex(({ product: cartProduct }) => product.id === cartProduct.id);
        let newCartProduct = global.cart;
        newCartProduct[index] = { ...newCartProduct[index], quantity: parseInt(e.target.value) }
        setGlobal(prev => ({ ...prev, cart: newCartProduct }));
        localStorage.setItem("cart",JSON.stringify(newCartProduct))

    }

    const handleDeleteFromCart = () => {
        const newCartProducts = global.cart.filter(({ product: p }) => product.id !== p.id);
        setGlobal({ cart: newCartProducts });
        localStorage.setItem("cart", JSON.stringify(newCartProducts))
    }
    return (
        <Table.Row>
            <Table.Cell display={"flex"} alignItems={"center"} gap={2}>
                <Image src={product.thumbnail} w={20} h={20} rounded={"md"} />
                <Text color={"GrayText"}>{product.title}</Text>
            </Table.Cell>
            <Table.Cell>
                <FormatNumber style='currency' currency='USD' value={product.price} />
            </Table.Cell>
            <Table.Cell>
                <Input type="number" min={1} value={quantity} onChange={handleChangeQuantity} w={"60px"} rounded={"md"} bg={"white"} />
            </Table.Cell>
            <Table.Cell>
                <Box display={"flex"} alignItems={"center"} justifyContent={"end"}>

                    <FormatNumber value={product.price * quantity} currency="USD" style="currency" />
                    <Button variant={"ghost"} colorPalette={"red"} onClick={handleDeleteFromCart}>
                        <LuTrash />
                    </Button>
                </Box>
            </Table.Cell>
        </Table.Row>
    )
}

const CartProducts: React.FC<Props> = ({ cartProducts }) => {
    return (
        <Table.Root flex={1} colorPalette={"red"} variant={"line"}>
            <Table.Header bg={"red.300"}  >
                <Table.Row>
                    <Table.ColumnHeader fontWeight={"bold"} >Product</Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight={"bold"} >Price</Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight={"bold"} >Qantity</Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight={"bold"} textAlign="end">Subtotal</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>

            <Table.Body>

                {cartProducts.map(({ product, quantity }) => <CartProduct key={product.id} product={product} quantity={quantity} />)}

            </Table.Body>

        </Table.Root>
    )
}

export default CartProducts