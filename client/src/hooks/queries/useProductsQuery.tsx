import { getProducts } from "@/services/products";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export default (options: UseQueryOptions, filters?: any) => {

    return useQuery<any, Error>({
        ...options,
        queryKey: ["products"],
        queryFn: () => getProducts(filters)
    })

}