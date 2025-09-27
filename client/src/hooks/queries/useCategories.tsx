import { getCategories, type Category } from "@/services/categories";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";



export default (options?: UseQueryOptions<Category[], Error>) => {

    return useQuery<Category[], Error>({
        ...options,
        queryKey: options?.queryKey || ["categories"],
        queryFn: options?.queryFn || getCategories

    })

}