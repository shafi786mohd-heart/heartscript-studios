import { Solution, Industry, TechArticle, FAQ } from "./types";

export const SOLUTIONS: Solution[] = [
  {
    id: "passenger-comfort",
    name: "Passenger Comfort & Air Conditioning",
    problem: "Elevator cabins are compact, poorly ventilated spaces that turn into greenhouses during warm weather. However, standard commercial air conditioners cannot be used because they discharge water (condensation) which accumulates on top of the car, presenting extreme electrical and structural safety hazards.",
    engineeringChallenge: "Design a high-capacity cooling system that fits within tight overhead structural tolerances, operates reliably under continuous acceleration and vertical travel, and produces zero liquid water discharge.",
    solution: "Elevatech's Dry AC. It incorporates a state-of-the-art condensate re-evaporation system. Thermal waste is dynamically channeled back to atomize and evaporate condensation into the exhaust airstream, eliminating water tanks and drain pipes entirely.",
    benefits: [
      "Zero Liquid Discharge: 100% of condensation is re-evaporated and exhausted safely.",
      "Vibration Isolation: Marine-grade dual compressors damp vertical vibration, ensuring a silent, smooth cabin environment.",
      "Ultra-slim Profile: Low-clearance housing design fits onto low-overhead car tops.",
      "Dynamic Air Purification: Integrated medical-grade HEPA filters and UV-C sanitizers clean cabin air every 45 seconds."
    ],
    image: "https://picsum.photos/seed/comfort/800/600",
    icon: "Wind",
    products: [
      {
        id: "dry-ac-v2",
        name: "Dry AC - Model V2",
        tagline: "The water-free vertical air conditioner",
        description: "A compact, heavy-duty cabin air conditioning system engineered specifically for vertical transportation. Features automatic heat atomization of condensation water.",
        features: [
          "Zero water discharge design with auto-evaporation",
          "High COP (Coefficient of Performance) scroll compressor",
          "Digital climate controller compatible with major elevator brands",
          "HEPA + UV-C dual purification module built-in"
        ],
        specs: {
          "Cooling Capacity": "9,000 BTU / 12,000 BTU models",
          "Water Discharge": "0.0 L/hr (Fully atomized thermal re-evaporation)",
          "Overhead Height": "Only 380 mm clearance required",
          "Power Input": "220V, 50/60Hz, 850W active",
          "Vibration Rating": "ISO 18738 Vertical Axis Complaint"
        },
        image: "https://picsum.photos/seed/ac/600/400"
      }
    ]
  },
  {
    id: "shaft-comms",
    name: "Wireless CCTV & Shaft Communication",
    problem: "Traveling CAT6 cables are subjected to relentless mechanical tension, bending, and torsional stress during elevator operation. In high-rise buildings, these cables suffer from fatigue and snap repeatedly, causing costly security camera blackouts and expensive technical repairs.",
    engineeringChallenge: "Establish a high-speed, interference-free, gigabit-speed communication link inside a narrow, metal-heavy, concrete elevator shaft that maintains absolute connection stability at cabin speeds exceeding 8 m/s.",
    solution: "Elevatech Wireless CCTV Link. Utilizing industrial-grade, highly-directional dual-band millimeter-wave transceivers, we establish a secure wireless bridge between the shaft top and the car top. No traveling data cables required.",
    benefits: [
      "Zero Mechanical Wear: Eliminates the physical data cables that break under motion stress.",
      "Ultra-low Latency: Less than 2ms transmission delay, supporting real-time crystal clear 4K security feeds.",
      "Faraday Proof: Operating frequency tuned specifically to prevent signal loss inside steel and concrete shafts.",
      "Plug & Play Integration: Fully compatible with standard ONVIF IP cameras and NVR recording equipment."
    ],
    image: "https://picsum.photos/seed/comms/800/600",
    icon: "Wifi",
    products: [
      {
        id: "wireless-link-max",
        name: "Wireless CCTV Smart-Link",
        tagline: "High-speed wireless communication for traveling cabins",
        description: "An industrial-grade wireless bridge engineered for elevator shafts up to 100 stories. Replaces traveling CAT6 cables with bulletproof millimeter-wave telemetry.",
        features: [
          "Millimeter-wave directional beam-forming tech",
          "Flawless operation at elevator speeds up to 12 m/s",
          "Ruggedized, dustproof IP66 rated enclosures",
          "Auxiliary channel for cabin telemetry & panic buttons"
        ],
        specs: {
          "Throughput": "Up to 1.2 Gbps bidirectional",
          "Max Shaft Height": "450 meters (1,500 feet)",
          "Frequency Band": "5.8 GHz & 60 GHz auto-failover",
          "Latency": "< 1.5 milliseconds",
          "Interference Shield": "Military-grade multi-path reflection filtering"
        },
        image: "https://picsum.photos/seed/wifi/600/400"
      }
    ]
  },
  {
    id: "iot-monitoring",
    name: "IoT Smart Fleet Monitoring",
    problem: "Elevator operators and building managers are blind to real-time elevator performance. They rely on reactive maintenance—waiting for a critical break, door sensor failure, or passengers becoming trapped before calling dispatch.",
    engineeringChallenge: "Extract deep machine telemetry from isolated, proprietary elevator controller boards and transmit it to a centralized cloud system without violating safety regulations or modifying core safety circuits.",
    solution: "Elevatech Smart Gateway and IoT Sensors. Non-intrusive sensory pods (vibration, acoustics, thermal, door travel) coupled with serial controller interfaces transmit continuous elevator state updates to a secure telemetry cloud, enabling predictive, proactive servicing.",
    benefits: [
      "Predictive Maintenance: Detects microscopic bearing wear and door travel friction before a breakdown occurs.",
      "Real-time Dashboard: View cabin coordinates, weight loads, speed curves, and system errors instantly.",
      "Autonomous Dispatch: Automatically alerts technicians with exact fault codes, reducing downtime by 60%.",
      "Comprehensive Compliance: Automatically logs daily test cycles for statutory B2B elevator compliance."
    ],
    image: "https://picsum.photos/seed/iot/800/600",
    icon: "Cpu",
    products: [
      {
        id: "smart-gateway-g3",
        name: "IoT Smart Gateway - G3",
        tagline: "The brain of the modern elevator fleet",
        description: "A secure, non-intrusive edge computing gateway that hooks into the elevator system to harvest telemetry, analyze vibration, and predict maintenance requirements.",
        features: [
          "Edge-computing AI processors for local anomaly detection",
          "Non-intrusive acceleration and vibration sensing arrays",
          "Integrated 5G and Ethernet backhaul with secure fallback",
          "Full BACnet, Modbus, and dry contact controller inputs"
        ],
        specs: {
          "Processor": "Quad-core ARM Edge AI Processor",
          "Sensors Included": "3-Axis Accel, Gyro, Acoustic Pod, Temp/Humidity Probe",
          "Security Protocol": "TLS 1.3, Hardware Secure Element, OAuth 2.0 Client",
          "Integration Type": "BACnet IP, Modbus RTU, Opto-isolated Digital Inputs",
          "Housing": "DIN-rail mounting, flame-retardant ABS, IP54 rated"
        },
        image: "https://picsum.photos/seed/gateway/600/400"
      }
    ]
  },
  {
    id: "access-control",
    name: "Secure Smart Access & Infotainment",
    problem: "Standard access readers and media displays suffer from severe signal dropouts inside steel elevator cabins, which act as Faraday cages. Furthermore, traditional swipe-cards create bottlenecks in high-occupancy buildings during morning rush hours.",
    engineeringChallenge: "Provide high-speed, secure biometric access control and real-time infotainment streams inside a heavily-shielded, moving metal cabin with absolute system uptime.",
    solution: "Elevatech Integrated Smart Access & Media. Using our proprietary in-car Ethernet link, we connect high-speed facial recognition terminals and ultra-thin interactive media screens directly to the building's central IP network, allowing seamless passenger flow.",
    benefits: [
      "Touchless Security: Speed up passenger ingress by 40% with dual-spectral facial authentication.",
      "Rich Infotainment: Stream real-time tenant news, weather, stock tickers, and custom corporate broadcasts.",
      "Emergency Video Intercom: Allow trapped passengers to have two-way high-definition video calls with rescue dispatch.",
      "Smart Routing Integration: Communicates directly with destination dispatch systems to allocate the fastest elevator."
    ],
    image: "https://picsum.photos/seed/security/800/600",
    icon: "Shield",
    products: [
      {
        id: "media-display-15",
        name: "Interactive Cabin Media System",
        tagline: "Connected infotainment and video intercom",
        description: "An ultra-thin, vandalism-proof cabin screen that serves real-time news, emergency alerts, and a secure two-way video intercom for peace of mind.",
        features: [
          "15.6-inch high-brightness IPS touch panel",
          "Vandal-resistant IK10 rated Gorilla glass cover",
          "Integrated 2-way SIP HD video intercom for emergencies",
          "Web-based content management console for building managers"
        ],
        specs: {
          "Display": "15.6\" IPS Panel, 1920x1080 resolution, 500 nits",
          "Network Link": "Ethernet over Coax / Wireless Smart-Link client",
          "Intercom": "1080p wide-angle camera, dual-mic echo-cancelling array",
          "Ratings": "IK10 Impact Resistant, UL94-V0 Fire Retardant",
          "System Core": "Custom secure Android B2B OS with lockdown"
        },
        image: "https://picsum.photos/seed/display/600/400"
      }
    ]
  }
];

export const INDUSTRIES: Industry[] = [
  {
    id: "commercial-towers",
    name: "Commercial Office Towers",
    description: "High-density corporate skyscrapers demand exceptional elevator throughput, maximum cabin comfort, and reliable wireless feeds. Standard commercial products fail rapidly under 24/7 operating stress and high-speed mechanics.",
    challenges: [
      "Relentless high-speed traveling cable wear leading to frequent CCTV failure.",
      "Discharge water from traditional ACs is strictly forbidden by building inspectors.",
      "High tenant complaints regarding cabin heat during morning and evening peaks."
    ],
    solutionSet: [
      "Dry AC Model V2 for zero-liquid condensation climate control.",
      "Wireless CCTV Smart-Link to eliminate traveling cable fatigue.",
      "IoT Smart Gateway G3 for BACnet-connected predictive maintenance."
    ],
    caseStudyTitle: "Grand Horizon Corporate Center, New York",
    caseStudySummary: "Redesigned cabin infrastructure for a 50-story commercial center. Replaced standard AC units with Dry AC and deployed wireless CCTV transceivers. Resulted in 100% elimination of traveling cable failures and achieved an immediate 94% reduction in occupant HVAC comfort complaints.",
    image: "https://picsum.photos/seed/building1/800/600"
  },
  {
    id: "healthcare",
    name: "Hospitals & Healthcare Facilities",
    description: "Hospital elevators must serve as sterile, ultra-reliable corridors. Patient transfer cabins require constant pathogen-free air purification, strict sanitary protocols, and zero elevator downtime during emergencies.",
    challenges: [
      "Airborne pathogen transmission inside poorly ventilated medical cabins.",
      "Equipment downtime that compromises emergency patient transfers.",
      "Unsecured public access to sensitive ICU and operating theater floors."
    ],
    solutionSet: [
      "Medical-Grade HEPA/UV-C air sanitizers built into our Dry AC climate units.",
      "IoT Predictive Maintenance to ensure 99.99% emergency elevator uptime.",
      "Biometric Access Control to enforce strict floor restriction rules for personnel."
    ],
    caseStudyTitle: "Metro General Hospital Expansion",
    caseStudySummary: "Integrated 12 major bed-sized elevators with active HEPA/UV-C air sanitizing loops and predictive IoT gateways. Provided real-time elevator tracking in the nurse dispatch console and restricted critical floor access to certified RFID cardholders. Achieved zero unplanned downtime over a 24-month study.",
    image: "https://picsum.photos/seed/hospital/800/600"
  },
  {
    id: "luxury-residential",
    name: "Luxury Condominiums & Penthouses",
    description: "Premium residential properties thrive on design, peace of mind, and absolute privacy. Cabin add-ons must operate with whisper-quiet noise levels and offer seamless smartphone integration.",
    challenges: [
      "Intrusive HVAC hum or fan vibration disrupting residential tranquility.",
      "Bottlenecks at lobbies with slow, manual keycard scanners.",
      "Aesthetic disconnect between generic elevator cabins and designer lobby spaces."
    ],
    solutionSet: [
      "Acoustically-damped Dry AC units running under 42 dBA.",
      "High-speed face recognition and hands-free Bluetooth walk-through readers.",
      "Elegant interactive Media Displays customized with custom wood/brass framing."
    ],
    caseStudyTitle: "The Lumina Sky Villas",
    caseStudySummary: "Deployed whisper-quiet Dry AC units and hands-free smartphone bluetooth readers. Residents can call elevators automatically as they enter the parking garage, and the cabin screen displays personal concierge notifications. Elevated property satisfaction scores from 72% to 98%.",
    image: "https://picsum.photos/seed/luxury/800/600"
  }
];

export const TECH_ARTICLES: TechArticle[] = [
  {
    id: "cat6-failures",
    title: "Understanding CAT6 Fatigue and Cable-Free Elevator CCTV Architecture",
    category: "Engineering",
    summary: "Why traditional copper cables fail in high-speed elevator shafts and how millimeter-wave wireless bridges solve B2B infrastructure challenges.",
    content: "In high-speed elevator shafts, copper cables undergo endless mechanical flex cycles. Under constant acceleration, twisting, and cable-hang, traditional CAT6 copper strands suffer copper fatigue, causing packet loss and eventual cable snaps. Discover why millimeter-wave technology provides 1.2 Gbps of low-latency data without physical wires.",
    author: "Prashant Shah, Chief Systems Engineer",
    readTime: "6 min read",
    tags: ["CCTV", "Wireless", "Infrastructure", "Engineering"]
  },
  {
    id: "dry-ac-tech",
    title: "Thermal Re-evaporation: Engineering Climate Control Without Liquid Discharge",
    category: "Safety",
    summary: "A breakdown of the thermodynamic engineering principles that make water-free elevator air conditioning safe for high-voltage shafts.",
    content: "Standard AC systems collect moisture from the air, creating a liquid byproduct that must be drained. In an elevator shaft, routing a physical drain line is impossible. Storing water in a car-top container introduces weight shifting and hazardous spill risks onto high-voltage cables. We discuss our proprietary heat-exchanger atomization technology that re-evaporates 100% of condensate dynamically.",
    author: "Dr. Aris Thorne, Thermodynamicist",
    readTime: "8 min read",
    tags: ["Dry AC", "HVAC", "Safety", "Innovation"]
  },
  {
    id: "predictive-iot",
    title: "Transitioning Vertical Fleet Management from Reactive to Predictive with IoT Telemetry",
    category: "IoT",
    summary: "How edge-computing vibration analysis can diagnose minor elevator guide rail friction before it leads to system shutdown.",
    content: "By mounting high-precision accelerometer sensors on elevator cabs, we can record the exact mechanical signature of a lift. Over time, minor guide rail misalignments or bearing failures emit specific acoustic and vibrational frequencies. Our G3 Gateway computes these FFT algorithms locally at the edge, sending instant dispatch triggers.",
    author: "Elena Rostov, IoT Architect",
    readTime: "5 min read",
    tags: ["IoT", "Telemetry", "Predictive", "Smart Fleet"]
  }
];

export const FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "Why can't I use a standard commercial portable or split AC inside an elevator cabin?",
    answer: "Standard AC units generate severe condensation water. Elevators run on high-voltage tracks, surrounded by steel ropes, guide rails, and sensitive controller circuits. Discharging water onto the car top is a critical electrical safety violation. Elevatech's Dry AC has a specialized thermal re-evaporation core that atomizes and evaporates 100% of condensation into the exhaust stream, ensuring absolute water safety.",
    category: "Climate Control (Dry AC)"
  },
  {
    id: "faq-2",
    question: "Does the wireless CCTV system suffer from interference from steel ropes or concrete walls?",
    answer: "No. Our millimeter-wave wireless transceivers utilize highly-directional, auto-focusing beams that are pre-configured to operate in high-multipath reflection environments. We operate on specific bands (5.8GHz and 60GHz) that bypass metal Faraday interference, achieving an ultra-stable latency under 2ms.",
    category: "Wireless CCTV"
  },
  {
    id: "faq-3",
    question: "Do you need to modify the elevator controller to deploy your IoT smart gateway?",
    answer: "No, our system is strictly non-intrusive. The G3 Gateway collects vibration, acoustics, power draw, and door speeds using independent, external sensors. For controller error codes, it reads from non-intrusive opto-isolated dry contacts or standardized serial outputs, ensuring your elevator's manufacturer safety warranty is never compromised.",
    category: "IoT & Fleet Monitoring"
  },
  {
    id: "faq-4",
    question: "Are your solutions compatible with any elevator brand like OTIS, Schindler, or Kone?",
    answer: "Yes. Elevatech acts as an open-ended, brand-agnostic provider. Our solutions ('Enabling Technologies') are designed to fit on any cabin chassis regardless of manufacturer, utilizing standard power sources and universal mounting plates.",
    category: "General Compatibility"
  }
];
