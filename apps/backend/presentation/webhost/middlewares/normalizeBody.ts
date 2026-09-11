import { Request, Response, NextFunction } from 'express';

const normalizeBody = (req: Request, res: Response, next: NextFunction) => {
    try {
        // بررسی می‌کنیم که آیا فرانت body را داخل یک آبجکت با کلید body فرستاده است یا خیر
        if (req.body && typeof req.body.body === 'string') {
            let rawBody = req.body.body;

            // دیکود کردن HTML Entity ها (مثل &quot; به " و &#x2F; به /)
            // نکته: &amp; باید آخرین موردی باشد که جایگزین می‌شود تا به بقیه آسیب نزند
            rawBody = rawBody
                .replace(/&quot;/g, '"')
                .replace(/&#x2F;/g, '/')
                .replace(/&#39;/g, "'")
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');

            // تبدیل استرینگ نرمالایز شده به آبجکت JSON
            const parsedBody = JSON.parse(rawBody);

            // جایگزین کردن req.body با داده‌های درست
            req.body = parsedBody;
        }
        // حالت دوم: اگر کل req.body یک استرینگ بود (برای اطمینان بیشتر)
        else if (typeof req.body === 'string') {
            req.body = JSON.parse(req.body);
        }

        next();
    } catch (error) {
        // اگر در تبدیل خطایی رخ داد، به میدلور بعدی پاس می‌دهیم تا ارور هندلر اصلی بگیردش
        console.error('Normalize Body Error:', error);
        next();
    }
};

export default normalizeBody;