"use client";

import React, { useEffect, useState } from "react";
import OrgChartComponent from "@/components/OrgChartComponent";
import { useAuth } from "@/context/AuthContext";
import { getSubTree } from "@/lib/getSubTree";

const TreePage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    if (!user) return;
    
    fetch("http://localhost:8000/api/users-referrals")
      .then(res => res.json())
      .then((data) => {
        
        const normalized = data.map(u => ({
          id: u.id,
          name: u.name,
          parentId: u.referral_id
        }));
        const subtree = getSubTree(data, user.id);
        
        console.log("SUBTREE ROOTED:", subtree);
        
        setUsers(subtree as any);
      });
    
  }, [user]);
  
  return (
    <div className={"bg-slate-500"}>
      {users.length > 0 && (
        <OrgChartComponent users={users} rootId={user?.id} />
      )}
    </div>
  );
};

export default TreePage;