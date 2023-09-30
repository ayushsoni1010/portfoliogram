import puppeteer from "puppeteer";

async function getScrapedData(website) {
  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: false });

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
    const names = await extractNames(pageContent);
    const emails = await extractEmails(pageContent);
    const mobileNumbers = await extractMobileNumbers(pageContent);
    const location = await extractLocation(pageContent);
    const linkedin = await extractLink(page, 'a[href*="linkedin.com"]');
    const github = await extractLink(page, 'a[href*="github.com"]');
    const twitter = await extractLink(page, 'a[href*="twitter.com"]');
    const instagram = await extractLink(page, 'a[href*="instagram.com"]');
    const resume = await extractLink(page, 'a[href*="resume"]');
    const innerText = await extractInnerText(page);
    const other = await extractOtherLinks(page);
    const label = await extractLabels(page);

    // Construct the portfolio data object
    const portfolioData = {
      website: pageUrl,
      title: pageTitle,
      name: names,
      email: emails,
      mobile: mobileNumbers,
      location: location,
      links: {
        linkedin: linkedin,
        github: github,
        twitter: twitter,
        instagram: instagram,
        resume: resume,
        other: other,
      },
      label: label,
      text: innerText,
    };

    return portfolioData;
  } catch (error) {
    console.error("Error:", error);
    return null; // Return null on error
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
  const locationRegex = /Location: (.+)/i;
  const match = locationRegex.exec(pageContent);
  const location = match ? match[1] : "";

  return location;
}

async function extractLink(page, selector) {
  const link = await page
    .$eval(selector, (item) => item?.href)
    .catch((error) => {
      console.error(`----> Error found: ${error}`);
      return "";
    });

  return link;
}

async function extractOtherLinks(page) {
  const selector = 'a[href^="http"]';
  const otherLinks = await page
    .$$eval(selector, (item) => item.map((link) => link.href))
    .catch((error) => {
      console.error(`----> Error found: ${error}`);
      return "";
    });

  return otherLinks;
}

async function extractLabels(page) {
  const selector = "img[alt]";

  try {
    const labelAttributes = await page.$$eval(selector, (items) =>
      items.map((item) => item.getAttribute("alt"))
    );

    return labelAttributes;
  } catch (error) {
    console.error(`----> Error found: ${error}`);
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
