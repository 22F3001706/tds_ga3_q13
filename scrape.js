const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const seeds = [48,49,50,51,52,53,54,55,56,57];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log(`Visiting seed ${seed}: ${url}`);
    
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Find all tables and sum numbers in their cells
    const tables = await page.$$('table');
    let seedTotal = 0;
    
    for (const table of tables) {
      const cells = await table.$$('td, th');
      for (const cell of cells) {
        const text = await cell.textContent();
        const num = parseFloat(text);
        if (!isNaN(num)) {
          seedTotal += num;
        }
      }
    }
    
    grandTotal += seedTotal;
    console.log(`Seed ${seed} sum: ${seedTotal.toFixed(2)}`);
  }
  
  console.log(`GRAND TOTAL SUM OF ALL TABLES: ${grandTotal.toFixed(2)}`);
  await browser.close();
})();
