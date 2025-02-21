---
title: Calculator
---

## Calculator

#### Calculate the Premium and Value Tree of Your Innovation Option

<div>
  <div>
    <p>
      <input value='20000000' id='strike' type='text' class='md-input' placeholder='Strike' autocapitalize='off' autocorrect='off' autocomplete='off' spellcheck='false'/>
    </p>
    <p>
      <input value=1 id='term' type='text' class='md-input' placeholder='Term' autocapitalize='off' autocorrect='off' autocomplete='off' spellcheck='false'/>
    </p>
    <p>
      <input value=4 id='tranches' type='text' class='md-input' placeholder='Tranches' autocapitalize='off' autocorrect='off' autocomplete='off' spellcheck='false'/>
    </p>
    <p>
      <input value=.75 id='sigma' type='text' class='md-input' placeholder='Sigma' autocapitalize='off' autocorrect='off' autocomplete='off' spellcheck='false'/>
    </p>
    <p>
      <button class='md-button'onclick="calculateOption();">
        Calculate
      </button>
    </p>
  </div>
  <div>
    <p>
      <span id='compound-output'></span>
    </p>
  </div>
</div>
