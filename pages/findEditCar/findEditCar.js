//@ts-nocheck
import { API_URL } from "../../settings.js"

// Add id to this URL to get a single user
const URL = `${API_URL}/cars`;

export function initFindEditCar() {
  const carIdInput = document.querySelector("#car-id-input");
  const btnFetchCar = document.querySelector("#btn-fetch-car");
  const carId = document.querySelector("#car-id");
  const brand = document.querySelector("#brand");
  const model = document.querySelector("#model");
  const pricePerDay = document.querySelector("#price-pr-day");
  const bestDiscount = document.querySelector("#best-discount");
  const btnSubmitEditedCar = document.querySelector("#btn-submit-edited-car");
  const btnDeleteCar = document.querySelector("#btn-delete-car");
  const infoText = document.querySelector("#info-text");
  const status = document.querySelector("#status");

  btnFetchCar.addEventListener("click", async () => {
    const id = carIdInput.value;
    try {
      const res = await fetch(`${URL}/${id}`);
      const data = await res.json();
      if (data.error) {
        infoText.textContent = data.error;
        return;
      }
      if (!data.id) {
        infoText.textContent = "No car with that ID exist";
        return;
      }
      infoText.textContent = "";
      carId.value = data.id;
      brand.value = data.brand;
      model.value = data.model;
      pricePerDay.value = data.pricePrDay;
      bestDiscount.value = data.bestDiscount;
    } catch (err) {
      infoText.textContent = "Error fetching car data";
    }
  });

  btnSubmitEditedCar.addEventListener("click", async () => {
    const id = carId.value;
    const data = {
      brand: brand.value,
      model: model.value,
      pricePerDay: pricePerDay.value,
      bestDiscount: bestDiscount.value,
    };
    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "PUT",
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
      status.textContent = "Car data updated successfully";
    } catch (err) {
      status.textContent = "Error updating car data";
    }
  });

  btnDeleteCar.addEventListener("click", async () => {
    const id = carId.value;
    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.error) {
        status.textContent = result.error;
        return;
      }
      status.textContent = "Car deleted successfully";
      carId.value = "";
      brand.value = "";
      model.value = "";
      pricePerDay.value = "";
      bestDiscount.value = "";
    } catch (err) {
      status.textContent = "Error deleting car";
    }
  });
}
