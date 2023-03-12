import { API_URL } from "../../settings.js";

export async function initListReservationsAll() {
  const tableBody = document.querySelector("#tablerows");
  const errorParagraph = document.querySelector("#error");
  
  try {
    const response = await fetch(API_URL + "/reservations");
    const reservations = await response.json();

    reservations.forEach((reservation) => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
      <td>${reservation.carId}</td>
      <td>${reservation.carBrand}</td>
      <td>${reservation.carModel}</td>
      <td>${reservation.reservationDate}</td>
      <td>${reservation.price}</td>
      `;
      tableBody.appendChild(tableRow);
    });
  } catch (error) {
    errorParagraph.textContent = "An error occurred while fetching the data.";
  }
}
