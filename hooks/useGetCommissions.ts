
import { useQuery } from '@tanstack/react-query'
import {DaoTrainingService} from "@/services/dao-training-service";
import {User} from "@/types";


export const GET_COMMISSIONS = 'GET_COMMISSIONS '


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