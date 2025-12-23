require("dotenv").config();

const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const cors = require("cors");
const morgan = require("morgan");
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

// --- Cấu hình multer để lưu file tạm ---
const upload = multer({ dest: "uploads/" });

// --- Hardhat local node RPC ---
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// --- Private key từ .env ---
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// --- Contract info ---
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_PATH = path.join(__dirname, "../blockchain-verify/artifacts/contracts/DataVerification.sol/DataVerification.json");
const CONTRACT_ABI = JSON.parse(fs.readFileSync(CONTRACT_PATH, "utf8")).abi;

// --- Contract instance ---
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

app.use(morgan("dev"));
app.use(cors());

// --- Helper function ---
const computeHash = (buffer) => "0x" + crypto.createHash("sha256").update(buffer).digest("hex");

// --- Route upload file ---
app.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    try {
        const fileBuffer = fs.readFileSync(req.file.path);
        const hash = computeHash(fileBuffer);

        // Check if hash already exists
        const exists = await contract.verifyHash(hash);
        if (exists) {
            fs.unlinkSync(req.file.path);
            return res.json({ success: false, message: "Hash already exists" });
        }

        // Store hash on blockchain
        const tx = await contract.storeHash(hash);
        await tx.wait();

        // Remove temporary file
        fs.unlinkSync(req.file.path);

        res.json({ success: true, message: "File hash stored on blockchain", hash });
    } catch (err) {
        console.error(err);
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- Route verify file ---
app.post("/verify", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    try {
        const fileBuffer = fs.readFileSync(req.file.path);
        const hash = computeHash(fileBuffer);

        const exists = await contract.verifyHash(hash);

        fs.unlinkSync(req.file.path);

        res.json({ success: true, hash, exists });
    } catch (err) {
        console.error(err);
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- Start server ---
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
