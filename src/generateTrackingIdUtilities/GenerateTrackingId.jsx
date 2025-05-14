import axios from "axios";

export const generateTrackingId = () => {
    return "TRK-" + Math.random().toString(36).substr(2, 9).toUpperCase();
};

export const sendTrackingToSheet = async (orders) => {
    const sheetURL = "https://script.google.com/macros/s/AKfycbz_PR8UZWQ7p40rX4ywympwP60sOhtbyjBG3SC7tj_RNzAziuLxMUkYPUbdkfy-pvLx/exec";

    console.log("Order received in sendTrackingToSheet:", orders);

    const payload = {
        orderId: orders._id,
        userEmail: orders.userEmail,
        products: orders.cartItems.map(item => `${item.title} x ${item.quantity}`).join(", "),
        status: orders.status,
        dispatchDate: new Date().toLocaleDateString(),
        trackingId: generateTrackingId(),
    };

    try {
        await axios.post(sheetURL, payload);
        console.log("Data sent to Google Sheet");
    } catch (err) {
        console.error("Error sending data to Google Sheet:", err.message);
    }
};
