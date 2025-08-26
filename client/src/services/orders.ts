import axios from "@/config/axios"

const getOrders = async ()=>{

    const {data} = await axios.get("/data/orders.json");
    return data

}

export {getOrders}