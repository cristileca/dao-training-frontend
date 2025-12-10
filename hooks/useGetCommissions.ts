
import { useQuery } from '@tanstack/react-query'
import {DaoTrainingService} from "@/services/dao-training-service";
import {User} from "@/types";


export const GET_COMMISSIONS = 'GET_COMMISSIONS'
export const CREATE_WALLET = 'CREATE_WALLET'



export const useGetcommissions = (
    params: {user:User}
) => {
    return useQuery({
        queryKey: [GET_COMMISSIONS],
        queryFn: () =>
            DaoTrainingService.getCommisions(params.user?.id),
        enabled: !!params.user?.id,
    })
}

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