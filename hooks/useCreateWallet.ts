
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
    params:{user:User}
) =>
    useQuery({
        queryKey:[GET_WALLET],
        queryFn:() =>
            DaoTrainingService.getWallet((params.user?.id)),
        enabled: !!params.user?.id,
    })