document.addEventListener('DOMContentLoaded', function () {
    const calculateButton = document.getElementById('calculateButton');
    calculateButton.addEventListener('click', calculateLotSize);

    // Fixed standard pip value
    const standardPipValue = 0.0001; // Modify this to the actual standard pip value

    function calculateLotSize() {
        const accountSize = parseFloat(document.getElementById('accountSize').value);
        const riskPercentage = parseFloat(document.getElementById('riskPercentage').value);
        const stopLossPips = parseFloat(document.getElementById('stopLossPips').value);
        const currencyPair = document.getElementById('currencyPair').value;

        // Define predefined multipliers for different currency pairs
        const multiplierMap = {
            'EUR/USD': 100000,
            'GBP/USD': 100000,
            'USD/JPY': 149.80895,
            'USD/CHF': 0.90035,
            // Add more currency pairs and multipliers as needed
        };

        if (!isNaN(accountSize) && !isNaN(riskPercentage) && !isNaN(stopLossPips)) {
            const dollarRisk = (riskPercentage / 100) * accountSize;
            const pipValue = standardPipValue;

            // Use the multiplier based on the selected currency pair
            const lotSizeMultiplier = multiplierMap[currencyPair];
            if (lotSizeMultiplier) {
                const lotSize = (dollarRisk / (stopLossPips * pipValue)) / lotSizeMultiplier;

                const tradeSize = lotSize * lotSizeMultiplier;
                const formattedTradeSize = tradeSize.toLocaleString();

                const moneyAtRisk = tradeSize * stopLossPips * pipValue;

                document.getElementById('result').innerHTML = `Pip Value: ${pipValue}<br>
                    Lot Size: ${lotSize.toFixed(2)} lots<br>
                    Trade Size: ${formattedTradeSize} units<br>
                    Money at Risk: $${moneyAtRisk.toFixed(2)}`;
            } else {
                document.getElementById('result').innerHTML = 'Please select a valid currency pair.';
            }
        } else {
            document.getElementById('result').innerHTML = 'Please enter valid numbers for all fields.';
        }
    }
});
