import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; // Import PapaParse for parsing CSV files

export const ICAOCodesPage = () => {
  const [searchType, setSearchType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [aircraftData, setAircraftData] = useState([]);
  const [airlinesData, setAirlinesData] = useState([]);
  const [airportsData, setAirportsData] = useState([]);
	const [currentSearchType, setCurrentSearchType] = useState('');

  // Load CSV data on component mount
  useEffect(() => {
    fetchCsvData();
  }, []);

  // Function to fetch and parse CSV data
  const fetchCsvData = async () => {
    try {
      const response1 = await fetch('src/assets/ICAOCode Files/aircraft.csv');
      const csvText1 = await response1.text();
      const { data: aircraft } = Papa.parse(csvText1, { header: true });
      setAircraftData(aircraft);

      const response2 = await fetch('src/assets/ICAOCode Files/airlines.csv');
      const csvText2 = await response2.text();
      const { data: airlines } = Papa.parse(csvText2, { header: true });
      setAirlinesData(airlines);

      const response3 = await fetch('src/assets/ICAOCode Files/airports.csv');
      const csvText3 = await response3.text();
      const { data: airports } = Papa.parse(csvText3, { header: true });
      setAirportsData(airports);
    } catch (error) {
      console.error('Error fetching CSV data:', error);
    }
  };

  const handleSearchTypeChange = (event) => {
      setSearchType(event.target.value);
  };

  const handleSearchTermChange = (event) => {
      setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
      switch (searchType) {
          case 'airline':
              searchAirlines();
              break;
          case 'airport':
              searchAirports();
              break;
          case 'aircraft':
              searchAircraft();
              break;
          default:
              break;
      }
  };

	const searchAirlines = () => {
		const trimmed = searchTerm.trim();
		setCurrentSearchType('airline');
		if (trimmed.length === 3) {
			const filteredAirlines = airlinesData.filter(a => a.ICAOCode?.toLowerCase().includes(trimmed.toLowerCase()));
			setSearchResults(filteredAirlines);
		} else {
			const filteredAirlines = airlinesData.filter(a => a.Telephony?.toLowerCase().includes(trimmed.toLowerCase()));
			console.log(filteredAirlines);
			setSearchResults(filteredAirlines);
		}
	};

  const searchAirports = () => {
      const trimmed = searchTerm.trim();
			setCurrentSearchType('airport');
      if (trimmed.length === 3 || trimmed.length === 4) {
          const filteredAirports = airportsData.filter(a => a.icao?.toLowerCase() === trimmed.toLowerCase() || a.iata?.toLowerCase() === trimmed.toLowerCase());
          setSearchResults(filteredAirports);
      } else {
          const filteredAirports = airportsData.filter(a => a.airport?.toLowerCase().includes(trimmed.toLowerCase()));
          setSearchResults(filteredAirports);
      }
  };

  const searchAircraft = () => {
      const trimmed = searchTerm.trim();
			setCurrentSearchType('aircraft');
      const filteredAircraft = aircraftData.filter(a => (
          (a.TypeDesignator?.toLowerCase().includes(trimmed.toLowerCase())) ||
          (a.Manufacturer?.toLowerCase().includes(trimmed.toLowerCase())) ||
          (a.Model?.toLowerCase().includes(trimmed.toLowerCase()))
      ));
      setSearchResults(filteredAircraft);
  };

  return (
      <div>
          <select value={searchType} onChange={handleSearchTypeChange}>
              <option value="">Select search type</option>
              <option value="airline">Airline</option>
              <option value="airport">Airport</option>
              <option value="aircraft">Aircraft</option>
          </select>
          <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
          <button onClick={handleSubmit}>Search</button>
          <ul>
						{currentSearchType === 'airline' && (
							searchResults.map((result, index) => (
								<li key={index}>
										<p>ICAO Code: {result.ICAOCode}</p>
										<p>Company: {result.Company}</p>
										<p>Country: {result.Country}</p>
										<p>Telephony: {result.Telephony}</p>
										<br/>
								</li>
							))
            )}
            {currentSearchType === 'airport' && (
							searchResults.map((result, index) => (
								<li key={index}>
										<p>ICAO Code: {result.icao}</p>
										<p>IATA Code: {result.iata}</p>
										<p>Airport Name: {result.airport}</p>
										<p>Location: {result.region_name} ({result.country_code})</p>
										<br/>
								</li>
							))
            )}
						{currentSearchType === 'aircraft' && (
							searchResults.map((result, index) => (
								<li key={index}>
										<p>Type Designator: {result.TypeDesignator}</p>
										<p>Manufacturer: {result.Manufacturer}</p>
										<p>Model: {result.Model}</p>
										<p>Engine: {result.EngineNumberandType}</p>
										<p>FAA Weight Class: {result.FAAWeightClass}</p>
										<p>ICAO CWT: {result.ICAOWTC}</p>
										<p>SRS: {result.SRS}</p>
										<p>LAHSO: {result.LAHSO}</p>
										<br/>
								</li>
							))
            )}
      </ul>
  	</div>
  );
};