import { GreetService } from "./bindings/changeme";

const resultElement = document.getElementById("result");
const errorDetailsElement = document.getElementById("error-details");

// Estimate URL length that would be generated
function estimateUrlLength(text) {
  const baseUrl = "http://wails.localhost:9245/wails/runtime";
  const encodedText = encodeURIComponent(text);
  const mockPayload = {
    "call-id": "mock-call-id-1234567890",
    methodID: 2583521458,
    args: [encodedText],
  };
  const encodedPayload = encodeURIComponent(JSON.stringify(mockPayload));
  return baseUrl.length + "?object=0&method=0&args=".length + encodedPayload.length;
}

// Generate and send text via Service Call
window.sendTextViaService = async () => {
  const sizeInput = document.getElementById("size-input");
  const unitSelect = document.getElementById("unit-select");
  const serviceBtn = document.getElementById("service-btn");

  const sizeValue = parseFloat(sizeInput.value);
  const unit = unitSelect.value;

  if (!sizeValue || sizeValue <= 0) {
    resultElement.textContent = "Please enter a valid size";
    return;
  }

  // Calculate target size in bytes
  let targetSize;
  switch (unit) {
    case "B":
      targetSize = sizeValue;
      break;
    case "KB":
      targetSize = sizeValue * 1024;
      break;
    case "MB":
      targetSize = sizeValue * 1024 * 1024;
      break;
    default:
      targetSize = sizeValue * 1024;
  }

  // Generate text
  const chunk = "This is a test string for generating text data. ";
  const repeatCount = Math.ceil(targetSize / chunk.length);
  const generatedText = chunk.repeat(repeatCount);

  // Update UI
  serviceBtn.disabled = true;
  serviceBtn.textContent = "Sending...";
  resultElement.textContent = `Sending ${(generatedText.length / 1024).toFixed(1)} KB of text...`;
  errorDetailsElement.style.display = "none";

  const startTime = performance.now();
  const estimatedUrlLength = estimateUrlLength(generatedText);

  console.log(`Sending ${generatedText.length} characters`);
  console.log(`Estimated URL length: ${estimatedUrlLength.toLocaleString()} characters`);

  try {
    const result = await GreetService.ProcessFrontendText(generatedText);

    // Success
    const totalTime = performance.now() - startTime;
    resultElement.textContent = `✅ Success! Processed ${generatedText.length} characters in ${totalTime.toFixed(2)}ms`;
    resultElement.style.color = "#4ade80";

    console.log(`✅ Success in ${totalTime.toFixed(2)}ms`);
  } catch (err) {
    // Error
    const totalTime = performance.now() - startTime;
    const errorMessage = err.message || err.toString();

    resultElement.textContent = `❌ Error after ${totalTime.toFixed(2)}ms: ${errorMessage}`;
    resultElement.style.color = "#f87171";

    // Show error details
    errorDetailsElement.innerHTML = `
      <h4>Error Details:</h4>
      <ul>
        <li><strong>Payload size:</strong> ${generatedText.length.toLocaleString()} characters</li>
        <li><strong>Estimated URL length:</strong> ${estimatedUrlLength.toLocaleString()} characters</li>
        <li><strong>Error:</strong> ${errorMessage}</li>
      </ul>
    `;
    errorDetailsElement.style.display = "block";

    console.error("Error:", err);
    console.error("Payload size:", generatedText.length);
    console.error("Estimated URL length:", estimatedUrlLength);
  }

  serviceBtn.disabled = false;
  serviceBtn.textContent = "Send via Service";
};

// Preset functions
window.setPreset = (size, unit) => {
  document.getElementById("size-input").value = size;
  document.getElementById("unit-select").value = unit;
};
