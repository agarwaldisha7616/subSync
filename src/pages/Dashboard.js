import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import AddSubscription from "../components/SubscriptionTracker/AddSubscription";
import SubscriptionList from "../components/SubscriptionTracker/SubscriptionList";
import { auth } from "../firebase";
import Header from "../components/Header"

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [updateTrigger, setUpdateTrigger] = useState(false);

    if (!user) {
        toast.error("User not logged in!");
        return null;
    }

    function handleSubscriptionAdded() {
        setUpdateTrigger(!updateTrigger); // Toggle to refetch the subscriptions
    }

    return (
        <div>
            <Header />
            <AddSubscription userId={user.uid} onSubscriptionAdded={handleSubscriptionAdded} />
            <SubscriptionList userId={user.uid} updateTrigger={updateTrigger} />
        </div>
    );
}

export default Dashboard;