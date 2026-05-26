import { useState } from "react";

import { useNavigate }
from "react-router-dom";


const ShippingPage = () => {

  const navigate = useNavigate();


  const [address, setAddress] =
    useState("");

  const [city, setCity] =
    useState("");

  const [postalCode, setPostalCode] =
    useState("");

  const [country, setCountry] =
    useState("");


  const submitHandler = (e) => {

    e.preventDefault();


    localStorage.setItem(

      "shippingAddress",

      JSON.stringify({

        address,
        city,
        postalCode,
        country,
      })
    );


    navigate("/placeorder");
  };


  return (
    <div className="max-w-xl mx-auto mt-10 border p-8 rounded-xl shadow-lg">

      <h1 className="text-3xl font-bold mb-6">

        Shipping Address

      </h1>


      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          required
        />


        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          required
        />


        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) =>
            setPostalCode(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          required
        />


        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) =>
            setCountry(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          required
        />


        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg"
        >

          Continue

        </button>

      </form>

    </div>
  );
};

export default ShippingPage;