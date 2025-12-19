declare module 'd3-org-chart' {
    export class OrgChart {
        constructor();

        data(data: any): this;
        container(selector: any): this;
        render(): this;
    }
}
