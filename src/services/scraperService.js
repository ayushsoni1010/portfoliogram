import puppeteer from "puppeteer";

async function getScrapedData(website) {
  const browser = await puppeteer.launch({ headless: false });

  try {
    // Launch a new browser instance

    // Create a new page
    const page = await browser.newPage();
    const url = website;

    // Navigate to the provided URL
    await page.goto(url);

    // Set viewport
    await page.setViewport({
      width: 1400,
      height: 800,
    });

    // Extract various data
    const pageTitle = await getTitle(page);
    const pageContent = await getPageContent(page);
    const pageUrl = await getPageUrl(page);
    const coreText = await extractInnerText(page);
    const names = await extractNames(pageContent);
    const emails = await extractEmails(pageContent);
    const mobileNumbers = await extractMobileNumbers(pageContent);
    const location = await extractLocation(coreText);
    const links = await extractLinks(page);
    const label = await extractLabels(page);

    // Construct the portfolio data object
    const portfolioData = {
      website: pageUrl,
      title: pageTitle,
      name: names,
      email: emails,
      mobile: mobileNumbers,
      location: location,
      links: links,
      text: label + " " + coreText,
    };

    return portfolioData;
  } catch (error) {
    console.error("Error: ", error);

    return null;
  } finally {
    // Close the browser
    if (browser) {
      await browser.close();
    }
  }
}

async function getTitle(page) {
  return await page.title();
}

async function getPageContent(page) {
  return await page.content();
}

async function getPageUrl(page) {
  return await page.url();
}

async function extractNames(pageContent) {
  const nameRegex = /[A-Z][a-z]+ [A-Z][a-z]+/g;
  const names = pageContent.match(nameRegex) || [];

  return names;
}

async function extractEmails(pageContent) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  const emails = pageContent.match(emailRegex) || [];

  return emails;
}

async function extractMobileNumbers(pageContent) {
  const numberRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;

  const mobileNumbers = pageContent.match(numberRegex) || [];
  return mobileNumbers;
}

async function extractLocation(pageContent) {
  const locationRegex = /(\b(?:location|city|address|where|office)\b:[^\n]*)/i;
  const match = locationRegex.exec(pageContent);
  const location = match ? match[1] : "";

  return location;
}

async function extractLinks(page) {
  const selector = "a[href]";

  try {
    const labelAttributes = await page.$$eval(selector, (items) =>
      items.map((item) => item.href)
    );

    return labelAttributes;
  } catch (error) {
    console.error("Error: ", error);
    return "";
  }
}

async function extractLabels(page) {
  const selector = "img[alt]";

  try {
    const labelAttributes = await page.$$eval(selector, (items) =>
      items.map((item) => item.getAttribute("alt"))
    );

    return labelAttributes;
  } catch (error) {
    console.error("Error: ", error);
    return "";
  }
}

async function extractInnerText(page) {
  const selector = "*";

  try {
    const innerText = await page.$eval(
      selector,
      (element) => element.innerText
    );

    return innerText;
  } catch (error) {
    console.error("Error: ", error);
    return "";
  }
}

export { getScrapedData };
