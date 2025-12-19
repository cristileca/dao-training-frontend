"use client";
import React, { useEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";
import "@fortawesome/fontawesome-free/css/all.css";
import { UserWithSubordinates } from "@/types";

interface OrgChartProps {
    users: UserWithSubordinates[];
}

const OrgChartComponent: React.FC<OrgChartProps> = ({ users }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    const calculateTotalSubordinates = (user: UserWithSubordinates, allUsers: UserWithSubordinates[]): number => {
        const children = allUsers.filter(u => u.referral_id === user.id);
        const total = children.reduce((acc, child) => acc + 1 + calculateTotalSubordinates(child, allUsers), 0);
        return total;
    };

    useEffect(() => {
        if (!chartRef.current) return;

        const dataFlattened = users.map(u => {
            const direct = users.filter(sub => sub.referral_id === u.id).length;
            const total = calculateTotalSubordinates(u, users);
            return {
                ...u,
                parentId: u.referral_id || null,
                _directSubordinates: direct,
                _totalSubordinates: total,
            };
        });

        const roots = dataFlattened.filter(u => !u.parentId);
        let finalData = dataFlattened;
        if (roots.length > 1) {
            const fakeRoot = {
                id: "root",
                name: "Root",
                parentId: null,
                _directSubordinates: roots.length,
                _totalSubordinates: roots.length,
            };
            finalData = [fakeRoot, ...dataFlattened.map(u => roots.includes(u) ? { ...u, parentId: "root" } : u)];
        }

        const chart = new OrgChart()
            .container(chartRef.current)
            .data(finalData)
            .nodeHeight(() => 70)
            .nodeWidth(d => (d.depth === 0 ? 250 : d.depth === 1 ? 220 : 140))
            .childrenMargin(() => 50)
            .compactMarginBetween(() => 35)
            .compactMarginPair(() => 30)
            .buttonContent(({ node }) => {
                return `<div style="border-radius:3px;padding:3px;font-size:10px;margin:auto auto;background-color:lightgray">
                    <span style="font-size:9px">${
                    node.children ? `<i class="fas fa-chevron-up"></i>` : `<i class="fas fa-chevron-down"></i>`
                }</span> ${node.data._directSubordinates || 0}
                </div>`;
            })
            .nodeContent(d => {
                const colors = ["#278B8D", "#404040", "#0C5C73", "#33C6CB"];
                const color = colors[d.depth % colors.length];
                return `
                    <div style="background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:50px">
                        <div style="position:absolute;top:-15px;width:${d.width}px;text-align:center;color:#fafafa;">
                            <div style="margin:0 auto;background-color:${color};display:inline-block;padding:8px;padding-bottom:0px;border-radius:5px">${d.data.name}</div>
                        </div>
                        <div style="color:#fafafa;font-size:${d.depth < 2 ? 16 : 12}px;font-weight:bold;margin-left:20px;margin-top:25px">
                            ${d.data.name}
                        </div>
                        <div style="color:#fafafa;margin-left:20px;margin-top:5px">
                            Direct Referrals: ${d.data._directSubordinates || 0}, Total Referrals: ${d.data._totalSubordinates || 0}
                        </div>
                    </div>
                `;
            });

        chart.render();
    }, [users]);

    return <div ref={chartRef} style={{ height: "1200px", backgroundColor: "#fffeff" }} />;
};

export default OrgChartComponent;
