document.addEventListener('DOMContentLoaded', function () {
  const calculateButton = document.getElementById('calculateButton');
  calculateButton.addEventListener('click', calculateLotSize);

  function calculateLotSize() {
      const accountSize = parseFloat(document.getElementById('accountSize').value);
      const riskPercentage = parseFloat(document.getElementById('riskPercentage').value);
      const stopLossPips = parseFloat(document.getElementById('stopLossPips').value);
      const pipValue = parseFloat(document.getElementById('pipValue').value);

      if (!isNaN(accountSize) && !isNaN(riskPercentage) && !isNaN(stopLossPips) && !isNaN(pipValue)) {
          const dollarRisk = (accountSize * riskPercentage) / 100;
          const lotSize = dollarRisk / (stopLossPips * pipValue);

          // Calculate trade size (assuming standard lot size of 100,000 units)
          const tradeSize = lotSize * 100000;

          // Calculate money at risk
          const moneyAtRisk = tradeSize * stopLossPips * pipValue;

          document.getElementById('result').innerHTML = `Lot Size: ${lotSize.toFixed(2)} lots<br>
              Trade Size: ${tradeSize.toFixed(2)} units<br>
              Money at Risk: $${moneyAtRisk.toFixed(2)}`;
      } else {
          document.getElementById('result').innerHTML = 'Please enter valid numbers for all fields.';
      }
  }
});
