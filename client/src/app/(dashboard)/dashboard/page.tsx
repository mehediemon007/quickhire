import { getSession } from "@/lib/auth";

async function getProfileData() {
    const payloads = await getSession()

    return payloads
}

export default async function DashboardPage() {
    const payloads = await getProfileData();

    console.log("User is", payloads)
    return <div>Welcome, {payloads?.userId || 'Not'}</div>;
}