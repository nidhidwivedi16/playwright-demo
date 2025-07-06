import { chromium } from "playwright";
import { test, expect } from "@playwright/test";

test.describe("My Test Suite", () => {

  // test('Download a file', async ({ page }) => {
  //   // Navigate to the page with the download link
  //   await page.goto("https://playwright.dev/");
  //   // Click the download link
  //   const [download] = await Promise.all([
  //     page.waitForEvent('download'), // Wait for the download to start
  //     page.click('text=Download') // Click the download link
  //   ]);
  //   // Get the download path
  //   const downloadPath = await download.path();
  //   console.log("Downloaded file path:", downloadPath);
  //   // Verify the file was downloaded
  //   expect(downloadPath).toBeDefined();
  //   expect(downloadPath).toContain('.zip'); // Assuming the downloaded file is a zip file
  //   // You can also check the file name or other properties if needed
  //   // For example, you can get the file name
  //   const fileName = download.suggestedFilename();
  //   console.log("Downloaded file name:", fileName);
  //   expect(fileName).toBeDefined();
  //   expect(fileName).toContain('.zip'); // Assuming the downloaded file is a zip file
    
  //   // Optionally, you can check the file content or size
  //   const fileContent = await download.path();
  //   expect(fileContent).toBeTruthy();
  //   // Clean up: delete the downloaded file if necessary
  //   // await fs.unlink(downloadPath); // Uncomment if you want to delete the file after the test

  // });

  // test('Upload a file', async ({ page }) => {
  //   // Navigate to the page with the upload input
  //   await page.goto("https://playwright.dev/");
  //   // Click the upload button to open the file dialog
  //   const [fileChooser] = await Promise.all([
  //     page.waitForEvent('filechooser'), // Wait for the file chooser to open
  //     page.click('text=Upload') // Click the upload button
  //   ]);
  //   // Select the file to upload
  //   const filePath = 'path/to/your/file.txt'; // Replace with the actual file path
  //   await fileChooser.setFiles(filePath);
  //   // Verify the file was uploaded by checking the input's value
  //   // Replace 'input[type="file"]' with the actual selector if different
  //   const uploadedFileName = await page.$eval('input[type="file"]', (input: HTMLInputElement) => input.files?.[0]?.name);
  //   console.log("Uploaded file name:", uploadedFileName);
  //   expect(uploadedFileName).toBeDefined();
  //   expect(uploadedFileName).toContain('file.txt'); // Assuming the uploaded file is file.txt
  //   // Optionally, you can check the file content or size
  //   // const fileContent = await fs.readFile(filePath, 'utf-8');
  //   // expect(fileContent).toBeTruthy();
  //   // Clean up: delete the uploaded file if necessary
  //   // await fs.unlink(filePath); // Uncomment if you want to delete the file after the test
  // });

  // test('Cookies', async ({ page }) => {
  //   await page.goto("https://playwright.dev/");
  //   console.log("Cookies before setting:", await page.context().cookies());
  //   // Set a cookie
  //   await page.context().addCookies([{
  //     name: "myCookie",
  //     value: "myValue",
  //     domain: "playwright.dev", // Ensure the domain matches the page's domain    
  //     url: "https://playwright.dev/"
  //   }]);
  //   console.log("Cookies after setting:", await page.context().cookies());
  //   // Verify the cookie is set
  //   const cookies = await page.context().cookies();
  //   const myCookie = cookies.find(cookie => cookie.name === "myCookie");
  //   expect(myCookie).toBeDefined();
  //   expect(myCookie?.value).toBe("myValue");
  //   await page.context().clearCookies(); // Clear cookies after test
  //   console.log("Cookies after clearing:", await page.context().cookies());
  // });

  test("Session (or Local) Storage", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    const sessionStorage = await page.evaluate(() => {
      return window.sessionStorage;
    });
    console.log("Session Storage before setting:", sessionStorage);
    //clear session storage before setting a new item
    await page.evaluate(() => {
      sessionStorage.clear();
    });
    await page.reload(); // Reload the page to ensure session storage is cleared
    console.log("Session Storage after clearing:", sessionStorage);
    // Set an item in session storage
    await page.evaluate(() => {
      sessionStorage.setItem("myKey", "myValue");
    });
    // Verify the item is set
    const value = await page.evaluate(() => {
      return sessionStorage.getItem("myKey");
    });
    console.log("Session Storage after setting:", value);
    expect(value).toBe("myValue");   
  });
  // test("has title", async ({ }) => {
  //   const browser = await chromium.launch();
  //   const context = await browser.newContext();
  //   const page = await context.newPage();
  //   // Navigate to the Playwright website.
  //   await page.goto("https://playwright.dev/");

  //   // Expect a title "to contain" a substring.
  //   await expect(page).toHaveTitle(/Playwright/);
  //   await browser.close();
  // });

  test("has title", async ({ page }) => {
    page.on("console", (msg) => {
      expect.soft(msg.type()).not.toEqual("error"); // This will not fail the test if the console error is not empty.
      if (msg.type() === "error") {
        console.error(`Console error: ${msg.text()}`);
      } else {
        console.log(`Console message: ${msg.text()}`);
      }
    }); // Listen for console messages and log them.
    page.on("pageerror", (error) => {
      expect.soft(error.name).not.toEqual("Error"); // This will not fail the test if the console error is not empty.
      console.error(`Page error: ${error.message}`);
    }); // Listen for uncaught exceptions(page errors) and log them.
    page.on("request", (request) => {
      console.log(`Request made: ${request.url()}`);
    }); // Listen for requests and log them.
    page.on("response", (response) => {
      console.log(
        `Response received: ${response.url()} - Status: ${response.status()}`
      );
    }); // Listen for responses and log them.

    await page.goto("https://playwright.dev/");

    // Expect a title "to contain" a substring.
    // await expect.soft(page).toHaveTitle(/Playwright2/); // This will not fail the test if the title does not match.
    await expect(page).toHaveTitle(/Playwright/); // This will fail the test if the title does not match.
  });

  test("get started link", async ({ page }) => {
    // await page.goto('https://playwright.dev/');
    // await page.type('input[name="search"]', 'installation');
    // await page.selectOption('#country-select', 'US');
    // await page.waitForSelector('text=Installation'); // Wait for the text "Installation" to appear.

    // Click the get started link.
    await page.getByRole("link", { name: "Get started" }).click();

    page.once("dialog", (dialog) => {
      dialog.accept(); // Accept the dialog if it appears.
    }); // Listen for any dialog that might appear and accept it.

    page.once("dialog", (dialog) => {
      dialog.dismiss(); // Dismiss the dialog if it appears.
    }); // Listen for any dialog that might appear and dismiss it.

    // Expects page to have a heading with the name of Installation.
    await expect(
      page.getByRole("heading", { name: "Installation" })
    ).toBeVisible();
  });

  test.beforeAll(async () => {
    // This will run once before all tests in this file.
    console.log("Running before all tests");
  });

  test.afterAll(async () => {
    // This will run once after all tests in this file.
    console.log("Running after all tests");
  });

  test.beforeEach(async ({ page }) => {
    // This will run before each test in this file.
    console.log("Running before each test");
    await page.goto("https://playwright.dev/");
  });

  test.afterEach(async () => {
    // This will run after each test in this file.
    console.log("Running after each test");
  });
});
