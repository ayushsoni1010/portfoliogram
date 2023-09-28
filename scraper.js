const puppeteer = require("puppeteer");

(async () => {
  /**
   * Set headless to true for @production use
   */
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = "https://ayushsoni1010.com/";

  try {
    await page.goto(url);

    /**
     * Added @function `await page.waitForSelector()` to ensure that the necessary elements are loaded before scraping
     */
    // await page.waitForSelector("chakra-stack");

    /**
     * @screenshot of the portfolio website
     */
    // await page.screenshot({ path: "mywebsite.png" });

    /**
     * @set viewport
     */
    await page.setViewport({
      width: 1400,
      height: 800,
    });

    /**
     * @data Handling
     */
    const [name, title, socials, externalLinks, skills] = await Promise.all([
      page.$eval(".chakra-text.css-vx7vjy", (username) => username.innerText),
      page.$$eval(".chakra-stack.css-x9juev:nth-child(2)", (title) => {
        let designation;
        title.forEach((ele) => {
          designation = ele.innerText.split("\n\n").join(" ");
        });
        return designation;
      }),
      page.$$eval(".chakra-button__group.css-1ind3v2 div a", (socials) =>
        socials.map((ele) => ({
          url: ele.href,
          type: ele.getAttribute("aria-label"),
        }))
      ),
      page.$$eval(".chakra-button__group.css-10aphcx a", (externalLinks) =>
        externalLinks.map((ele) => ({
          url: ele.href,
          type: ele.textContent.trim(),
        }))
      ),
      page.$$eval(".css-1c1a7ns .css-0 span img[aria-label]", (skillsData) =>
        skillsData.map((ele) => ({
          skill: ele.getAttribute("aria-label"),
        }))
      ),
    ]);

    /**
     * @merge the two array and remove @duplicates
     */
    const links = [...socials, ...externalLinks].filter((link, index, self) => {
      const existingLink = self.findIndex((l) => l.type === link.type);
      return existingLink === index;
    });

    const portfolioData = {
      name,
      title,
      links,
      skills,
    };

    /**
     * @log and @format JSON object
     */
    // console.log(JSON.stringify(portfolioData, null, 2));
    console.log(portfolioData);

    // const portfolioData = await page.evaluate(() => {
    //   const links = Array.from(
    //     document.querySelectorAll(".chakra-button__group.css-1ind3v2 div a")
    //   ).map((ele) => ({
    //     link: ele.href,
    //   }));

    //   const externalLinks = Array.from(
    //     document.querySelectorAll(".chakra-button__group.css-10aphcx a")
    //   ).map((ele) => ({
    //     link: ele.href,
    //   }));

    // const skillsData = Array.from(
    //   document.querySelectorAll(".css-1c1a7ns .css-0 span img[aria-label]")
    // );

    //   const skills = skillsData.map((ele) => ({
    //     skill: ele.getAttribute("aria-label"),
    //   }));

    //   return { links, externalLinks, skills };
    // });

    // console.log(portfolioData, 1010);
  } catch (error) {
    /**
     * @error Handling
     */
    console.error("Error occurred:", error);
  } finally {
    /**
     * @close connection
     */
    await browser.close();
  }
})();


const skillKeywords = [
  "JavaScript",
  "HTML",
  "CSS",
  "Python",
  "Java",
  "C++",
  "Ruby",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "SQL",
  "MongoDB",
  "Express.js",
  "Ruby on Rails",
  "PHP",
  "ASP.NET",
  "Swift",
  "Kotlin",
  "Git",
  "Docker",
  "AWS",
  "Azure",
  "Google Cloud",
  "Machine Learning",
  "Data Analysis",
  "UI/UX Design",
  "Graphic Design",
  "Digital Marketing",
  "Content Marketing",
  "SEO",
  "Social Media Marketing",
  "Project Management",
  "Agile",
  "Scrum",
  "Leadership",
  "Communication",
  "Problem Solving",
  "Creativity",
  "Time Management",
  // Add more skills as needed
];

console.log(skillKeywords);
