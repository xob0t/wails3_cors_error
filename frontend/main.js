import { GreetService } from "./bindings/changeme";

const largeTextResultElement = document.getElementById("large-text-result");
const textStatusElement = document.getElementById("text-status");
const smallTextResultElement = document.getElementById("small-text-result");
const smallTextStatusElement = document.getElementById("small-text-status");

let largeText = null;
let smallText = null;

// Generate approximately 100KB of text
window.generateSmallText = () => {
  const generateBtn = document.getElementById("generate-small-btn");
  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";
  smallTextStatusElement.textContent = "Generating text...";

  setTimeout(() => {
    const targetSize = 100 * 1024; // 100KB
    const chunk = "This is a test string for generating small text data. ";
    const chunkSize = chunk.length;
    const repeatCount = Math.ceil(targetSize / chunkSize);

    smallText = chunk.repeat(repeatCount);

    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Text (100KB)";
    smallTextStatusElement.textContent = `Generated ${(smallText.length / 1024).toFixed(2)} KB of text`;

    document.getElementById("small-service-btn").disabled = false;
  }, 10);
};

// Generate approximately 2MB of text
window.generateText = () => {
  const generateBtn = document.getElementById("generate-btn");
  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";
  textStatusElement.textContent = "Generating text...";

  setTimeout(() => {
    const targetSize = 2 * 1024 * 1024; // 2MB
    const chunk = "This is a test string for generating large text data. ";
    const chunkSize = chunk.length;
    const repeatCount = Math.ceil(targetSize / chunkSize);

    largeText = chunk.repeat(repeatCount);

    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Text (2MB)";
    textStatusElement.textContent = `Generated ${(largeText.length / 1024 / 1024).toFixed(2)} MB of text`;

    document.getElementById("service-btn").disabled = false;
  }, 10);
};

// Send small text via Service Call
window.sendSmallTextViaService = () => {
  if (!smallText) {
    smallTextResultElement.textContent = "Please generate text first!";
    return;
  }

  const serviceBtn = document.getElementById("small-service-btn");
  serviceBtn.disabled = true;
  serviceBtn.textContent = "Sending...";
  smallTextResultElement.textContent = "Sending small text via service call...";

  const startTime = performance.now();

  GreetService.ProcessFrontendText(smallText)
    .then((result) => {
      const totalTime = performance.now() - startTime;
      smallTextResultElement.textContent = `Success! ${result.message} (Total time: ${totalTime.toFixed(2)}ms)`;
      serviceBtn.disabled = false;
      serviceBtn.textContent = "Send via Service";
    })
    .catch((err) => {
      const totalTime = performance.now() - startTime;
      smallTextResultElement.textContent = `Error after ${totalTime.toFixed(2)}ms: ${err.message || err}`;
      serviceBtn.disabled = false;
      serviceBtn.textContent = "Send via Service";
      console.error("Service call error:", err);
    });
};

// Send large text via Service Call
window.sendLargeTextViaService = () => {
  if (!largeText) {
    largeTextResultElement.textContent = "Please generate text first!";
    return;
  }

  const serviceBtn = document.getElementById("service-btn");
  serviceBtn.disabled = true;
  serviceBtn.textContent = "Sending...";
  largeTextResultElement.textContent = "Sending large text via service call...";

  const startTime = performance.now();

  GreetService.ProcessFrontendText(largeText)
    .then((result) => {
      const totalTime = performance.now() - startTime;
      largeTextResultElement.textContent = `Success! ${result.message} (Total time: ${totalTime.toFixed(2)}ms)`;
      serviceBtn.disabled = false;
      serviceBtn.textContent = "Send via Service";
    })
    .catch((err) => {
      const totalTime = performance.now() - startTime;
      largeTextResultElement.textContent = `Error after ${totalTime.toFixed(2)}ms: ${err.message || err}`;
      serviceBtn.disabled = false;
      serviceBtn.textContent = "Send via Service";
      console.error("Service call error:", err);
    });
};

// Initialize UI state
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("service-btn").disabled = true;
  document.getElementById("small-service-btn").disabled = true;
});
