const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// In-memory store (replace with MongoDB model if needed)
let pricingConfig = {
  basePrice: 5,
  rules: {
    peak: {
      enabled: true,
      startHour: 8,
      endHour: 22,
      multiplier: 1.7,
    },
    demand: {
      enabled: true,
      threshold: 70, // % of chargers busy
      multiplier: 1.3,
    },
    offpeak: {
      enabled: false,
      discountPercent: 30,
    },
    queue: {
      enabled: false,
      extraPerKwh: 2,
    },
  },
};

// Helper: calculate price for a given hour
function calcPrice(hour, config) {
  const { basePrice, rules } = config;
  let price = basePrice;
  let type = "normal";

  const isPeak =
    rules.peak.enabled &&
    hour >= rules.peak.startHour &&
    hour < rules.peak.endHour;

  const isOffpeak =
    rules.offpeak.enabled && (hour < 6 || hour >= 22);

  if (isPeak) {
    price *= rules.peak.multiplier;
    type = "peak";
    if (rules.demand.enabled) price *= rules.demand.multiplier;
    if (rules.queue.enabled) price += rules.queue.extraPerKwh;
  } else if (isOffpeak) {
    price *= 1 - rules.offpeak.discountPercent / 100;
    type = "offpeak";
  }

  return { price: Math.max(0.5, parseFloat(price.toFixed(2))), type };
}

// GET /api/pricing — get current config + effective price
router.get("/", protect, (req, res) => {
  const hour = new Date().getHours();
  const effective = calcPrice(hour, pricingConfig);

  // 24hr simulation
  const hourly = Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    ...calcPrice(h, pricingConfig),
  }));

  res.json({
    config: pricingConfig,
    effectivePrice: effective.price,
    currentType: effective.type,
    hourlyPreview: hourly,
    stats: {
      total: 3,    // replace with DB count later
      active: 2,
      pending: 1,
    },
  });
});

// PUT /api/pricing — save new config
router.put("/", protect, (req, res) => {
  const { basePrice, rules } = req.body;

  if (!basePrice || !rules) {
    return res.status(400).json({ message: "basePrice and rules required" });
  }

  pricingConfig = { basePrice, rules };

  const hour = new Date().getHours();
  const effective = calcPrice(hour, pricingConfig);

  res.json({
    message: "Pricing rules saved successfully",
    effectivePrice: effective.price,
    currentType: effective.type,
    config: pricingConfig,
  });
});

// GET /api/pricing/calculate?hour=14 — calculate price for specific hour
router.get("/calculate", protect, (req, res) => {
  const hour = parseInt(req.query.hour) || new Date().getHours();
  const result = calcPrice(hour, pricingConfig);
  res.json({ hour, ...result });
});

module.exports = router;