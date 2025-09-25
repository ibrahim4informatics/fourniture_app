import { getWilayas, type Wilaya } from "@/services/wilayas"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"

export default (options?: UseQueryOptions<Wilaya[], Error>) => {

    return useQuery<Wilaya[], Error>({
        queryKey: ["wilayas"],
        queryFn: () => getWilayas(null),
        ...options
    })
}