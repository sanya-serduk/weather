# Приложение погоды
- Текущая погода + прогноз на 4 дня
- Два сервиса поиска города
- Добавление нескольких городов
- Настройки единиц измерения
- Сохранение настроек в локальное хранилище
- Поддержка PWA
- Оффлайн доступ
- Демо https://sanya-serduk.github.io/weather/

<br>

![Welcomw](https://raw.githubusercontent.com/sanya-serduk/weather/master/screenshots/welcome.png)
![Welcome search](https://raw.githubusercontent.com/sanya-serduk/weather/master/screenshots/welcome-search.png)
![Weather current](https://raw.githubusercontent.com/sanya-serduk/weather/master/screenshots/weather-current.png)
![Weather future and settings](https://raw.githubusercontent.com/sanya-serduk/weather/master/screenshots/weather-future-and-settings.png)
![Mobile](https://raw.githubusercontent.com/sanya-serduk/weather/master/screenshots/mobile.png)

<br>

## Установка и сборка
```bash
# Установка
npm install

# Сборка
npm run build

# Запуск в режиме разработки
npm run serve
```

## Настройка API ключей
```
src/api/SETTINGS.js
```
```javascript
export default {
    SERVICES: {
        YANDEX: {
            HOST: 'https://geocode-maps.yandex.ru/1.x/',
            API_KEY: 'ключ'
        },
        OPENWEATHERMAP: {
            HOST: 'https://api.openweathermap.org/',
            API_KEY: 'ключ'
        }
    }
}
```
