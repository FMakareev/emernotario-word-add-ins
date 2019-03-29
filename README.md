# Emernotar: NPU

> Проект создан на базе [yeoman генератора](https://yeoman.io/) https://github.com/OfficeDev/generator-office


## Установка


## Скрипты

* clean
* lint - проверка кода на соответствие стилю
* start - запуск в режиме разработки
* sideload - запуск плагина в word, команда выполняется строго после команды start. При изменениях в файле [manifest.xml](manifest.xml) нужно закрт office и запустить команду заново.  
* build - сборка на прод билда
* validate - валидация файла [manifest.xml](manifest.xml) выполнять всега после любх изменений в [manifest.xml](manifest.xml)

## Маршрутизация



## Основне методы и классы



## Локализаия

Файл с локализайией хранятся в дирректории [assets/messages](assets/messages). 
Файл [localization.json](assets/messages/localization.json) это конфиг локализации

Пример:

```json
{
  "name": "Русский",
  "code": "RU",
  "default": false,
  "dir": "ltr"
}
```

name - название языка для выыпадающего списка смены языка
code - код языка, обязательно из [этой таблицы](https://docs.microsoft.com/ru-ru/previous-versions/office/office-2013-resource-kit/cc179219(v=office.15)#%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2%D1%8B%D0%B5-%D1%82%D0%B5%D0%B3%D0%B8-%D0%B8%D0%B4%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D1%80%D1%8B-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0-%D0%B8-%D0%BA%D0%BE%D0%B4%D1%8B-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D1%8B%D0%B5-%D0%B2-office-2013)
default - сделать язком по умоланию, если не задавать ни один из языков по умолчанию то будет выбиратся системный язык
dir - направление текста либо `ltr` - с лева на право, либо `rtl` - с право на лево. По умолчанию `ltr`

Для переводов мета данных таких как: название приложения, описание, название кнопки в ленте необходимо вносить 
изменения в файл [manifest.xml](manifest.xml), более подробно об это написано в [документации](https://docs.microsoft.com/ru-ru/office/dev/add-ins/develop/localization)

В файле манифеста можно добавлять локализаию для:

* Названия расширения
* Описания расширения
* Заголовок тултипа приветствия при первой установке
* Описание тултипа приветствия при первой установке
* Подпись на кнопке в ленте

Далее будет описан способ добавления/редактирования локализаии в файле [manifest.xml](manifest.xml)

> Важно! [manifest.xml](manifest.xml) оень строго относится к содержимому и порядку содержимого и при любой даже 
казалось бы не знаительной ошибке он не даст приложению запустится. Перед тем как публиковать измененный манифест 
нужно выполнить команду yarn validate она проверить манифест на налиие ошибок и сообщит о проблеме в случае ошибки

### Названия расширения

Для того чтобы добавить перевод "название приложения" на какой либо язык необходимо в файле [manifest.xml](manifest.xml)
найти тег `DisplayName` и добавить в конец списка дочерних тегов тег `Override` с атрибутами `Locale` - [Код язка](https://docs.microsoft.com/ru-ru/previous-versions/office/office-2013-resource-kit/cc179219(v=office.15)#%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2%D1%8B%D0%B5-%D1%82%D0%B5%D0%B3%D0%B8-%D0%B8%D0%B4%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D1%80%D1%8B-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0-%D0%B8-%D0%BA%D0%BE%D0%B4%D1%8B-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D1%8B%D0%B5-%D0%B2-office-2013)
`Value` - строка перевода.

### Описание расширения

Для того чтобы добавить перевод "описания приложения" на какой либо язык необходимо в файле [manifest.xml](manifest.xml)
найти тег `Description` и добавить в конец списка дочерних тегов тег `Override` с атрибутами `Locale` - [Код язка](https://docs.microsoft.com/ru-ru/previous-versions/office/office-2013-resource-kit/cc179219(v=office.15)#%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2%D1%8B%D0%B5-%D1%82%D0%B5%D0%B3%D0%B8-%D0%B8%D0%B4%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D1%80%D1%8B-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0-%D0%B8-%D0%BA%D0%BE%D0%B4%D1%8B-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D1%8B%D0%B5-%D0%B2-office-2013)
`Value` - строка перевода.

### Заголовок тултипа приветствия при первой установке

Для того чтобы добавить перевод "Заголовок тултипа приветствия при первой установке" на какой либо язык, необходимо в файле [manifest.xml](manifest.xml)
внутри тега `<Resources>` найти тег `bt:String` с `id="EMERTech.GetStarted.Title"` и добавить в конец списка дочерних 
тегов тег `bt:Override` с атрибутами `Locale` - [Код язка](https://docs.microsoft.com/ru-ru/previous-versions/office/office-2013-resource-kit/cc179219(v=office.15)#%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2%D1%8B%D0%B5-%D1%82%D0%B5%D0%B3%D0%B8-%D0%B8%D0%B4%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D1%80%D1%8B-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0-%D0%B8-%D0%BA%D0%BE%D0%B4%D1%8B-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D1%8B%D0%B5-%D0%B2-office-2013)
`Value` - строка перевода.

### Описание тултипа приветствия при первой установке

Для того чтобы добавить перевод "Описание тултипа приветствия при первой установке" на какой либо язык, необходимо в файле [manifest.xml](manifest.xml)
внутри тега `<Resources>` найти тег `bt:String` с `id="EMERTech.GetStarted.Description"` и добавить в конец списка дочерних 
тегов тег `bt:Override` с атрибутами `Locale` - [Код язка](https://docs.microsoft.com/ru-ru/previous-versions/office/office-2013-resource-kit/cc179219(v=office.15)#%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2%D1%8B%D0%B5-%D1%82%D0%B5%D0%B3%D0%B8-%D0%B8%D0%B4%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D1%80%D1%8B-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0-%D0%B8-%D0%BA%D0%BE%D0%B4%D1%8B-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D1%8B%D0%B5-%D0%B2-office-2013)
`Value` - строка перевода.

### Подпись на кнопке в ленте

Для того чтобы добавить перевод "Подпись на кнопке в ленте" на какой либо язык, необходимо в файле [manifest.xml](manifest.xml)
внутри тега `<Resources>` найти тег `bt:String` с `id="EMERTech.TaskpaneButton.Label"` и добавить в конец списка дочерних 
тегов тег `bt:Override` с атрибутами `Locale` - [Код язка](https://docs.microsoft.com/ru-ru/previous-versions/office/office-2013-resource-kit/cc179219(v=office.15)#%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2%D1%8B%D0%B5-%D1%82%D0%B5%D0%B3%D0%B8-%D0%B8%D0%B4%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D1%80%D1%8B-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0-%D0%B8-%D0%BA%D0%BE%D0%B4%D1%8B-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D1%8B%D0%B5-%D0%B2-office-2013)
`Value` - строка перевода.

