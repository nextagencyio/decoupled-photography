import { test, expect } from '@playwright/test'

test.describe('Photography Starter - Non-demo mode', () => {
  test('homepage renders hero and featured galleries', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Lumen Studio/i)
    // Hero section content from Drupal
    await expect(page.getByText('Capturing').first()).toBeVisible({ timeout: 10_000 })
    // Featured galleries section
    await expect(page.getByText('Featured Work').first()).toBeVisible()
  })

  test('gallery listing page shows galleries', async ({ page }) => {
    await page.goto('/gallery')
    await expect(page).toHaveTitle(/Gallery/i)
    await expect(page.getByText('Vineyard Wedding').first()).toBeVisible({ timeout: 10_000 })
    await expect(page.getByText('Urban Portrait').first()).toBeVisible()
  })

  test('gallery detail page renders', async ({ page }) => {
    await page.goto('/gallery/vineyard-wedding')
    await expect(page.getByRole('heading', { name: /Vineyard Wedding/ })).toBeVisible({ timeout: 10_000 })
    await expect(page.getByText('Back to Galleries')).toBeVisible()
  })

  test('services listing page shows services', async ({ page }) => {
    await page.goto('/services')
    await expect(page).toHaveTitle(/Services/i)
    await expect(page.getByRole('heading', { name: 'Services' }).first()).toBeVisible({ timeout: 10_000 })
    // Check that at least one service card exists
    await expect(page.getByText('Wedding Photography').first()).toBeVisible()
  })

  test('service detail page renders', async ({ page }) => {
    await page.goto('/services/wedding-photography')
    await expect(page.getByRole('heading', { name: /Wedding Photography/ })).toBeVisible({ timeout: 10_000 })
    await expect(page.getByText('Back to Services')).toBeVisible()
  })

  test('testimonials listing page shows testimonials', async ({ page }) => {
    await page.goto('/testimonials')
    await expect(page).toHaveTitle(/Testimonials/i)
    await expect(page.getByText('Sarah & James').first()).toBeVisible({ timeout: 10_000 })
  })

  test('about page renders', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByRole('heading', { name: /About Lumiere Photography/ })).toBeVisible({ timeout: 10_000 })
  })

  test('navigation links work', async ({ page }) => {
    await page.goto('/')
    // Click gallery link in navigation
    await page.locator('nav a[href="/gallery"], header a[href="/gallery"]').first().click()
    await expect(page).toHaveURL(/\/gallery/)
    await expect(page.getByText('Gallery').first()).toBeVisible()
  })
})
