let apiUrl = 'https://j6a2q5dm94.execute-api.us-west-2.amazonaws.com/v1/CalculateCompound/';

let body = {
    rate: 0.05,
    term: 1.0,
    iterations: 4,
    sigma: 0.75,
    strike: 5000000,
    tranches: 4,
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
  fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response
  })
  .then(data => {
    let tranchCount = Object.keys(data['body']).length;
    let compoundOutput = '';

    for (let i = 1; i <= tranchCount; i++) {
      tranchKey = `tranch-${i}`
      let valueArray = getValueArray(data['body'][tranchKey]['value_tree'], data['body'][tranchKey]['iterations']);
      compoundOutput += `<p>premium: ${data['body'][tranchKey]['premium']}</p>${createTable(valueArray)}`
    };

    // Render it!
    document.getElementById('compound-output').innerHTML = `${compoundOutput}`;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      // Optionally, display an error message to the user
  });
}
