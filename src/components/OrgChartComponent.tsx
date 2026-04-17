"use client";

import React, { useEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";

interface Props {
    users: any[];
}

const OrgChartComponent: React.FC<Props> = ({ users }) => {
    
    const chartRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        
        if (!chartRef.current || !users.length) return;
        
        // IMPORTANT: d3-org-chart needs flat structure
        const data = users.map(u => ({
            id: u.id,
            name: u.name,
            parentId: u.parentId
        }));
        
        console.log("FINAL DATA FOR CHART:", data);
        
        const chart = new OrgChart()
          .container(chartRef.current)
          .data(data)
          .nodeWidth(() => 220)
          .nodeHeight(() => 120)
          .childrenMargin(() => 40)
          .compactMarginBetween(() => 30)
          .compactMarginPair(() => 20)
          .layout("left")
          .nodeContent((d: any) => {
              return `
                    <div style="
                        padding:12px;
                        border-radius:12px;
                        background:navy;
                        color:white;
                        text-align:center;
                        font-family: Arial;
                    ">
                        <div style="font-weight:bold;">
                            ${d.data.name}
                        </div>

                        <div style="font-size:12px;margin-top:6px;">
                            Direct: ${d.data._directSubordinates || 0}
                            <br/>
                            Total: ${d.data._totalSubordinates || 0}
                        </div>
                    </div>
                `;
          });
        
        chart.render();
        
    }, [users]);
    
    return (
      <div
        ref={chartRef}
        style={{
            height: "100vh",
            width: "100%",
            background: "#fff"
        }}
      />
    );
};

export default OrgChartComponent;