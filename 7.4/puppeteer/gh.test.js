let page;

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  afterEach(() => {
    page.close();
  });

  test("The h1 header content'", async () => {
    jest.setTimeout(30000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  });

  test("The first link attribute", async () => {
    jest.setTimeout(30000);
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign up button", async () => {
    jest.setTimeout(30000);
    const btnSelector = ".btn-mktg.btn-large-mktg.btn-muted-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  });
});

describe("Additional Github page tests", () => {
  let additionalPage;

  beforeEach(async () => {
    additionalPage = await browser.newPage();
  });

  afterEach(() => {
    additionalPage.close();
  });

  test("The h2 features/actions", async () => {
    jest.setTimeout(30000);
    await additionalPage.goto("https://github.com/features/actions");
    await additionalPage.waitForSelector('h2.h2-mktg.mb-3.mx-auto');
    const headerText = await additionalPage.$eval('h2.h2-mktg.mb-3.mx-auto', element => element.textContent.trim());
    expect(headerText).toContain('Automate your workflow from idea to production');
  });

  test("The h1 features/copilot", async () => {
    jest.setTimeout(30000);
    await additionalPage.goto("https://github.com/features/copilot");
    await additionalPage.waitForSelector('h1.Primer_Brand__Heading-module__Heading___IVpmp');
    const h1Text = await additionalPage.$eval('h1.Primer_Brand__Heading-module__Heading___IVpmp', element => element.textContent.trim());
    expect(h1Text).toEqual('The world’s most widely adopted AI developer tool.');
  });

  test("The h1 features/security", async () => {
    jest.setTimeout(30000);
    await additionalPage.goto("https://github.com/features/security");
    await additionalPage.waitForSelector('h1.Primer_Brand__Heading-module__Heading___IVpmp');
    const h1Text = await additionalPage.$eval('h1.Primer_Brand__Heading-module__Heading___IVpmp', element => element.textContent.trim());
    expect(h1Text).toEqual('Security at every step');
  });
});