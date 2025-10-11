import { getProductByID } from "@/services/products"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"

export default (id: number | string, options?: UseQueryOptions) => {
    return useQuery<any,Error>(
        {
            queryKey:["products", id],
            queryFn:()=>getProductByID(id)
        }
    )
}