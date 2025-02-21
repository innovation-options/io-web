let apiUrl = 'https://j6a2q5dm94.execute-api.us-west-2.amazonaws.com/v1/CalculateOption/';

let body = {
    rate: 0.05,
    term: 1.0,
    iterations: 4,
    sigma: 0.75,
    strike: 5000000,
};

function getValueArray(valueTree, iterations) {
  let a = [];
  let i = iterations;
  let j = 0;
  while (j <= i) {
    var d  = {};
    d['iteration'] = parseInt(j);
    let n = [];
    for (var key in valueTree[j]) {
      var m = {};
      m['moves'] = parseInt(key);
      m['value'] = valueTree[j][key];
      n.push(m);
    }
    d['payload'] = n;
    a.push(d);
    j++;
  }
  return a;
}

function createHead(valueArray) {
  let i = 0;
  let output = '';
  while (i <= valueArray.length - 1) {
    output += `<th>${i}</th>`;
    i++;
  }
  return output;
}

function createBody(valueArray) {
  let output = '';
  for (let i = 0; i < valueArray.length; i++) {
    let subArray = valueArray[i]['payload'];
    subArray.sort((a, b) => b.moves - a.moves);
    let inner = '';
    for (let j = 0; j < subArray.length; j++) {
      let datum = subArray[j]['value'].toFixed(0).toString();
      inner += `${datum}<br>`
    };
    output += `<td class='vert-middle'>${inner}</td>`;
  };
  return output;
}

function createTable(valueArray) {
  return `
    <table>
      <thead><tr>${createHead(valueArray)}</tr></thead>
      <tbody><tr>${createBody(valueArray)}<tr></tbody>
    </table>
  `;
}


function calculateOption() {
  let data = {"tranch-5": {"premium": 1507217.472538955, "term": 1, "strike": 5000000, "iterations": 4, "sigma": 0.75, "rate": 0.05, "value_tree": {"4": {"-4": 0.0, "-3": 0.0, "-2": 0.0, "-1": 0.0, "0": 0.0, "1": 3497465.9738337398, "2": 9441385.595292438, "3": 19543036.54220204, "4": 36710723.58238398}, "3": {"-3": 0.0, "-2": 0.0, "-1": 0.0, "0": 686379.2488379297, "1": 3559576.9713643324, "2": 9503496.59282303, "3": 19605147.53973263}, "2": {"-2": 0.0, "-1": 134702.2320617196, "0": 1033509.3605408894, "1": 3810285.214349635, "2": 9564836.035150772}, "1": {"-1": 268558.95122324605, "0": 1292965.5327335335, "1": 4049964.513010027}, "0": {"0": 1507217.472538955}}}, "tranch-4": {"premium": 320679.5333004677, "term": 0.5, "strike": 1507217.472538955, "iterations": 4, "sigma": 0.75, "rate": 0.05, "value_tree": {"4": {"-4": 0.0, "-3": 0.0, "-2": 0.0, "-1": 0.0, "0": 0.0, "1": 685771.009967769, "2": 1683561.941864926, "3": 3135339.1813591835, "4": 5247662.60076144}, "3": {"-3": 0.0, "-2": 0.0, "-1": 0.0, "0": 145184.47911288412, "1": 695161.742563006, "2": 1692952.6744601624, "3": 3144729.9139544195}, "2": {"-2": 0.0, "-1": 30736.984604044676, "0": 218886.14612978, "1": 743617.7498728771, "2": 1702284.8980079114}, "1": {"-1": 61522.82005222188, "0": 274405.22639261186, "1": 790762.5341225541}, "0": {"0": 320679.5333004677}}}, "tranch-3": {"premium": 47961.38308078914, "term": 0.25, "strike": 320679.5333004677, "iterations": 4, "sigma": 0.75, "rate": 0.05, "value_tree": {"4": {"-4": 0.0, "-3": 0.0, "-2": 0.0, "-1": 0.0, "0": 0.0, "1": 97373.0946449844, "2": 224313.1512446538, "3": 389798.0629471832, "4": 605531.8252816272}, "3": {"-3": 0.0, "-2": 0.0, "-1": 0.0, "0": 21697.268488552036, "1": 98373.65399830164, "2": 225313.71059797105, "3": 390798.62230050046}, "2": {"-2": 0.0, "-1": 4834.71806643009, "0": 32702.958992438413, "1": 105105.95827805673, "2": 226311.14808376777}, "1": {"-1": 9689.749354806554, "0": 41012.16891972342, "1": 111723.49467367966}, "0": {"0": 47961.38308078914}}}, "tranch-2": {"premium": 5039.035334616191, "term": 0.125, "strike": 47961.38308078914, "iterations": 4, "sigma": 0.75, "rate": 0.05, "value_tree": {"4": {"-4": 0.0, "-3": 0.0, "-2": 0.0, "-1": 0.0, "0": 0.0, "1": 9891.08799532635, "2": 21822.01753497372, "3": 36213.465649406695, "4": 53572.86569800831}, "3": {"-3": 0.0, "-2": 0.0, "-1": 0.0, "0": 2282.387258458128, "1": 9965.969140261002, "2": 21896.89867990837, "3": 36288.346794341356}, "2": {"-2": 0.0, "-1": 526.6651757656447, "0": 3437.387806405571, "1": 10635.011821820486, "2": 21971.662914414122}, "1": {"-1": 1055.715142706476, "0": 4309.296429507822, "1": 11296.702841447754}, "0": {"0": 5039.035334616191}}}, "tranch-1": {"premium": 372.1687107259657, "term": 0.0625, "strike": 5039.035334616191, "iterations": 4, "sigma": 0.75, "rate": 0.05, "value_tree": {"4": {"-4": 0.0, "-3": 0.0, "-2": 0.0, "-1": 0.0, "0": 0.0, "1": 714.4003306406448, "2": 1530.0835058196953, "3": 2461.4087218558207, "4": 3524.770924753212}, "3": {"-3": 0.0, "-2": 0.0, "-1": 0.0, "0": 168.8690679267227, "1": 718.3355396046569, "2": 1534.0187147837073, "3": 2465.3439308198326}, "2": {"-2": 0.0, "-1": 39.91706173605411, "0": 254.10524115721157, "1": 765.7445033919911, "2": 1537.950850566334}, "1": {"-1": 79.99322498378291, "0": 318.38711058320774, "1": 812.8107571552}, "0": {"0": 372.1687107259657}}}};

  let tranchCount = Object.keys(data).length;
  let compoundOutput = '';

  for (let i = 1; i <= tranchCount; i++) {
    tranchKey = `tranch-${i}`
    let valueArray = getValueArray(data[tranchKey]['value_tree'], data[tranchKey]['iterations']);
    compoundOutput += `<p>premium: ${data[tranchKey]['premium']}</p>${createTable(valueArray)}`
  };

  // Render it!
  document.getElementById('compound-output').innerHTML = `${compoundOutput}`;

  // fetch(apiUrl, {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(body)
  // })
  // .then(response => {
  //     if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     return response.json(); // Parse the JSON response
  // })
  // .then(data => {
  //     // Select the element where you want to render the data
  //     const outputElement = document.getElementById('output');

  //     // Create HTML elements to display the data
  //     let outputHTML = '';
  //     for (const key in data) {
  //         outputHTML += `<p><b>${key}:</b> ${data[key]}</p>`;
  //     }

  //     // Update the DOM with the new content
  //     outputElement.innerHTML = outputHTML;
  // })
  // .catch(error => {
  //     console.error('There was a problem with the fetch operation:', error);
  //     // Optionally, display an error message to the user
  // });
}
