
import {useWallet} from "@/lib/useWallet";
import {json} from "node:stream/consumers";

const getCommissionsRoute = 'api/commissions';
const getBundleRoute = 'api/packages';


function getCookie(name: string) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
    return null;
}

const getXsrfToken = async () => {

    return decodeURIComponent(
        document.cookie
            .split("; ")
            .find(row => row.startsWith("XSRF-TOKEN="))
            ?.split("=")[1] || ""
    );
};

export const DaoTrainingService =  {

    getCommisions : async (userId:string) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_COMMISSIONS_URL}${getCommissionsRoute}/${userId}`,
        );
        if (!response.ok) {
            return
        }
        return await response.json()
    },

    createWallet: async (userId:unknown, address:string, balance:number) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_COMMISSIONS_URL}api/create-wallet/${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({balance: 0,
                    address: address}),
                }
            )

            if (!res.ok) {
                const text = await res.text();
                console.error('Error response:', text);
                return null;
            }

            return await res.json();

        } catch (err) {
            console.error('createWallet error:', err);
            return null;
        }
    },

    getWallet: async  (userId:string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_COMMISSIONS_URL}api/get-wallet/${userId}`)
            if (!res.ok) {
                const text = await res.text();
                console.log(text)
                return null;
            }

            return  res.json();
        } catch (e)
            { console.log(e) }
    },

    getBundles: async  () => {
        try{
            const bundles = await fetch(`${process.env.NEXT_PUBLIC_COMMISSIONS_URL}${getBundleRoute}`);
            if(bundles.ok){
                return bundles.json()
            }
            return []
        } catch (e) {
            console.error('Error getBundles error:', e);
        }
    },

    claimCommission: async (commissionId:string) => {

        const xrf_token =  await getXsrfToken();
        try {
                 fetch(`${process.env.NEXT_PUBLIC_COMMISSIONS_URL}${getCommissionsRoute}`,{
                    method: "POST",
                    credentials:"include",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "X-XSRF-TOKEN": xrf_token,

                    },
                    body: JSON.stringify({commission: commissionId}),
                })
            } catch (e) {
                console.log(e);
            }
    },

    buyBundle: async (bundleId:string) => {
        try {
            const xrf_token =  await getXsrfToken();

            await fetch(`${process.env.NEXT_PUBLIC_COMMISSIONS_URL}${getBundleRoute}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": xrf_token,
                },
                body: JSON.stringify({ package_id: bundleId }),
            })
        } catch (e) {
            console.error('Error buyBundleError:', e);
        }
    },

    buy: async (bundleId:string, bundlePrice:number, balance:number) => {
        try {
            if(bundlePrice > balance){
                console.log("Balance too low");
                return 0;
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}