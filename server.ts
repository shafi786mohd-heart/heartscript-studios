import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory leads store (simulating database for B2B portal)
interface QuoteLead {
  id: string;
  timestamp: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  buildingType: string;
  elevatorCount: number;
  shaftConstraints: string[];
  selectedSolutions: string[];
  additionalNotes: string;
  aiAssessment?: string;
}

const leads: QuoteLead[] = [
  {
    id: "lead-1",
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
    clientName: "Eleanor Vance",
    companyName: "Summit Builders Inc.",
    email: "e.vance@summitbuilders.com",
    phone: "+1 (555) 234-5678",
    buildingType: "Commercial Office (High-Rise)",
    elevatorCount: 8,
    shaftConstraints: ["CAT6 Breakages", "Water Discharge Ban", "No Signal in Shaft"],
    selectedSolutions: ["Dry AC Integration", "Wireless CCTV System", "IoT Monitoring"],
    additionalNotes: "We are developing a new 45-story commercial tower and need premium cabin cooling without any risks of condensation water on top of the cars.",
    aiAssessment: "High-priority commercial lead. Key concerns are safety (water discharge ban) and reliability (traveling cable breakage). Recommended fit: Dry AC + High-Speed Wireless CCTV Package."
  }
];

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getAi(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// B2B Lead RFQ endpoints
app.post("/api/leads", async (req, res) => {
  try {
    const {
      clientName,
      companyName,
      email,
      phone,
      buildingType,
      elevatorCount,
      shaftConstraints,
      selectedSolutions,
      additionalNotes,
    } = req.body;

    if (!clientName || !companyName || !email) {
      return res.status(400).json({ error: "Missing required contact details." });
    }

    const newLead: QuoteLead = {
      id: `lead-${Date.now()}`,
      timestamp: new Date().toISOString(),
      clientName,
      companyName,
      email,
      phone,
      buildingType,
      elevatorCount: Number(elevatorCount) || 1,
      shaftConstraints: shaftConstraints || [],
      selectedSolutions: selectedSolutions || [],
      additionalNotes: additionalNotes || "",
    };

    // Use Gemini to generate a smart technical pre-assessment of this lead!
    const ai = getAi();
    if (ai) {
      try {
        const prompt = `
          Analyze this B2B inquiry for Elevatech LLP:
          - Client: ${newLead.clientName} (${newLead.companyName})
          - Building: ${newLead.buildingType} with ${newLead.elevatorCount} elevators.
          - Shaft/Structural Constraints reported: ${newLead.shaftConstraints.join(", ") || "None mentioned"}
          - Selected Elevatech Solutions: ${newLead.selectedSolutions.join(", ") || "None selected"}
          - Client Notes: "${newLead.additionalNotes}"

          Write a highly professional 2-sentence sales/engineering pre-assessment. Identify the high-risk challenges (like water discharge with standard ACs, CAT6 cable breaks, or signal drops) and suggest the exact Elevatech engineering approach. Keep it concise, authoritative, and direct.
        `;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            temperature: 0.7,
            systemInstruction: "You are the Elevatech Senior Systems Engineer. You assess inbound leads for building elevator systems.",
          }
        });

        if (response.text) {
          newLead.aiAssessment = response.text.trim();
        }
      } catch (error) {
        console.error("Failed to generate AI lead assessment:", error);
        newLead.aiAssessment = "AI assessment currently unavailable. Standard solutions apply.";
      }
    } else {
      newLead.aiAssessment = "AI assessment unavailable (API Key not configured). Standard B2B follow-up recommended.";
    }

    leads.unshift(newLead);
    res.status(201).json({ success: true, lead: newLead });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "An error occurred." });
  }
});

app.get("/api/leads", (req, res) => {
  res.json({ success: true, leads });
});

// Gemini AI B2B Technical Advisor Chat Endpoint
app.post("/api/advisor/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const ai = getAi();
    if (!ai) {
      return res.status(503).json({
        error: "AI Advisor is currently in consultation mode (API Key not configured). Please configure the GEMINI_API_KEY in secrets.",
        fallbackResponse: "Hello! I am Elevatech's B2B Technical Advisor. To consult with me using real-time intelligent engineering feedback, please provide your GEMINI_API_KEY in the Secrets panel. For now, you can explore our pre-engineered solutions using our interactive Solution Builder, which details our Dry AC, Wireless CCTV, and IoT diagnostics!"
      });
    }

    // Format messages for the generateContent API
    // The contents parameter accepts string or parts or Content array.
    // Let's pass the conversation history in content format: [{role: 'user', parts: [{text: ...}]}, {role: 'model', parts: [{text: ...}]}]
    const apiContents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: apiContents,
      config: {
        systemInstruction: `
          You are the lead B2B Technical Advisor and Web Strategist for Elevatech LLP (tagline: "Enabling Technologies for Elevator").
          Elevatech is a premier engineering company providing B2B solutions for the elevator industry that bridge the gap where traditional elevator OEMs fall short.
          
          Our core specializations & proprietary solutions:
          1. Dry AC Cabin Air Conditioner: Standard ACs discharge water. Elevatech deploys a specialized 'Dry AC' system that does not discharge water on the car top, preventing safety hazards and compliance failures in tight moving spaces.
          2. Wireless CCTV & Communications: Traveling cables (CAT6) undergo massive tension, bending, and break continuously at high speeds. Elevatech solves this with ruggedized, interference-free, high-bandwidth Wireless CCTV systems.
          3. IoT Smart Gateway & Monitoring: Provides real-time telemetry, vibration sensing, and predictive maintenance for elevator fleets, converting dumb cabins into smart responsive spaces.
          4. Smart Access Control & Biometrics: Multi-factor and touchless authentication configured specifically for vertical transportation.
          5. Multimedia Info Screens: High-resolution media boards configured to receive real-time feeds inside a metal Faraday-cage elevator cabin without signal loss.

          Guidelines for interaction:
          - Speak as a distinguished, authoritative B2B systems engineer. Be highly precise, consultative, and professional. Avoid fluffy marketing jargon.
          - Address the structural constraints of elevators: moving nature, high-speed cable wear, lack of signal, strict constraints on water condensation/leakage, and minimal space.
          - Guide the client towards finding a custom engineered solution based on their building type (Commercial high-rise, Healthcare, Premium Residential, Industrial).
          - Suggest they try our interactive "Elevator Cabin Solution Builder" on the homepage to construct a formal RFQ (Request for Quote).
          - Limit responses to 2-3 highly scannable, well-formatted paragraphs with crisp bullet points where appropriate.
        `,
        temperature: 0.7,
      },
    });

    res.json({ response: response.text });
  } catch (err: any) {
    console.error("Gemini Advisor API error:", err);
    res.status(500).json({ error: err.message || "An error occurred with the AI Advisor." });
  }
});

// Serve static assets and forward to Vite in dev
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Elevatech Server listening on port ${PORT}`);
  });
}

startServer();
