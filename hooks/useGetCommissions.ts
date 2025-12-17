import { useQuery } from '@tanstack/react-query'
import {DaoTrainingService} from "@/services/dao-training-service";
import {User} from "@/types";
import {GET_COMMISSIONS, CREATE_WALLET} from "@/lib/constants";

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


