import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log("Navigating to http://127.0.0.1:5173/");
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });

    console.log("Taking screenshot of Main Page (English)");
    await page.screenshot({ path: 'screenshot_en.png' });

    // Try to open Language Dropdown
    console.log("Opening language dropdown");
    // Find the globe button by its icon or just clicking the button that says "en"
    const buttons = await page.$$('button');
    let langBtn = null;
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('en') || text.includes('ru') || text.includes('uz')) {
        langBtn = btn;
        break;
      }
    }
    
    if (langBtn) {
      await langBtn.click();
      await new Promise(r => setTimeout(r, 500)); // wait for dropdown
      
      // Click Russian
      const ruBtn = await page.evaluateHandle(() => {
        return Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Русский'));
      });
      if (ruBtn) {
        await ruBtn.click();
        await new Promise(r => setTimeout(r, 500));
        console.log("Taking screenshot of Main Page (Russian)");
        await page.screenshot({ path: 'screenshot_ru.png' });
      }

      // Open dropdown again
      await langBtn.click();
      await new Promise(r => setTimeout(r, 500));

      // Click Uzbek
      const uzBtn = await page.evaluateHandle(() => {
        return Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes("O'zbek"));
      });
      if (uzBtn) {
        await uzBtn.click();
        await new Promise(r => setTimeout(r, 500));
        console.log("Taking screenshot of Main Page (Uzbek)");
        await page.screenshot({ path: 'screenshot_uz.png' });
      }
      
      // Switch back to English
      await langBtn.click();
      await new Promise(r => setTimeout(r, 500));
      const enBtn = await page.evaluateHandle(() => {
        return Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('English'));
      });
      if (enBtn) {
        await enBtn.click();
        await new Promise(r => setTimeout(r, 500));
      }
    }

    // Quick Stretch Modal
    console.log("Opening Quick Stretch");
    const quickStretchBtn = await page.evaluateHandle(() => {
      return Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Quick Stretch'));
    });
    if (quickStretchBtn) {
      await quickStretchBtn.click();
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: 'screenshot_break_modal.png' });
      
      // Close Modal (X button)
      const closeBtns = await page.$$('button');
      for (const btn of closeBtns) {
        // Assume modal close button is inside a relative/fixed container or has an SVG icon
        const className = await page.evaluate(el => el.className, btn);
        if (className.includes('p-1.5 rounded-lg text-zinc-400')) {
          await btn.click();
          break;
        }
      }
      await new Promise(r => setTimeout(r, 500));
    }

    // Exercise Library
    console.log("Opening Exercise Library");
    const libraryBtn = await page.evaluateHandle(() => {
      return Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Exercise Library') || el.textContent.includes('Library'));
    });
    if (libraryBtn) {
      await libraryBtn.click();
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: 'screenshot_catalog.png' });
    }

    console.log("Done testing");
    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
