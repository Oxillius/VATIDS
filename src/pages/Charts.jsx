import React, { useState, useEffect } from 'react';

/*
const ChartsList = [];
const defaultChartsList = ['KMIA', 'KFLL', 'KTPA', 'KRSW', 'KPBI', 'KEYW'];

async function chartsLookup(airportsString) {
	try {
		const response = await fetch(`https://corsproxy.io/?` + encodeURIComponent(`https://api.aviationapi.com/v1/charts?apt=KMIA,KFLL,KTPA,KRSW,KPBI,KEYW`));
		return await response.json();
	} catch (error) {
		return `AviationAPI error: ${error}`;
	}
}

chartsLookup("Test").then(function(resultingJSON) {
  const chartsKeys = Object.keys(resultingJSON);

  if (chartsKeys.length > 0) {
    for (let i = 0; i < chartsKeys.length; i++) {
      const key = chartsKeys[i];
      const filteredCharts = resultingJSON[key].filter(item => item[key] !== value)

      console.log(filteredCharts);
    }
  }
});
*/
const pdfUrls = [
  'https://charts.aviationapi.com/AIRAC_240222/00744BNICE.PDF',
  'https://charts.aviationapi.com//AIRAC_240222//00744BNICE_C.PDF' // Add your second PDF URL here
];

const handleSubmit = () => {
  fetchRouting(inputValues.input1, inputValues.input2);
};

export const ChartsPage = () => {
  return (
    <div>
      <button onClick={handleSubmit}>Look up route</button>
      <div>
        <iframe src={pdfUrls[0]} title="PDF Viewer" style={{ width: '100%', height: '100%', border: 'none', width: '80%', height: '80vh' }} />
      </div>
    </div>
  );
};