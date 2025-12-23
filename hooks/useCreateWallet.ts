
import { useQuery } from '@tanstack/react-query'
import { DaoTrainingService } from "@/services/dao-training-service";
import { User } from "@/types";
import { CREATE_WALLET, GET_WALLET } from "@/lib/constants";


export const useCreateWallet = (
    params:{user:User}
) =>{
    return useQuery({
        queryKey:[CREATE_WALLET],
        queryFn:() =>
            DaoTrainingService.createWallet((params.user?.id)),
        enabled: !!params.user?.id,
    })
}

export const useGetWallet = (
    user: User
) => {
    return useQuery({
        queryKey: [GET_WALLET, user?.id],
        queryFn:() =>
            DaoTrainingService.getWallet((user?.id)),
        enabled: !!user,
    })
}
