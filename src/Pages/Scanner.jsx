import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState(null);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async (err, result) => {
    if (err) {
      setError("Scanning error. Try again!");
      return;
    }
    if (result) {
      setBarcode(result.text);
      fetchProductDetails(result.text);
    }
  };

  const fetchProductDetails = async (barcode) => {
    try {
      const response = await fetch(`http://localhost:5001/product/${barcode}`);
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError("Product not found!");
    }
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={handleScan}
      />
      {barcode && <p>Scanned Code: {barcode}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>Carbon Emissions: {product.carbonFootprint} kg CO₂</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;