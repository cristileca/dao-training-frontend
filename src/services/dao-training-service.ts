import {User} from "@/types"

const getCommissionsRoute = 'api/commissions';
export const DaoTrainingService =  {
    getCommisions : async (userId:string) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_COMMISSIONS_URL}${getCommissionsRoute}/${userId}`,
        );

        return await response.json()
    }
}