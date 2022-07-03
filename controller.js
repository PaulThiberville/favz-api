const puppeteer = require("puppeteer");

//This is used to get title, description and favIcon image Url from a url.
exports.getInfos = async (req, res) => {
  //Requested url
  const url = req.body.url;

  //Navigate to url
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1, height: 1 });

  try {
    await page.goto(url);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  //Get title and description
  const title = await page.title();
  const description = await page.$eval(
    "head > meta[name='description']",
    (element) => element.content
  );

  //Get icon url
  let iconUrl = "";

  try {
    iconUrl = await page.$eval(
      "head > link[rel='icon']",
      (element) => element.href
    );
  } catch {
    //do nothing
  }

  if (iconUrl === "") {
    try {
      iconUrl = await page.$eval(
        "head > link[rel='shortcut icon']",
        (element) => element.href
      );
    } catch {
      //do nothing
    }
  }

  //Close browser
  await browser.close();

  //Return Infos
  return res.status(200).json({ title, description, iconUrl });
};
