import { useContext } from "react"
import Modal from "./UI/Modal.jsx"
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import Error from "./Error.jsx";
import CartContext from "../store/CartContext.jsx"
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import { currencyFormatter } from "../util/formatting";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));
    }

    let actions = (
        <>
            <Button type="button" onClick={handleClose} textOnly>Close</Button>
            <Button>Submit Order</Button>
        </>
    )

    if (isLoading) {
        actions = (
            <span>Sending order data...</span>
        )
    }

    if (data && !error) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>Check your email for your receipt.</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
    }

    return (
        <Modal onClose={handleClose} open={userProgressCtx.progress === 'checkout'}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Ammount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" id="name" type="text" required />
                <Input label="Email Address" id="email" type="email" required />
                <Input label="Street Address" id="street" type="text" required />
                <div className="control-row">
                    <Input label="City" id="city" type="text" required />
                    <Input label="Postal Code" id="postal-code" type="text" required />
                </div>

                {error && <Error title="Failed to submit order" message={error} />}

                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}