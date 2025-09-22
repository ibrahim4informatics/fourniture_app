import axios from "@/config/axios"

const getWilayas = async (params:any) => {
    try {
        const wilayas = await axios.get("/data/wilayas.json", { params: params || undefined });
        console.log(wilayas)
        return wilayas.data;
    }
    catch (err: any) {

        return err?.message || err;

    }
}


export { getWilayas };