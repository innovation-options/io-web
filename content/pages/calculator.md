---
title: Calculator
---

## Calculator

#### Calculate the Premium and Value Tree of Your Innovation Option

<div>
    <div>
      <input id='strike' type='tel' placeholder='Strike' value='20' name='strike'>
      <label for='strike'>Strike</label>
    </div>
    <div>
      The strike is the amount of investment sought if the project demonstrates success.
    </div>
    <div>
      <select id='term'>
        <option value='One Week'>One Week</option>
        <option value='One Fortnight'>One Fortnight</option>
        <option value='One Month'>One Month</option>
        <option value='One Quarter'>One Quarter</option>
        <option value='Six Months'>Six Months</option>
        <option value='One Year' selected>One Year</option>
        <option value='Two Years'>Two Years</option>
      </select>
      <label for='term'>Term</label>
    </div>
    <div>
      The term is how long you expect to test the project against the market to see how successful it might be.
    </div>
    <div>
      <select id='sigma'>
        <option value='Very Low'>Very Low</option>
        <option value='Low'>Low</option>
        <option value='Moderate' selected>Moderate</option>
        <option value='High'>High</option>
        <option value='Very High'>Very High</option>
      </select>
      <label for='offset'>Sigma</label>
    </div>
    <div>
      The Sigma is the relative riskiness of your project in light of the technology and its impact on the industry.
    </div>
    <div>
        <input id="calculate" type="button" value="Calculate" onclick="calculateOption();" />
    </div>
    <div class='mt-5 text-center'>
      <h2>
        <span id='premium'></span>
      </h2>
      <h4>
        <span id='tree-title'></span>
      </h4>
    </div>
      <span id='valuation-tree'></span>
    </div>
</div>