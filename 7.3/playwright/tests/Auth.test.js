const { test, expect } = require('@playwright/test');
const { email, password } = require('../user');

test('Успешная авторизация', async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.fill('[placeholder="Email"]', email);
    await page.fill('[placeholder="Пароль"]', password);
    await page.click('[data-testid="login-submit-btn"]');
    await page.waitForURL('https://netology.ru/profile/8435211');
    const heading = await page.getByRole('heading', { name: 'Моё обучение' });
    await expect(heading).toBeVisible();
});

test('Неуспешная авторизация', async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.fill('[placeholder="Email"]', 'invalid@test.ru');
    await page.fill('[placeholder="Пароль"]', 'wrongpassword');
    await page.click('[data-testid="login-submit-btn"]');
    const errorHint = await page.getByTestId('login-error-hint');
    await expect(errorHint).toHaveText('Вы ввели неправильно логин или пароль');
});