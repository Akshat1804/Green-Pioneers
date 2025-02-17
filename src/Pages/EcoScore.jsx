import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { div } from 'framer-motion/client';
import LeftBar from '../components/LeftBar';
import NavBar from '../components/NavBar';

function EcoScore() {
    const [engineSize, setEngineSize] = useState('');
    const [predictedCo2, setPredictedCo2] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState(null);

    useEffect(() => {
        async function trainModel() {
            setLoading(true);
            try {
                const response = await fetch('FuelConsumptionCo2 (1).csv');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const csvData = await response.text();

                // Improved CSV parsing to handle potential issues
                const lines = csvData.split('\n');
                const headers = lines[0].split(',');
                const data = [];

                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(',');
                    if (values.length === headers.length) {
                        const entry = {};
                        let validRow = true; // Flag for row validity

                        for (let j = 0; j < headers.length; j++) {
                            const header = headers[j];
                            const value = parseFloat(values[j]);
                            if (isNaN(value)) {  // Check for NaN values
                                validRow = false;
                                break; // Skip the row if any value is NaN
                            }
                            entry[header] = value;
                        }
                        if (validRow) {
                            data.push(entry);
                        }
                    }
                }



                const X = data.map(row => row.ENGINESIZE);
                const y = data.map(row => row.CO2EMISSIONS);

                const xs = tf.tensor1d(X);
                const ys = tf.tensor1d(y);

                const model = tf.sequential();
                model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

                model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

                await model.fit(xs.reshape([-1, 1]), ys, { epochs: 100 });

                setModel(model);
                setLoading(false);
                console.log("Model training complete.");
            } catch (err) {
                setError(err.message);
                console.error("Error training model:", err);
                setLoading(false);
            }
        }

        trainModel();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setPredictedCo2(null); // Clear previous prediction

        if (!model) {
            setError("Model is not yet trained. Please wait.");
            setLoading(false);
            return;
        }

        const engineSizeNum = parseFloat(engineSize); // Parse once

        if (isNaN(engineSizeNum) || engineSizeNum < 0) {
            setError("Please enter a valid engine size (a non-negative number).");
            setLoading(false);
            return;
        }

        try {
            const tensorEngineSize = tf.tensor1d([engineSizeNum]);
            const prediction = model.predict(tensorEngineSize.reshape([-1, 1]));
            const predictedCo2 = prediction.arraySync()[0][0]; // Extract the number correctly

            if (typeof predictedCo2 === 'number' && !isNaN(predictedCo2)) {
                setPredictedCo2(predictedCo2);
            } else {
                setError("Invalid prediction. Please check the console.");
                console.error("Invalid prediction value:", predictedCo2);
            }
        } catch (err) {
            setError(err.message);
            console.error("Error making prediction:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
      <NavBar />

        <div className='flex'>

            <LeftBar />
 <div className='p-10 ml-[20%] mt-5 w-full flex justify-center flex-col'>
            <h1 className="text-3xl font-bold mb-4 text-left font-serif">CO2 Emission Predictor</h1>
            <div  className="w-full flex flex-col  justify-center h-[300px]  ">
                <div  id="outset" className=" h-[900px] flex flex-col justify-center items-center ">
                {loading && <p className='text-2xl '>Loading and training model. Please wait...</p>}
            {!loading && (
                <form onSubmit={handleSubmit}>
                    <div className='flex '>
                    <label className='text-2xl px-2 py-5' htmlFor="engineSize">Engine Size (liters):</label>
                    <input
                        className=" bg-transparent border-b-2 w-[80px] h-[48px] border-gray-500 rounded-lg px-3 mt-3 outline-none"
                        type="number"
                        id="engineSize"
                        value={engineSize}
                        onChange={(e) => setEngineSize(e.target.value)}
                        step= '0.1'
                    />
                    </div>

                    <button className='bg-[#00a896] text-white md:text-sm text-sm font-semibold mt-4 py-3 px-8 rounded-full   hover:bg-[#b2d8d8] hover:text-[#006666] transition duration-300' type="submit" disabled={loading}>
                        {loading ? "Predicting..." : "Predict"}
                    </button>
                </form>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {predictedCo2 !== null && (
                <p className='text-2xl font-bold'>Predicted CO2 emissions: {predictedCo2.toFixed(2)} grams/km</p>
            )}
                </div>
            </div>
        </div>
        </div>
       </div>
    );
}

export default EcoScore;
