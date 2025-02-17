import React, { useState } from 'react'
import {Chart, registerables} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import LeftBar from '../components/LeftBar'
import NavBar from '../components/NavBar'

const Calculator = () => {



  const [formData, setFormData] = useState({
    electricityUsageKWh: "",
    transportationUsageGallonsPerMonth: "",
    flightsShortHaul: "0",
    flightsMediumHaul: "0",
    flightsLongHaul: "0",
    dietaryChoice: "Vegan",
  })

  const [result, setResult] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:5001/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data);
      setChartData({
        labels: [
          "Electricity",
          "Transportation",
          "Air Travel",
          "Dietary Choice",
        ],
        datasets: [
          {
            label: "CO2 Emissions (kgCO2e/year)",
            data: [
              data.yearlyElectricityEmissions.value || 0,
              data.yearlyTransportationEmissions.value || 0,
              data.totalAirTravelEmissions.value || 0,
              data.dietaryChoiceEmissions.value || 0,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  Chart.register(...registerables)

  const [chartData, setChartData] = useState({
    labels: ["Electricity", "Transportation", "Air Travel", "Dietary Choice"],
    datasets: [
      {
        label: "CO2 Emissions (kgCO2e/year)",
        data: [
          result?.yearlyElectricityEmissions.value || 0,
          result?.yearlyTransportationEmissions.value || 0,
          result?.totalAirTravelEmissions.value || 0,
          result?.dietaryChoiceEmissions.value || 0,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  })

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div  className='md:w-full mx-5     md:m-auto mt-10'>
      <NavBar />
      <LeftBar />
          <h1 className='text-3xl font-bold font-serif text-center p-5'>Carbon Footprint Calculator</h1>
          <div id='inset'  className='flex w-[60%] ml-[25%] p-1 md:flex-row flex-col gap-4  md:gap-2'>
      
      <form id='outset' onSubmit={handleSubmit} className="p-5  md:w-1/2 flex flex-col space-y-4 rounded-lg">
        <div>
          <label htmlFor="electricityUsageKWh">Electricity Usage (kWh)</label> <br />
          <input
          className=  "bg-transparent border-b-2 border-gray-500 rounded-lg p-2"

            type="number"
            id="electricityUsageKWh"
            name="electricityUsageKWh"
            value={formData.electricityUsageKWh}
            onChange={(e) => setFormData({ ...formData, electricityUsageKWh: e.target.value })}
          />
        </div>

        <div> 
          <label htmlFor="transportationUsageGallonsPerMonth">Transportation Usage (gallons per month)</label> <br />
          <input
          className=  "bg-transparent border-b-2 border-gray-500 rounded-lg p-2"

            type="number"
            id="transportationUsageGallonsPerMonth"
            name="transportationUsageGallonsPerMonth"
            value={formData.transportationUsageGallonsPerMonth} 
            onChange={(e) => setFormData({ ...formData, transportationUsageGallonsPerMonth: e.target.value })}
          />  
        </div>

        <div>
          <label htmlFor="flightsShortHaul">Flights (short haul)</label><br />
          <input
          className=  "bg-transparent border-b-2 border-gray-500 rounded-lg p-2"

            type="number"
            id="flightsShortHaul"
            name="flightsShortHaul"
            value={formData.flightsShortHaul}
            onChange={(e) => setFormData({ ...formData, flightsShortHaul: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="flightsMediumHaul">Flights (medium haul)</label> <br />
          <input
          className=  "bg-transparent border-b-2 border-gray-500 rounded-lg p-2"

            type="number"
            id="flightsMediumHaul"
            name="flightsMediumHaul"
            value={formData.flightsMediumHaul}
            onChange={(e) => setFormData({ ...formData, flightsMediumHaul: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="flightsLongHaul">Flights (long haul)</label><br />
          <input
          className=  "bg-transparent border-b-2 border-gray-500 rounded-lg p-2"
      
            type="number"
            id="flightsLongHaul"
            name="flightsLongHaul"
            value={formData.flightsLongHaul}
            onChange={(e) => setFormData({ ...formData, flightsLongHaul: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="dietaryChoice">Dietary Choice</label> <br />
          <select
          className=  "bg-transparent border-b-2 border-gray-500 rounded-lg p-2"

            id="dietaryChoice"
            name="dietaryChoice"
            value={formData.dietaryChoice}
            onChange={(e) => setFormData({ ...formData, dietaryChoice: e.target.value })}
          >
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>
        </div>

        <button className="bg-[#00a896] text-white md:text-lg text-sm font-semibold my-5 py-2 px-8 rounded-full  hover:bg-[#b2d8d8] hover:text-[#006666] transition duration-300" type="submit">Calculate</button>
      </form>
    <div id='inset' className="md:w-1/2 p-5 rounded-lg">
          <h1 className='text-xl font-bold font-serif text-center '>Emission Statistics</h1>
          <Bar data={chartData} options={chartOptions} />
          {result && (
              <div className="mt-8 ">
                <div>
                  <p className="text-2xl font-bold">Air Travel: </p>

                  <p className="text-xl">
                    {result.totalAirTravelEmissions.value}{" "}
                    {result.totalAirTravelEmissions.unit}
                  </p>
                  <br />
                  <p className="text-2xl font-bold">Electricity: </p>
                  <p className="text-xl">
                    {result.yearlyElectricityEmissions.value}{" "}
                    {result.yearlyElectricityEmissions.unit}
                  </p>
                  <br />
                  <p className="text-2xl font-bold">Transportation: </p>
                  <p className="text-xl">
                    {result.yearlyTransportationEmissions.value}{" "}
                    {result.yearlyTransportationEmissions.unit}
                  </p>
                  <br />
                  <p className="text-2xl font-bold">Dietary Choice: </p>
                  <p className="text-xl">
                    {result.dietaryChoiceEmissions.value}{" "}
                    {result.dietaryChoiceEmissions.unit}
                  </p>
                  <br />

                  <p className="text-xl font-bold">
                    TOTAL : {result.totalYearlyEmissions.value}{" "}
                    {result.totalYearlyEmissions.unit}
                  </p>
                </div>
              </div>
            )}
    </div>
      </div>
    </div>
  )
}

export default Calculator