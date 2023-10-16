document.addEventListener('DOMContentLoaded', function () {
    const calculateButton = document.getElementById('calculateButton');
    calculateButton.addEventListener('click', calculateLotSize);

    // Fixed standard pip value
    const standardPipValue = 0.0001; // Modify this to the actual standard pip value

    function calculateLotSize() {
        const accountSize = parseFloat(document.getElementById('accountSize').value);
        const riskPercentage = parseFloat(document.getElementById('riskPercentage').value);
        const stopLossPips = parseFloat(document.getElementById('stopLossPips').value);

        if (!isNaN(accountSize) && !isNaN(riskPercentage) && !isNaN(stopLossPips)) {
            const dollarRisk = (riskPercentage / 100) * accountSize;
            const pipValue = standardPipValue;
            const lotSize = (dollarRisk / (stopLossPips * pipValue)) / 100000; // Corrected lot size calculation

            const tradeSize = lotSize * 100000;

            const moneyAtRisk = tradeSize * stopLossPips * pipValue;

            document.getElementById('result').innerHTML = `Pip Value: ${pipValue}<br>
                Lot Size: ${lotSize.toFixed(2)} lots<br>
                Trade Size: ${tradeSize.toFixed(2)} units<br>
                Money at Risk: $${moneyAtRisk.toFixed(2)}`;
        } else {
            document.getElementById('result').innerHTML = 'Please enter valid numbers for all fields.';
        }
    }
});
