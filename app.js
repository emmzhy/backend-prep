const express = require("express");
const app = express();
let walletBalance = 10000;

app.get("/", (req, res) => {
  res.json({ message: "Express is working on Emmanuel's laptop!" });
});

app.get("/courses", (req, res) => {
  res.json({
    academy: "TS Academy",
    courses: ["Backend Development", "Music", "Development", "Data Analytics"]
  });
});

app.get("/student", (req, res) => {
  res.json({
    name: "Emmanuel",
    studentId: "TSKR445933",
    track: "Backend Development"
  });
});

app.get("/personal", (req, res) => {
  res.json({
    name: "Emmanuel Personal",
    studentId: "TSKR445933",
    track: "Backend Development Personal"
  });
});

app.get("/greet/:name", (req, res) => {
  const userName = req.params.name;
  res.json({
    greeting: "Welcome to backend coding, " + userName + "!",
    status: "Active"
  });
});

app.get("/deposit/:amount", (req, res) => {
  const amount = Number(req.params.amount);
  walletBalance = walletBalance + amount;

  res.json({
    message: "Deposit successful!",
    deposited: amount,
    newBalance: walletBalance
  });
});

app.get("/withdraw/:amount", (req, res) => {
  const amount = Number(req.params.amount);

  if (amount > walletBalance) {
    res.status(400).json({
      error: "Insufficient funds!",
      currentBalance: walletBalance
    });
  } else {
    walletBalance = walletBalance - amount;
    res.json({
      message: "Withdrawal successful!",
      withdrawn: amount,
      remainingBalance: walletBalance
    });
  }
});

// 404 for any other route
app.use((req, res) => {
  res.status(404).json({ error: "404 Route not found" });
});

app.listen(3000, () => {
  console.log("Express server live at http://localhost:3000");
});