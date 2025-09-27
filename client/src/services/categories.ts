import axios from "@/config/axios";

export type Category = {
    id: number
    name: string
    thumbnail: string
}

const getCategories = async () => {


    await new Promise((res) => setTimeout(res, 600))

    const { data } = await axios.get("/data/categories.json");

    return data.categories as Category[];




}


export { getCategories }