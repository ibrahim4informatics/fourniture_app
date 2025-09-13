import { incrementQuantity, removeFromCart } from '@/store/slices/cartSlice';
import type { ProductCardProps } from '@/types/product'
import { Box, Button, FormatNumber, Image, Input, Table, Text } from '@chakra-ui/react'
import React from 'react'
import { LuTrash } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

type Props = {

    cartProducts: CartProductType[]
}

export type CartProductType = {
    product: ProductCardProps, quantity: number
}


const CartProduct: React.FC<CartProductType> = ({ product, quantity }) => {
    const dispatch = useDispatch();
    return (
        <Table.Row>
            <Table.Cell display={"flex"} alignItems={"center"} gap={2}>
                <Image src={product.thumbnail} w={20} h={20} rounded={"md"} />
                <Text color={"red.400"} textDecoration={"underline"} asChild><Link to={`/shop/${product.id}`}>{product.title}</Link></Text>
            </Table.Cell>
            <Table.Cell>
                <FormatNumber style='currency' currency='USD' value={product.price} />
            </Table.Cell>
            <Table.Cell>
                <Input type="number" min={1} value={quantity} onChange={(e) => {
                    dispatch(incrementQuantity({ id: product.id, quantity: parseInt(e.target.value) }))
                }} w={"60px"} rounded={"md"} bg={"white"} />
            </Table.Cell>
            <Table.Cell>
                <Box display={"flex"} alignItems={"center"} justifyContent={"end"}>

                    <FormatNumber value={product.price * quantity} currency="USD" style="currency" />
                    <Button mx={2} variant={"ghost"} colorPalette={"red"} onClick={()=>{dispatch(removeFromCart(product.id))}}>
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