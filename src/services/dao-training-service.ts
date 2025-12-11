const getCommissionsRoute = 'api/commissions';
const createWalletRoute = 'api/create-wallet';

function getCookie(name: string) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
    return null;
}

export const DaoTrainingService =  {

    getCommisions : async (userId:string) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_COMMISSIONS_URL}${getCommissionsRoute}/${userId}`,
        );

        return await response.json()
    },

    createWallet: async (userId:unknown) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_COMMISSIONS_URL}api/create-wallet/${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({})
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
            console.log(userId);
            const res = await fetch(`${process.env.NEXT_PUBLIC_COMMISSIONS_URL}api/get-wallet/${userId}`)
            if (!res.ok) {
                const text = await res.text();
                console.log(text)
                return null;
            }

            return await res.json();
        } catch (e)
            { console.log(e) }
    },
}