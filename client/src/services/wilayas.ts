import axios from "@/config/axios"


export type Wilaya = {
    [key: string]: string,
}



const getWilayas = async (params: any): Promise<Wilaya[]> => {

        const wilayas = await axios.get("/data/wilayas.json", { params: params || undefined });
        return wilayas.data;
    
    
}


export { getWilayas };