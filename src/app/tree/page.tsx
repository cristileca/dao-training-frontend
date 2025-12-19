"use client";
import React, { useEffect, useState } from "react";
import OrgChartComponent from "@/components/OrgChartComponrnt";
import { computeSubordinates} from "@/lib/computeSubordinates";
import { User, UserWithSubordinates } from "@/types";
import {useAuth} from "@/context/AuthContext";

const TreePage: React.FC = () => {
    const [users, setUsers] = useState<UserWithSubordinates[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/users-referrals") // Laravel API
            .then(res => res.json())
            .then((data: User[]) => {
                const usersWithSubs = computeSubordinates(data);
                setUsers(usersWithSubs);
            })
            .catch(err => console.error(err));
    }, []);

    return <div>{users.length > 0 && <OrgChartComponent users={users} />}</div>;
};

export default TreePage;
