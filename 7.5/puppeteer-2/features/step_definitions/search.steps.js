const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { getText, clickElement } = require("../../lib/commands.js");

const BASE_URL = 'https://qamid.tmweb.ru/client';
const HALL_URL = `${BASE_URL}/hall.php`;
const PAYMENT_URL = `${BASE_URL}/payment.php`;

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user has accessed the website", async function () {
  return await this.page.goto(`${BASE_URL}/index.php`, { setTimeout: 20000 });
});

When("user selects a day to watch a movie", async function () {
  return await clickElement(this.page, "a:nth-child(3)");
});

When("user selects the movie {string}", async function (movieName) {
  const movieMap = {
    "Mickey Mouse": '199',
    "Stalker": '217',
    "Witcher": '223',
  };
  const movieId = movieMap[movieName];
  if (movieId) {
    return await clickElement(this.page, `.movie-seances__time[href="#"][data-seance-id="${movieId}"]`);
  }
  throw new Error(`Movie with name ${movieName} not found`);
});

When("user selects a seat", async function () {
  await this.page.goto(HALL_URL);
  return await clickElement(this.page, "div:nth-child(5) span:nth-child(7)");
});

When("user selects multiple seats", async function () {
  await this.page.goto(HALL_URL);
  await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)");
  await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(2)");
});

When("user selects an occupied seat", async function () {
  await this.page.goto(HALL_URL);
  return await clickElement(this.page, "div:nth-child(9) span:nth-child(1)");
});

When("user clicks the book button", async function () {
  return await clickElement(this.page, ".acceptin-button");
});

Then("page title contains {string}", async function (string) {
  await this.page.goto(PAYMENT_URL);
  const actual = await getText(this.page, ".ticket__check-title");
  expect(actual).to.contain(string);
});

Then("list of booked seats contains {string}", async function (string) {
  await this.page.goto(PAYMENT_URL);
  const actual = await getText(this.page, ".ticket__details.ticket__chairs");
  expect(actual).to.contain(string);
});

Then("verify the book button is inactive", async function () {
  const button = await this.page.$eval(".acceptin-button", (el) => el.disabled);
  expect(button).to.be.equal(true);
});