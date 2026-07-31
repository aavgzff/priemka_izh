# Обновление на VPS + новый домен

Подставь вместо `DOMAIN` свой домен (без `https://`), вместо `PROJECT` — путь к репозиторию на сервере.

## 1. DNS

В панели домена:

- A `@` → IP VPS
- A `www` → IP VPS

Проверка: `ping DOMAIN` должен показывать IP сервера.

## 2. Код

```bash
cd PROJECT
git pull origin main
```

## 3. Backend

```bash
cd PROJECT/server
npm install

# nano .env — добавь/обнови:
# CLIENT_ORIGIN=https://DOMAIN
# ADMIN_PASSWORD=надёжный-пароль
# BOT_TOKEN=...
# CHAT_ID=...

pm2 list
pm2 restart metrum-api
# если процесса нет:
# pm2 start server.js --name metrum-api
# pm2 save
```

## 4. Frontend

```bash
cd PROJECT/client

# .env.production:
# VITE_SITE_URL=https://DOMAIN
# VITE_API_URL=https://DOMAIN

npm install
npm run build
```

## 5. Nginx + SSL

Сверься с `deploy/nginx.example.conf`:

- `server_name DOMAIN www.DOMAIN;`
- `root` → `PROJECT/client/dist`
- есть proxy для `/api/`, `/send-form`, `/uploads/`
- SPA: `try_files $uri $uri/ /index.html;`

```bash
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d DOMAIN -d www.DOMAIN
```

Старый домен: редирект на новый или убери из `server_name`.

## 6. Проверка

- https://DOMAIN /
- /finishing, /projects
- форма → Telegram
- /admin
- /robots.txt, /sitemap.xml
- DevTools: нет CORS-ошибок на `/send-form` и `/api/projects`
