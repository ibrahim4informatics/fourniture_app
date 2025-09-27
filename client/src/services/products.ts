import axios from "@/config/axios";

const getHomeProducts = async () => {
    await new Promise(res => setTimeout(res, 300));
    try {

        const { data } = await axios.get("/data/products.json");
        return data.products
    }
    catch (err) {
        return err;
    }
}

const getProducts = async (filters?: any) => {

    const page = filters?.page || 1;
    const pageSize = 5;

    const { data } = await axios.get("/data/products.json");
    const products = data.products;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedProducts = products.slice(start, end);


    return {
        total: products.length,
        products: paginatedProducts
    };

}


const getProductByID = async (id: number) => {
    const { data } = await axios.get("/data/products.json");
    const product = data.products.filter((product: any) => product.id === id);
    if (product.length > 0) {
        return product[0];
    }
    else {
        return null;
    }
}

export {
    getHomeProducts, getProducts, getProductByID
}