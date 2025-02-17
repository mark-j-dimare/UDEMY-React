import { useContext } from "react"
import Modal from "./UI/Modal.jsx"
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx"
import UserProgressContext from "../store/UserProgressContext.jsx";
import { currencyFormatter } from "../util/formatting";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        });
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
                <p className="modal-actions">
                    <Button type="button" onClick={handleClose} textOnly>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    )
}