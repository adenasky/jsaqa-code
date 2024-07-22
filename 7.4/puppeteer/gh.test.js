let page;

beforeAll(async () => {
  page = await browser.newPage();
});

afterAll(async () => {
  await page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 30000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 30000);

  test("The page contains Sign up button", async () => {
    const btnSelector = ".btn-mktg.btn-large-mktg.btn-muted-mktg";
    await page.waitForSelector(btnSelector, { visible: true });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 30000);
});

describe("Additional Github page tests", () => {
  test("The h2 features/actions", async () => {
    await page.goto("https://github.com/features/actions");
    await page.waitForSelector('h2.h2-mktg.mb-3.mx-auto');
    const headerText = await page.$eval('h2.h2-mktg.mb-3.mx-auto', element => element.textContent.trim());
    expect(headerText).toContain('Automate your workflow from idea to production');
  }, 30000);

  test("The h1 features/copilot", async () => {
    await page.goto("https://github.com/features/copilot");
    await page.waitForSelector('h1.Primer_Brand__Heading-module__Heading___IVpmp');
    const h1Text = await page.$eval('h1.Primer_Brand__Heading-module__Heading___IVpmp', element => element.textContent.trim());
    expect(h1Text).toEqual('The world’s most widely adopted AI developer tool.');
  }, 30000);

  test("The h1 features/security", async () => {
    await page.goto("https://github.com/features/security");
    await page.waitForSelector('h1.Primer_Brand__Heading-module__Heading___IVpmp');
    const h1Text = await page.$eval('h1.Primer_Brand__Heading-module__Heading___IVpmp', element => element.textContent.trim());
    expect(h1Text).toEqual('Security at every step');
  }, 30000);
});