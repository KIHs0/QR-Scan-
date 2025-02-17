const wrapper = document.querySelector("wrapper");
const form = document.querySelector("form");
const file = document.querySelector("input");
const print = document.querySelector("p");
const img = document.querySelector("img");

async function fetchRequest(file, formData) {
  // Show loading text while scanning

  // Make the POST request to the QR code API
  const response = await fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  // Parse the response as JSON
  const result = await response.json();
  const qrData = result[0]?.symbol[0]?.data;

  // Update UI based on the result
  if (qrData) {
    updateUIWithQRData(qrData, file);
  } else {
    print.innerText = "Couldn't Scan QR Code";
  }
}

function updateUIWithQRData(qrData, file) {
  const textarea = document.querySelector("textarea");
  textarea.innerText = qrData;

  // Display the uploaded image
  const imgElement = form.querySelector("img");
  imgElement.src = URL.createObjectURL(file);

  wrapper.classList.add("active");
}

file.addEventListener("change", (e) => {
  const data = e.target.files[0];
  const formcons = new FormData();
  formcons.append("file", data);
  fetchRequest(data, formcons);
});

form.addEventListener("click", () => {
  file.click();
});

const copy = document.querySelector("copy");
copy.addEventListener("click", () => {
  navigator.clipboard.writeText;
});
