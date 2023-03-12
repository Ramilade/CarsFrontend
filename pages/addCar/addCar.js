import { API_URL, FETCH_NO_API_ERROR } from "../../settings.js";

const URL = `${API_URL}/cars`;

export async function initAddCar(match) {
  const brandInput = document.querySelector("#brand");
  const modelInput = document.querySelector("#model");
  const pricePerDayInput = document.querySelector("#price-pr-day");
  const bestDiscountInput = document.querySelector("#best-discount");
  const status = document.querySelector("#status");
  const form = document.querySelector("#form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      brand: brandInput.value,
      model: modelInput.value,
      pricePrDay: pricePerDayInput.value,
      bestDiscount: bestDiscountInput.value,
    };

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.error) {
        status.textContent = result.error;
        return;
      }

      status.textContent = "New car added successfully";
      form.reset();
    } catch (err) {
      status.textContent = FETCH_NO_API_ERROR;
    }
  });
}
