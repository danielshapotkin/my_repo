const convertButton = document.getElementById('convertButton');
convertButton.addEventListener('click', convertCurrency);
function convertCurrency() 
{
    // Получаем значения из элементов формы
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const exchangeRates = {
        USD: {
            USD: 1,
            EUR: 0.85,
            JPY: 110.15,
            GBP: 0.81,
            AUD: 1.55,
            CAD: 1.34,
            CHF: 0.9,
        },
        EUR: {
            EUR: 1,
            USD: 1.18,
            JPY: 129.72,
            GBP: 0.86,
            AUD: 1.65,
            CAD: 1.44,
            CHF: 0.96,
        },
        JPY: {
            JPY: 1,
            USD: 0.0091,
            EUR: 0.0077,
            GBP: 0.0055,
            AUD: 0.01,
            CAD: 0.0091,
            CHF: 0.0061,
        },
        GBP: {
            GBP: 1,
            USD: 1.24,
            EUR: 1.16,
            JPY: 183.26,
            AUD: 1.92,
            CAD: 1.67,
            CHF: 1.11,
        },
        AUD: {
            AUD: 1,
            USD: 0.65,
            EUR: 0.7,
            GBP: 0.23,
            JPY: 0.6,
            CAD: 0.0091,
            CHF: 0.0061,
        },
        CAD: {
            CAD: 1,
            USD: 0.0091,
            EUR: 0.0077,
            GBP: 0.0055,
            AUD: 0.01,
            JPY: 0.0091,
            CHF: 0.0061,
        },
        CHF: {
            CHF: 1,
            USD: 0.0091,
            EUR: 0.0077,
            GBP: 0.0055,
            AUD: 0.01,
            CAD: 0.0091,
            JPY: 0.0061,
        },
    };

    // Проверяем, есть ли курсы обмена для выбранных валют
    if (fromCurrency in exchangeRates && toCurrency in exchangeRates[fromCurrency]) {
        // Вычисляем конвертированную сумму
        const exchangeRate = exchangeRates[fromCurrency][toCurrency];
        const convertedAmount = (amount * exchangeRate).toFixed(2); // Округляем до двух знаков после запятой
        // Выводим результат
        const resultElement = document.getElementById('result')
        resultElement.value = convertedAmount;
        addToHistory (fromCurrency, toCurrency, amount, convertedAmount)
    } else {
        alert('Курсы обмена для выбранных валют не найдены.');
    }
    console.log("User in convertCurrency" + currentUser)
}
function print(forPrint)
{   
        // Если данные уже существуют, распарсим их.
        const parsedData = JSON.parse(forPrint);

        // Получаем элемент списка, к которому будем добавлять данные.
        const historyList = document.querySelector('#history ul');

        // Очищаем список, если он уже содержит элементы.
        historyList.innerHTML = '';

        // Проходим по каждой структуре данных и создаем элементы списка (li) для каждой.
        parsedData.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = item.amount + item.fromCurrency + "-->" + item.convertedAmount + item.toCurrency

            // Добавляем элемент списка к истории конвертаций.
            historyList.appendChild(listItem);
        });
}
function addToHistory(fromCurrency, toCurrency, amount, convertedAmount) {
    const newData = {
        fromCurrency,
        toCurrency,
        amount,
        convertedAmount
    };
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    const localStorageKey = currentUser + "history";
    const existingData = localStorage.getItem(localStorageKey);

    if (existingData) {
        // Если данные уже существуют, распарсим их.
        const parsedData = JSON.parse(existingData);

        if (!Array.isArray(parsedData)) {
            // Если данные не являются массивом, создадим новый массив и добавим в него существующие данные.
            const dataArray = [parsedData];
            
            // Добавляем новые данные.
            dataArray.push(newData);

            // После обновления данных, преобразуем их обратно в JSON-строку.
            const updatedData = JSON.stringify(dataArray);

            // Сохраняем обновленные данные в localStorage.
            localStorage.setItem(localStorageKey, updatedData);

            // Вызываем функцию print для обновления вывода.
            print(localStorage.getItem(localStorageKey));
        } else {
            // Обновляем данные в массиве.
            parsedData.push(newData);

            // После обновления данных, преобразуем их обратно в JSON-строку.
            const updatedData = JSON.stringify(parsedData);

            // Сохраняем обновленные данные в localStorage.
            localStorage.setItem(localStorageKey, updatedData);

            // Вызываем функцию print для обновления вывода.
            print(localStorage.getItem(localStorageKey));
        }
    } else {
        // Если данных с таким ключом нет, создаем новый массив данных.
        const data = [newData];

        // Преобразуем массив данных в JSON-строку.
        const jsonData = JSON.stringify(data);

        // Сохраняем данные в localStorage.
        localStorage.setItem(localStorageKey, jsonData);

        // Вызываем функцию print для обновления вывода.
        print(localStorage.getItem(localStorageKey));
    }
}


function register() 
{
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const usersData = JSON.parse(localStorage.getItem("usersData")) || {}
    usersData[username] = password
    localStorage.setItem("usersData", JSON.stringify(usersData))
    alert("Вы успешно зарегистрированы");
}

function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const usersData = JSON.parse(localStorage.getItem("usersData")) || {};

    if (usersData.hasOwnProperty(username)) {
        // Проверяем, существует ли пользователь в базе данных
        const savedPassword = usersData[username];

        if (savedPassword === password) {
            alert("Вход выполнен");
            const jsonCurrentUser = JSON.stringify(username);
            localStorage.setItem("currentUser", jsonCurrentUser);
            
            // Загружаем историю конвертаций пользователя и передаем её в функцию print
            const historyKey = username + "history";
            const userHistory = localStorage.getItem(historyKey);
            if (userHistory) {
                print(userHistory);
            }
        } else {
            alert("Неправильный логин или пароль");
        }
    } else {
        alert("Пользователь не найден");
    }
}



