import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useAxiosSecure } from "../../hook/useAxiosSecure";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateStatus } from "../../api/bookings";

const CheckoutForm = ({ closeModal, bookingInfo }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // generate client secret and save in state
    if (bookingInfo.price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: bookingInfo.price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [bookingInfo, axiosSecure]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    console.log(user);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        // save payment info in db
        const paymentInfo = {
          ...bookingInfo,
          transactionId: paymentIntent.id,
          date: new Date(),
        };

        axiosSecure.post("/bookings", paymentInfo).then((res) => {
          if (res.data.insertedId) {
            updateStatus(paymentInfo.roomId, true)
              .then((data) => {
                console.log(data);
                const text = `Booking Successfully: ${paymentIntent.id}`;
                toast.success(text);
                navigate("/dashboard/mybooking");
                closeModal();
              })
              .catch((error) => console.log(error));
          }
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex mt-2 justify-around">
          <button
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            disabled={!stripe}
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            //   onClick={modalHandler}
          >
            Pay {bookingInfo.price}$
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-500">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
