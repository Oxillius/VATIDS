import { Link } from "react-router-dom";
import './Routes.css';
import React, { useEffect, useState } from "react";
import cheerio from 'cheerio';
import Papa from 'papaparse'; // Import PapaParse for parsing CSV files
const routeCache = {};

async function routeLookup(departureAirport, arrivalAirport) {
	try {
		const response = await fetch(`https://corsproxy.io/?` + encodeURIComponent(`https://www.flightaware.com/analysis/route.rvt?origin=${departureAirport}&destination=${arrivalAirport}`));
		return await response.text();
	} catch (error) {
		return `Route Analyzer Reference Error: ${error}`;
	}
}

function ParseId(id) {
	return id.length > 4 ? id.slice(-4) : id;
}

export const RoutesPage = () => {
	const [inputValues, setInputValues] = useState({
    input1: '',
    input2: ''
  });
	const [PDARsData, setPDARsData] = useState([]);
	const [PDARsList, setPDARsList] = useState([]);
	const [routesSummaryList, setRoutesSummaryList] = useState([]);
	const [loading, setLoading] = useState(false);

	// Load CSV data on component mount
  useEffect(() => {
    fetchCsvData();
  }, []);

  // Function to fetch and parse CSV data
	const fetchCsvData = async () => {
    try {
      const response = await fetch('src/assets/PDARs.csv');
      const csvText = await response.text();
      const { data: PDARs } = Papa.parse(csvText, { header: true });
      setPDARsData(PDARs);
    } catch (error) {
      console.error('Error fetching CSV data:', error);
    }
  };

	function fetchRouting(departureAirport, arrivalAirport) {
		if (typeof departureAirport !== 'string' || typeof arrivalAirport !== 'string') {return 'Error: Incorrect data type, expected String value'};
		if (departureAirport.length !== 4 || arrivalAirport.length !== 4) {return 'Error: Airports entered must follow the four letter ICAO format. Example (KMIA)'};
		setLoading(true);
		
		departureAirport = departureAirport.toUpperCase();
		arrivalAirport = arrivalAirport.toUpperCase();

		const trimmedDeparture = departureAirport.trim();
		const trimmedArrival = arrivalAirport.trim();

		const filteredPDARs = PDARsData.filter(a => 
			(a.Departure_Regex?.toUpperCase().includes(trimmedDeparture)) && 
			(a.Arrival_Regex?.toUpperCase().includes(trimmedArrival))
		);
		setPDARsList(filteredPDARs);

		const cacheSearchResult = routeCache[`${departureAirport}-${arrivalAirport}`];

		if (cacheSearchResult) {
			setRoutesSummaryList(cacheSearchResult);
			setLoading(false);
		} else {
			routeLookup(departureAirport, arrivalAirport).then(function(resultingHTMLText) {
				const $ = cheerio.load(resultingHTMLText);

				const summaryTable = $('table.prettyTable.fullWidth').eq(0);
				//const flightsTable = $('table.prettyTable.fullWidth').eq(1);
				const summaryRows = summaryTable.find('tr');
				//const flightRows = flightsTable.find('tr');
	
				const newRoutesSummaryList = [];
			
				summaryRows.each((i, row) => {
					if (i <= 1) { return; }
			
					const tdTable = $(row).find("td");
					const newRouteSummary = {
						RouteFrequency: parseInt($(tdTable[0]).text()),
						DepartureIcaoId: ParseId($(tdTable[1]).text()),
						ArrivalIcaoId: ParseId($(tdTable[2]).text()),
						FiledAltitudes: $(tdTable[3]).text(),
						Route: $(tdTable[4]).text(),
						DistanceMi: tdTable.length > 5 ? $(tdTable[5]).text() : null
					}
	
					newRoutesSummaryList.push(newRouteSummary);
				});
	
				setRoutesSummaryList(newRoutesSummaryList);
				routeCache[`${departureAirport}-${arrivalAirport}`] = newRoutesSummaryList;
				setLoading(false);
			 }).catch(error => {
				console.error(error);
			});
		}
	}

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = () => {
    fetchRouting(inputValues.input1, inputValues.input2);
  };

  return (
		<div>
      <input type="text" name="input1" value={inputValues.input1} onChange={handleChange} />
      <input type="text" name="input2" value={inputValues.input2} onChange={handleChange} />
      <button onClick={handleSubmit}>Look up route</button>
			<div>
				{PDARsList.length > 0 && (
					<>
						<h2>PDARs:</h2>
						<br/>
						{PDARsList.map((result, index) => (
							<div key={index}>
								<p>Route:{result.Route}</p>
								<p>Aircraft Type:{result.AircraftType}</p>
								<p>RNAV Required:{result.RNAVRequired}</p>
								<p>Notes:{result.Notes}</p>
								<br/>
							</div>
						))}
					</>
				)}
				{loading ? (
          <p>Loading Routes...</p>
        ) /*: error ? (
          <p>{error}</p>
        )*/ : (
					<>
						<h2>Online Routes:</h2>
						<br/>
						{routesSummaryList.map((routeSummary, index) => (
							<div key={index}>
								<h3>{`${routeSummary.DepartureIcaoId} - ${routeSummary.ArrivalIcaoId}`}</h3>
								<p>Route Frequency: {routeSummary.RouteFrequency}</p>
								<p>Filed Altitudes: {routeSummary.FiledAltitudes}</p>
								<p>Route: {routeSummary.Route}</p>
								<p>Distance (mi): {routeSummary.DistanceMi}</p>
								<br/>
							</div>
          	))}
					</>
        )}
			</div>
    </div>
  )
}