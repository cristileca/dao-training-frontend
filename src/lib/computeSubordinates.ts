import {User, UserWithSubordinates} from "@/types";

export function computeSubordinates(users:User[]):UserWithSubordinates{
    const userMap = new Map(users.map(u=> [u.id, {...u, _directSubordinates:0, _totalSubordinates:0}]));

    users.forEach(u => {
        if (u.referral_id && userMap.has(u.referral_id)) {
            userMap.get(u.referral_id)!._directSubordinates!++;
        }

        function countTotal(id: string): number {
            const user = userMap.get(id);
            if (!user) return 0;
            const children = users.filter(u => u.referral_id === id);
            let total = children.length;
            children.forEach(c => {
                total += countTotal(c.id);
            });
            user._totalSubordinates = total;
            return total;
        }

        users.filter(u=> !u.referral_id).forEach(u => countTotal(u.id));
    });
    return Array.from(userMap.values()) as unknown as UserWithSubordinates ;
}