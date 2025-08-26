import axios from "@/config/axios";

const getCategories = async () => {
    try {

        await new Promise((res)=> setTimeout(res,600))

        const { data } = await axios.get("/data/categories.json");

        return data.categories;

    }

    catch (err) {
        return err;
    }
}


export { getCategories }