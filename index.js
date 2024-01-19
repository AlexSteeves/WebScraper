
import puppeteer from "puppeteer-core";
import dotenv from 'dotenv';
dotenv.config();



async function run(){
    
    let browser
    try{


        const user = process.env.USERNAME;
        const pass = process.env.PASSWORD;

        const auth = `${user}:${pass}`;
        

        
        browser = await puppeteer.connect({
            browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222 `
        });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(1*60*1000);


        await page.goto('https://sale.alibaba.com/p/rank/detail.html?spm=a27aq.rank_list.5162911150.13.6d1c4b26BZJ3dy&wx_navbar_transparent=true&path=/p/rank/detail.html&ncms_spm=a27aq.rank_detail&cardType=101002669&cardId=10001210548&topOfferIds=62376064964&templateBusinessCode=');

        const selector = '.hugo4-pc-grid';
        await page.waitForSelector(selector);
        

        

        const items = await page.evaluate(() => {
            const gridItems = Array.from(document.querySelectorAll('.hugo4-pc-grid-item'));
            return gridItems.map(item => {
                const titleElement = item.querySelector('.subject');
                const priceElement = item.querySelector('.price');
                const title = titleElement ? titleElement.innerText : 'No title';
                const price = priceElement ? priceElement.innerText : 'No price';
                return { title, price };
            });
        });

        console.log(items);

        return;

    }catch(e){
        console.log('Error', e)
    }finally{
        await browser?.close();
    }

};




run()