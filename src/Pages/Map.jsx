import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LeftBar from "../components/LeftBar";
import { div } from "@tensorflow/tfjs";
import NavBar from "../components/NavBar";

// Your dataset with state coordinates
const stateData = [
  { "States": "Andhra Pradesh", "per capita CO2 (kg per person)": 974.17, coordinates: [[80.01997338773383 ,13.713036901444838] , [77.2244987900896,15.767551015459427] , [82.03271509803767 ,18.067437901632434] , [84.38091376005882, 18.704100603073826]] },
  { "States": "Arunachal Pradesh", "per capita CO2 (kg per person)": 405.9, coordinates: [[92.18200575258052, 27.793842370905935 ],[94.95178989923834, 28.989137068523803],[95.36987052514894, 28.116975629810263 ],[92.91364684792408, 27.144693040044377]] },
  { "States": "Assam", "per capita CO2 (kg per person)": 340.91, coordinates: [[90.62792363146704, 26.201368958891297],[95.17455043824495, 27.645776933605163],[92.50928644806478, 24.596345249177197 ],[92.87510699573657, 25.966682207649765]] },
  { "States": "Bihar", "per capita CO2 (kg per person)": 179.01, coordinates: [[83.92491338558428, 24.84322182570924],[84.49977424621136, 26.81869226009116],[87.00825800167503, 26.07002884409465],[ 86.48565721928678, 25.222029881863154]] },
  { "States": "Chhattisgarh", "per capita CO2 (kg per person)": 1963.88, coordinates: [[82.48121454057232, 23.461485422055027],[83.47415602711003, 22.30598418731631],[81.8018335234676, 18.882206973948797],[ 80.91341219340752, 20.848098945156693 ]] },
  { "States": "Goa", "per capita CO2 (kg per person)": 2662.51, coordinates: [[74.14727767240582 ,15.059418609693267] , [73.72029288506606 ,15.721474585813203] , [74.0923056158207 ,15.63193097251325] , [74.30311282991501 ,15.327190878365577]] },
  { "States": "Gujarat", "per capita CO2 (kg per person)": 1310.58, coordinates: [[69.17809850777886, 22.143426860880016 ], [71.4276600663883, 24.531848630982985],  [ 73.94240867289717,22.708414566379478], [ 71.4007643593668,21.061297051914583]]  },
  { "States": "Haryana", "per capita CO2 (kg per person)": 1381.86, coordinates: [[77.42560987130871 ,30.320456726240216] , [77.37094480083134 ,28.07790910510037] , [76.05898310937404 ,28.31879512172931] , [74.91101662934892 ,29.610095850672515]  ] },
  { "States": "Himachal Pradesh", "per capita CO2 (kg per person)": 784.16, coordinates: [[76.32985729667723,32.552153074111075],[ 77.71413454841674,32.208865578629606],[ 78.02175171546997,31.462186265077726],[ 76.38478893365102,31.583932179449512]] },
  { "States": "Jammu & Kashmir", "per capita CO2 (kg per person)": 509.03, coordinates: [[ 76.0496104150424,34.61532275306129],[ 77.6755868694666,34.53390868468564],[ 77.65361421467708,33.41330110273976],[75.95073346848957,33.35826062883322]] },
  { "States": "Jharkhand", "per capita CO2 (kg per person)": 1403.43, coordinates: [[86.29521753030495 ,22.757164468330576] , [84.3334771366946 ,22.621420382342873] ,[83.4506939595699 ,24.241318731590297] , [87.42321825663092 ,25.043694919660002] ] },
  { "States": "Karnataka", "per capita CO2 (kg per person)": 888.86, coordinates: [[77.44813675790112 ,18.120582567583842] , [74.42902419244537,15.767551015459427] , [76.44176590274921 ,11.914051627739624] , [76.83313234641942 , 15.282726920557707]] },
  { "States": "Kerala", "per capita CO2 (kg per person)": 780.12, coordinates: [[74.91295447911158 ,12.739086518135457] , [77.00035674101237,8.420354794919897] , [ 77.20909696720244,9.603060846385842] , [76.39610871783056 ,11.428484086411535]] },
  { "States": "Madhya Pradesh", "per capita CO2 (kg per person)": 656.37, coordinates: [[78.68215550414257,26.70522575949701] , [74.23937610840619 ,22.57650256454027] , [81.4084064969808, 22.762845189621284] , [81.50937875597481 ,25.070190207531557]] },
  { "States": "Maharashtra", "per capita CO2 (kg per person)": 936.7, coordinates: [[72.72471647302432, 20.035756741572925 ], [77.29698666667683, 21.60689582497267 ], [76.40946648672887, 17.856432311112112 ],[73.83554987124685, 16.241333868478925 ]] },
  { "States": "Manipur", "per capita CO2 (kg per person)": 379.2, coordinates: [[94.11338102859669, 23.9628041905907], [93.1500861470774, 24.409257628415148], [93.81040925134464, 25.41676482287962], [94.68825055466463, 25.093570951980432]] },
  { "States": "Meghalaya", "per capita CO2 (kg per person)": 691.53, coordinates: [[89.9947115387306, 25.343921792393964],[90.18871718119767, 25.893708325575034],[92.02715160267137, 25.902018918006252 ],[92.3504943401165, 25.176822435857275 ]] },
  { "States": "Mizoram", "per capita CO2 (kg per person)": 754.71, coordinates: [[92.31885588624156, 23.80653319180128],[92.61405915638457, 22.334262424176043],[93.02579003316295, 22.492258810282053],[93.21223420377959, 23.97700127350794 ]] },
  { "States": "Nagaland", "per capita CO2 (kg per person)": 1275.27, coordinates: [ [94.75246896447361, 25.59413830318519], [93.64386529323319, 25.627461119977134], [94.52150986629852, 26.63104385913517], [95.07581170191872, 26.581483442466542]  ] },
  { "States": "Odisha", "per capita CO2 (kg per person)": 700.13, coordinates: [[81.71720475091296 ,18.080688308603758] , [84.80683422338711 ,19.32220553275235] , [87.28790031491937 ,21.73318334055419] , [83.7769577325624 ,22.25405069645574]] },
  { "States": "Punjab", "per capita CO2 (kg per person)": 1618.08, coordinates: [[ 75.9547909647315,30.60358174629407],[75.86690034557343,31.656830743066173],[ 74.77925393349238,31.5819875463659],[ 74.91108986222949,30.773640846963783] ] },
  { "States": "Rajasthan", "per capita CO2 (kg per person)": 793.69, coordinates: [[70.75859668847045, 27.260441505652874 ], [74.84674415573623, 29.132927432532146 ],[76.08394667872457, 25.234302380069668],[72.10338203954474, 25.185634441032224]] },
  { "States": "Sikkim", "per capita CO2 (kg per person)": 711.39, coordinates: [[88.01773994449418, 27.39327108390935 ],[88.73081120728155 , 27.230278754596487 ],[88.75852629906257, 27.909984589713215 ],[88.24117791915036, 27.88549043281479]] },
  { "States": "Tamil Nadu", "per capita CO2 (kg per person)": 985.7, coordinates: [[77.14921695254462 ,8.28722521669259] , [79.53952238793251 ,10.491561954269045] , [80.11111716596004,13.439586738462301] , [77.25314327582248 ,11.6602520555746]] },
  { "States": "Hyderabad", "per capita CO2 (kg per person)": 295.64, coordinates: [[ 78.21395229439794,18.571618239618587],[ 77.96568676483002,18.401533652064973],[ 78.08653636617235,17.712152493348434],[ 79.97618467807075,17.565575207644343]] },
  { "States": "Tripura", "per capita CO2 (kg per person)": 295.64, coordinates: [[94.11338102859669, 23.9628041905907], [93.1500861470774, 24.409257628415148], [93.81040925134464, 25.41676482287962], [94.68825055466463, 25.093570951980432]] },
  { "States": "Uttar Pradesh", "per capita CO2 (kg per person)": 404.26, coordinates: [[77.85080352657599 ,27.730240966902148] , [82.6382394658472, 24.983253635109378 ] , [83.2837364464231 , 27.013713941875267 ] , [78.38871767705591 , 29.243092312365988 ]] },
  { "States": "Uttarakhand", "per capita CO2 (kg per person)": 493.01, coordinates: [[79.88553804279113 ,28.751015797312274] , [77.80826536465042 ,30.414786700546262] , [78.51891128085646 ,31.166133718851714], [80.54151888851976 ,30.320456726240216]] },
  { "States": "West Bengal", "per capita CO2 (kg per person)": 763.13, coordinates: [[87.4751505859784,21.950443708160822] , [88.83271505115644 ,22.21071832178184] ,[88.27096423797931 ,26.432500437909045] , [86.16439868856513 ,23.332950118210718]] }
];

const createGeoJSON = (data) => {
  return data.map((state) => ({
    type: "Feature",
    properties: {
      name: state.States,
      carbonFootprint: state["per capita CO2 (kg per person)"]
    },
    geometry: {
      type: "Polygon",
      coordinates: [state.coordinates]
    }
  }));
};

const indiaGeoJSON = {
  type: "FeatureCollection",
  features: createGeoJSON(stateData)
};

// Color scale based on per capita CO2
const getColor = (carbonFootprint) => {
  return carbonFootprint > 2000 ? "#800026" : // Highest CO2
    carbonFootprint > 1500 ? "#ba3550" :
    carbonFootprint > 1000 ? "#e45c44" :
    carbonFootprint > 500 ? "#ffc546" :
    "#d4ffa0"; // Lowest CO2
};

const geoJsonStyle = (feature) => ({
  fillColor: getColor(feature.properties.carbonFootprint),
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.7
});

// Function to add tooltips to the features
const onEachFeature = (feature, layer) => {
  layer.bindTooltip(
    `<strong>${feature.properties.name}</strong><br>CO2 per capita: ${feature.properties.carbonFootprint} kg`
  );
};

const Map = () => {
  return (
    <div >
      <NavBar />
      <LeftBar />
<div className="flex flex-col ml-[21%] mt-5">
      <MapContainer center={[20.5937, 78.9629]} zoom={4} style={{ height: "450px", width: "100%" }}>
        {/* Base map layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* GeoJSON Layer with tooltip and onEachFeature */}
        <GeoJSON data={indiaGeoJSON} style={geoJsonStyle} onEachFeature={onEachFeature} />
      </MapContainer>

      {/* Legend */}
      <div>
        <h1 className="text-2xl font-bold  p-2 font-garamond">Markings</h1>
        <div className="flex flex-row justify-center gap-10 ">
          <div className="flex flex-row bg-[#006a4e21] p-4 rounded-lg">
            <div className="w-16 h-8 bg-[#800026]"></div>
            <p className="ml-2">Highest CO2</p>
          </div>
          <div className="flex flex-row bg-[#006a4e21] p-4 rounded-lg">
            <div className="w-16 h-8 bg-[#ba3550]"></div>  
            <p className="ml-2">Medium CO2</p>
          </div>
          <div className="flex flex-row bg-[#006a4e21] p-4 rounded-lg">
            <div className="w-16 h-8 bg-[#e45c44]"></div>  
            <p className="ml-2">Low CO2</p>
          </div>
          <div className="flex flex-row bg-[#006a4e21] p-4 rounded-lg">
            <div className="w-16 h-8 bg-[#ffc546]"></div>  
            <p className="ml-2">Lowest CO2</p>
          </div>
          <div className="flex flex-row bg-[#006a4e21] p-4 rounded-lg">
            <div className="w-16 h-8 bg-[#d4ffa0]"></div>  
            <p className="ml-2">Very Low CO2</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Map;