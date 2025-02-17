import express from 'express';
import cors from 'cors';

const app = express();
const port = 5001;

const corsOptions = {
  origin: "http://localhost:5174",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/calculate', (req, res) => {
  try {
    const { 
      electricityUsageKWh, 
      transportationUsageGallonsPerMonth,
      flightsShortHaul,
      flightsMediumHaul,
      flightsLongHaul,
      dietaryChoice, 
    } = req.body;

    const electricityFactor = 0.3978; 
    const transportationFactor = 9.087; 
    const kgCO2ePerYearFactor = 12; 
    const airTravelFactorShortHaul = 100; 
    const airTravelFactorMediumHaul = 200; 
    const airTravelFactorLongHaul = 300; 
    const dietaryFactors = { 
      Vegan: 200, 
      Vegetarian: 400, 
      Pescatarian: 600, 
      MeatEater: 800, 
    };

    const electricityEmissions = electricityUsageKWh * electricityFactor;
    const transportationEmissions = transportationUsageGallonsPerMonth * transportationFactor;
    const airTravelEmissionsShortHaul = flightsShortHaul * airTravelFactorShortHaul;
    const airTravelEmissionsMediumHaul = flightsMediumHaul * airTravelFactorMediumHaul;
    const airTravelEmissionsLongHaul = flightsLongHaul * airTravelFactorLongHaul;
    const dietaryChoiceEmissions = dietaryFactors[dietaryChoice] || 0; 

    const totalAirTravelEmissions =
      airTravelEmissionsShortHaul + airTravelEmissionsMediumHaul + airTravelEmissionsLongHaul;

    const yearlyElectricityEmissions = electricityEmissions * kgCO2ePerYearFactor;
    const yearlyTransportationEmissions = transportationEmissions * kgCO2ePerYearFactor;

    const totalYearlyEmissions = 
      yearlyElectricityEmissions + 
      yearlyTransportationEmissions +
      totalAirTravelEmissions +
      dietaryChoiceEmissions;

    const result = {
      electricityEmissions: { value: electricityEmissions, unit: 'kgCO2e' },
      transportationEmissions: { value: transportationEmissions, unit: 'kgCO2e' },
      airTravelEmissionsShortHaul: { value: airTravelEmissionsShortHaul, unit: 'kgCO2e/year' },
      airTravelEmissionsMediumHaul: { value: airTravelEmissionsMediumHaul, unit: 'kgCO2e/year' },
      airTravelEmissionsLongHaul: { value: airTravelEmissionsLongHaul, unit: 'kgCO2e/year' },
      totalAirTravelEmissions: { value: totalAirTravelEmissions, unit: 'kgCO2e/year' },
      yearlyElectricityEmissions: { value: yearlyElectricityEmissions, unit: 'kgCO2e/year' },
      yearlyTransportationEmissions: { value: yearlyTransportationEmissions, unit: 'kgCO2e/year' },
      dietaryChoiceEmissions: { value: dietaryChoiceEmissions, unit: 'kgCO2e/year' },
      totalYearlyEmissions: { value: totalYearlyEmissions, unit: 'kgCO2e/year' },
    };

    res.json(result);
  } catch (err) {
    console.error('Error calculating CO2 emissions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// New endpoint: Pie Chart Data
app.post('/piechart-data', (req, res) => {
  try {
    const { 
      electricityUsageKWh, 
      transportationUsageGallonsPerMonth,
      flightsShortHaul,
      flightsMediumHaul,
      flightsLongHaul,
      dietaryChoice, 
    } = req.body;

    const electricityFactor = 0.3978; 
    const transportationFactor = 9.087; 
    const kgCO2ePerYearFactor = 12; 
    const airTravelFactorShortHaul = 100; 
    const airTravelFactorMediumHaul = 200; 
    const airTravelFactorLongHaul = 300; 
    const dietaryFactors = { 
      Vegan: 200, 
      Vegetarian: 400, 
      Pescatarian: 600, 
      MeatEater: 800, 
    };

    const electricityEmissions = electricityUsageKWh * electricityFactor * kgCO2ePerYearFactor;
    const transportationEmissions = transportationUsageGallonsPerMonth * transportationFactor * kgCO2ePerYearFactor;
    const airTravelEmissionsShortHaul = flightsShortHaul * airTravelFactorShortHaul;
    const airTravelEmissionsMediumHaul = flightsMediumHaul * airTravelFactorMediumHaul;
    const airTravelEmissionsLongHaul = flightsLongHaul * airTravelFactorLongHaul;
    const dietaryChoiceEmissions = dietaryFactors[dietaryChoice] || 0; 

    const totalAirTravelEmissions =
      airTravelEmissionsShortHaul + airTravelEmissionsMediumHaul + airTravelEmissionsLongHaul;

    const totalYearlyEmissions = 
      electricityEmissions + 
      transportationEmissions +
      totalAirTravelEmissions +
      dietaryChoiceEmissions;

    // Pie Chart Data (Percentage Calculation)
    const pieChartData = [
      { category: "Electricity", value: (electricityEmissions / totalYearlyEmissions) * 100 },
      { category: "Transportation", value: (transportationEmissions / totalYearlyEmissions) * 100 },
      { category: "Air Travel", value: (totalAirTravelEmissions / totalYearlyEmissions) * 100 },
      { category: "Dietary Choice", value: (dietaryChoiceEmissions / totalYearlyEmissions) * 100 }
    ];

    res.json({ pieChartData, totalYearlyEmissions });
  } catch (err) {
    console.error('Error generating pie chart data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const products = {
  "123456789": { name: "Organic Apple", carbonFootprint: 0.5 },
  "987654321": { name: "Plastic Bottle", carbonFootprint: 3.2 },
  "112233445": { name: "Cotton T-Shirt", carbonFootprint: 5.0 },
};

// API to get product details by barcode
app.get("/product/:barcode", (req, res) => {
  const { barcode } = req.params;
  const product = products[barcode];

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
