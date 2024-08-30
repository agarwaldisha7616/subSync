import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function AddSubscription({ userId, onSubscriptionAdded }) {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [renewalFrequency, setRenewalFrequency] = useState("Monthly");
    const [cost, setCost] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Debit Card");
    const [autoRenewal, setAutoRenewal] = useState(false);
    const [category, setCategory] = useState("Streaming");

    async function handleSubmit(event) {
        event.preventDefault();

        if (!name || !startDate || !endDate || !cost || !renewalFrequency || !paymentMethod || !category) {
            toast.error("All fields are mandatory");
            return;
        }

        try {
            await addDoc(collection(db, "subscriptions"), {
                name,
                startDate,
                endDate,
                renewalFrequency,
                cost: parseFloat(cost),
                paymentMethod,
                autoRenewal,
                category,
                userId,
                createdAt: new Date(),
            });

            toast.success("Subscription added!");
            setName("");
            setStartDate("");
            setEndDate("");
            setCost("");
            setRenewalFrequency("Monthly");
            setPaymentMethod("Debit Card");
            setAutoRenewal(false);
            setCategory("Streaming");
            onSubscriptionAdded();
        } catch (e) {
            toast.error("Error adding subscription: " + e.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="add-subscription">
            <h2>Add Subscription</h2>
            <div className="form-grid">
                <div className="input-wrapper">
                    <label>Subscription Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Netflix"
                        className="custom-input"
                    />
                </div>
                <div className="input-wrapper">
                    <label>Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="custom-input"
                    />
                </div>
                <div className="input-wrapper">
                    <label>End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="custom-input"
                    />
                </div>
                <div className="input-wrapper">
                    <label>Renewal Frequency</label>
                    <select
                        value={renewalFrequency}
                        onChange={(e) => setRenewalFrequency(e.target.value)}
                        className="custom-input"
                    >
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                        <option value="Custom">Custom</option>
                    </select>
                </div>
                <div className="input-wrapper">
                    <label>Cost</label>
                    <input
                        type="number"
                        step="0.01"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        placeholder="e.g., 9.99"
                        className="custom-input"
                    />
                </div>
                <div className="input-wrapper">
                    <label>Payment Method</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="custom-input"
                    >
                        <option value="Debit Card">Debit Card</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="input-wrapper">
                    <label>Auto Renewal</label>
                    <input
                        type="checkbox"
                        checked={autoRenewal}
                        onChange={(e) => setAutoRenewal(e.target.checked)}
                        className="custom-input"
                    />
                </div>
                <div className="input-wrapper">
                    <label>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="custom-input"
                    >
                        <option value="Streaming">Streaming</option>
                        <option value="Music & Audio">Music & Audio</option>
                        <option value="Health & Fitness">Health & Fitness</option>
                        <option value="Software Tools">Software Tools</option>
                        <option value="Learning">Learning</option>
                        <option value="Productivity">Productivity</option>
                    </select>
                </div>
            </div>
            <button type="submit">Add Subscription</button>
        </form>
    );
}
export default AddSubscription;