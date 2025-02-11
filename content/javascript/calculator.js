// I'm a self-taught programmer; be gentle...

const { log, sqrt, exp, pow, max, floor } = Math;

function calculateOption() {
  // Get the variables user input
  let strike = document.getElementById("strike").value;
  let termChoice = document.getElementById("term").value;
  let sigmaChoice = document.getElementById("sigma").value;

  // A constant; should be adjusted as necessary.
  let riskFree = 0.05;

  // Turn the term input into a float measured in years
  const termMap = {
    'One Week': 0.019,
    'One Fortnight': 0.038,
    'One Month': 0.083,
    'One Quarter': 0.25,
    'Six Months': 0.50,
    'One Year': 1.0,
    'Two Year': 2.0,
  };

  // Could have used tuples in the above, but for clarity
  // turn the term input into an integer for number of iterations.
  const iterationsMap = {
    'One Week': 5, // Daily
    'One Fortnight': 4, // Semi-Weekly
    'One Month': 4, // Weekly
    'One Quarter': 6, // Semi-Monthly
    'Six Months': 6, // Monthly
    'One Year': 4, // Quarterly
    'Two Year': 4, // Semi-Annually
  };

  // For the purposes of this tool the following sigma value buckets
  // are necessarily lossy.  More properly, sigma needs to be calculated
  // by industry, but this is close enough for demonstration and frankly
  // it took a lot of effort to calculate the actual sigmas so I'm
  // going to keep them proprietary for the time being.
  const sigmaMap = {
    'Very Low': 0.25,
    'Low': 0.5,
    'Moderate': .75,
    'High': 1.0,
    'Very High': 1.5,
  };

  // Set the variables
  let term = termMap[termChoice];
  let iterations = iterationsMap[termChoice];
  let sigma = sigmaMap[sigmaChoice];

  // Calculate DeltaT in terms of years.
  function getDeltaT(term, iterations) {
    return term / iterations;
  }
  let deltaT = getDeltaT(term, iterations);

  // Calculate the up, down and flat factors per
  // the trinomial formula
  function getUpFactor(sigma, deltaT) {
    return exp(sigma * sqrt(2*deltaT));
  }
  let upFactor = getUpFactor(sigma, deltaT);

  function getDownFactor(upFactor) {
    return 1 / upFactor;
  }
  let downFactor = getDownFactor(upFactor);

  function getFlatFactor() {
    return 1;
  }
  let flatFactor = getFlatFactor();

  // Calculate the corresponding probabilities
  function getUpProb(deltaT, sigma, riskFree) {
    return pow(
      (
        exp(riskFree * (deltaT / 2)) -
        exp(-sigma * sqrt(deltaT / 2))
      ) /
      (
        exp(sigma * sqrt(deltaT / 2)) -
        exp(-sigma * sqrt(deltaT / 2))
      ),
      2
    );
  }
  let upProb = getUpProb(deltaT, sigma, riskFree);

  function getDownProb(sigma, deltaT, riskFree) {
    return pow(
      (
        exp(sigma * sqrt(deltaT / 2)) -
        exp(riskFree * (deltaT / 2))
      ) /
      (
        exp(sigma * sqrt(deltaT / 2)) -
        exp(-sigma * sqrt(deltaT / 2))
      ),
      2
    );
  }
  let downProb = getDownProb(sigma, deltaT, riskFree);

  function getFlatProb(upProb, downProb) {
    return 1 - (upProb + downProb)
  }
  let flatProb = getFlatProb(upProb, downProb);

  // Step one: generate the recombining matrix of spot values
  function getSpotTree(iterations, strike, upFactor) {
    let v = {};
    let i = -iterations;
    while (i <= iterations) {
      v[i] = strike * pow(upFactor, i);
      i ++;
    }
    return v;
  }
  let spotTree = getSpotTree(iterations, strike, upFactor);

  // Step two: find the terminal value at expiration
  function getTermValue(spotTree, iterations, strike) {
    let p = {};
    let v = spotTree;
    let i = -iterations;
    while (i <= iterations) {
      p[i] = max(v[i] - strike, 0);
      i ++;
    }
    return p;
  }
  let termValue = getTermValue(spotTree, iterations, strike);

  // Step three: find the discounted value at each node of the matrix..
  function getValueTree(termValue, iterations, riskFree, deltaT, upProb, downProb, flatProb) {
    let v = {};
    let p = termValue;
    let j = iterations -1;
    v[iterations] = p;
    while (j >= 0) {
      let i = -j;
      let k = {};
      while (i <= j) {
        k[i] = exp(-riskFree * deltaT) *
        (upProb * v[j + 1][i + 1] + flatProb * v[j + 1][i] + downProb * v[j + 1][i - 1]);
        i ++;
      }
      v[j] = k;
      j --;
    }
    return v;
  }
  let valueTree = getValueTree(termValue, iterations, riskFree, deltaT, upProb, downProb, flatProb);

  // Return the value at time zero (ie, the premium.)
  function getPremium(valueTree) {
    return valueTree[0][0];
  }
  let premium = getPremium(valueTree);

  // Set the precision based on the premium
  let precision = 1;
  if (premium < 1) {
    precision = 2;
  }

  // Prepare the entire valuation tree for rendering.
  function getValueArray(valueTree) {
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
  let valueArray = getValueArray(valueTree);

  function createHead(valueArray) {
    let i = 0;
    let output = '';
    while (i <= valueArray.length - 1) {
      output += `<th class=''>${i}</th>`;
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
        let datum = subArray[j]['value'].toFixed(precision).toString();
        inner += `${datum}<br>`
      };
      output += `<td class='align-middle'>${inner}</td>`;
    };
    return output;
  }

  function createTable(valueArray) {
    return `
      <table class='table'>
        <thead><tr>${createHead(valueArray)}</tr></thead>
        <tbody><tr>${createBody(valueArray)}<tr></tbody>
      </table>
    `;
  }

  // Render it!
  document.getElementById('premium').innerHTML = `The Premium for this Option is: ${premium.toFixed(precision)}`;
  document.getElementById("valuation-tree").innerHTML = createTable(valueArray);
  document.getElementById("tree-title").innerHTML = "Pre-Money Valuation Tree";

}
