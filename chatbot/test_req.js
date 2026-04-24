const message = "What is the two pointers technique?";

fetch("http://localhost:3000/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ message })
}).then(res => res.json())
  .then(data => console.log("Response:", JSON.stringify(data, null, 2)))
  .catch(err => console.error("Error:", err));
