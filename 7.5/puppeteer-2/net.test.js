const { clickElement, getText } = require("./lib/commands.js");

const BASE_URL = 'https://qamid.tmweb.ru/client';
const HALL_URL = `${BASE_URL}/hall.php`;
const PAYMENT_URL = `${BASE_URL}/payment.php`;

describe("qamid.tmweb.ru/client/index.php тесты", () => {
  beforeEach(async () => {
    await page.goto(`${BASE_URL}/index.php`);
    await page.setDefaultNavigationTimeout(30000);
  });

  afterEach(async () => {
    // Очищение или закрытие браузера, если требуется
  });

  test("Booking a single seat", async () => {
    await clickElement(page, "a:nth-child(3)");
    await clickElement(page, '.movie-seances__time[href="#"][data-seance-id="199"]');
    await page.goto(HALL_URL);
    await clickElement(page, "div:nth-child(5) span:nth-child(7)");
    await clickElement(page, ".acceptin-button");
    await page.goto(PAYMENT_URL);
    const actual = await getText(page, ".ticket__check-title");
    expect(actual).toContain("билеты");
  });

  test("Booking multiple available seats", async () => {
    await clickElement(page, "a:nth-child(3)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='217']");
    await page.goto(HALL_URL);
    await clickElement(page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)");
    await clickElement(page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(2)");
    await clickElement(page, ".acceptin-button");
    await page.goto(PAYMENT_URL);
    const actual = await getText(page, ".ticket__details.ticket__chairs");
    expect(actual).toContain("1/1, 1/2");
  });

  test("Booking an occupied seat", async () => {
    await clickElement(page, "a:nth-child(3)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='223']");
    await page.goto(HALL_URL);
    await clickElement(page, "div:nth-child(9) span:nth-child(1)");
    const button = await page.$eval(".acceptin-button", (el) => el.disabled);
    expect(button).toBe(true);
  });
});