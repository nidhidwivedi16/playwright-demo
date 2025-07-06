const { chromium } = require('playwright') // Import the Playwright library for browser automation

(async() => { // Define an asynchronous function to run the Playwright script
    const browser = await chromium.launch(); // Use `chromium.launch({ headless: false })` to see the browser UI
    const page = await browser.newPage(); // Create a new page/tab in the browser
    await page.goto('https://bitheap.tech'); // Navigate to the specified URL
    await page.screenshot({path: 'screenshot.png'}); // Take a screenshot and save it as 'screenshot.png'
    await browser.close(); // Close the browser
})(); // This script launches a Chromium browser, navigates to the BitHeap website, takes a screenshot, and then closes the browser.
// To run this script, ensure you have Playwright installed and run it using Node.js
// You can install Playwright using `npm install playwright` if you haven't done so already.
// Note: The screenshot will be saved in the same directory where this script is located.
// Make sure to run this script in an environment where Playwright can launch a browser instance.
// If you want to see the browser actions, you can launch the browser in non-headless mode by using `chromium.launch({ headless: false })`.
// This script is a simple example of how to use Playwright for web automation tasks.