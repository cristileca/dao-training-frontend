import { User, UserWithSubordinates } from "@/types";

export function computeSubordinates(
  users: User[],
  rootUserId: string
): UserWithSubordinates | null {
    
    // Map id -> user
    const userMap = new Map<string, UserWithSubordinates>();
    
    // Initialize users
    users.forEach(u => {
        userMap.set(u.id, {
            ...u,
            children: [],
            _directSubordinates: 0,
            _totalSubordinates: 0
        });
    });
    
    // Build parent -> children relations
    users.forEach(u => {
        
        if (!u.referral_id) return;
        
        const parent =
          userMap.get(u.referral_id);
        
        const child =
          userMap.get(u.id);
        
        if (parent && child) {
            
            parent.children.push(child);
            
            parent._directSubordinates++;
        }
        
    });
    
    // Recursive total calculator
    function countTotal(
      user: UserWithSubordinates
    ): number {
        
        let total = user.children.length;
        
        user.children.forEach(child => {
            total += countTotal(child);
        });
        
        user._totalSubordinates = total;
        
        return total;
    }
    
    const root =
      userMap.get(rootUserId);
    
    if (!root) return null;
    
    countTotal(root);
    
    return root;
}