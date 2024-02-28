# Commission fees

An app to manage the cash in your bank account. Users can use the app for convenient cash deposits and withdrawals at bank branches. The application supports EUR currency only.

## :blue_book: Table of contents

  1. [Baseline requirements](#exclamation-baseline-requirements)
  
  2. [Additional libraries](#open_book-additional-libraries)

  3. [Prerequisites and Setup](#wrench-prerequisites-and-setup)

  4. [Testing](#question-testing)

  5. [Coding Styleguides](#writing_hand-coding-styleguides)


## :exclamation: Baseline requirements

Users can go to a branch to <code>cash in</code> & <code>cash out</code> from bank account. There are also commission fees for both <code>cash in</code> and <code>cash out</code>. Only supported currency is EUR.

### For Cash In

Commission fee - 0.03% from total amount, but no more than 5.00 EUR.

```json
{"percents":0.03,"max":{"amount":5,"currency":"EUR"}}
```

### For Cash Out

There are different commission fees for cash out for natural and legal persons.

#### Natural Persons

Default commission fee - 0.3% from cash out amount.

1000.00 EUR per week (from monday to sunday) is free of charge.

If total cash out amount is exceeded - commission is calculated only from exceeded amount (that is, for 1000.00 EUR there is still no commission fee).

```js
{
    percents: 0.3,
    week_limit: {
        amount:1000,
        currency:"EUR"
    }
}
```

#### Legal persons

Commission fee - 0.3% from amount, but not less than 0.50 EUR for operation.

```js
{
    percents: 0.3,
    min: {
        amount:0.5,
        currency:"EUR"
    }
}
```

### Rounding

After calculating commission fee, it's rounded to the smallest currency item (for example, for EUR currency - cents) to upper bound (ceiled). For example, 0.023 EUR should be rounded to 3 Euro cents.

### Input data

Input data is given in JSON file. Performed operations are given in that file. In each object following data is provided:

```js
{
    "date": "2016-01-05", // operation date in format `Y-m-d`
    "user_id": 1, // user id, integer
    "user_type": "natural", // user type, one of “natural”(natural person) or “juridical”(legal person)
    "type": "cash_in", // operation type, one of “cash_in” or “cash_out”
    "operation": {
        "amount": 200, // operation amount(for example `2.12` or `3`)
        "currency": "EUR" // operation currency `EUR`
    }
}
```

All operations are ordered by their date ascendingly.

### Expected Result

As a single argument program must accept a path to the input file.

Program must output result to stdout.

Result - calculated commission fees for each operation. In each line only final calculated commission fee must be provided without currency.

### Example Data

```
➜  cat input.json
[
    { "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "EUR" } },
    { "date": "2016-01-06", "user_id": 2, "user_type": "juridical", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } },
    { "date": "2016-01-06", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 30000, "currency": "EUR" } },
     { "date": "2016-01-07", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 1000.00, "currency": "EUR" } },
    { "date": "2016-01-07", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 100.00, "currency": "EUR" } },
    { "date": "2016-01-10", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 100.00, "currency": "EUR" } },
    { "date": "2016-01-10", "user_id": 2, "user_type": "juridical", "type": "cash_in", "operation": { "amount": 1000000.00, "currency": "EUR" } },
    { "date": "2016-01-10", "user_id": 3, "user_type": "natural", "type": "cash_out", "operation": { "amount": 1000.00, "currency": "EUR" } },
    { "date": "2016-02-15", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } },
]

➜  node app.js input.json
0.06
0.90
87.00
3.00
0.30
0.30
5.00
0.00
0.00
```

## :open_book: Additional libraries

- [moment](https://momentjs.com/)

## :wrench: Prerequisites and Setup

To install all dependencies simply run:

```bash
npm i
```

### Running / Development

You can get app up and running with simple command:

```bash
npm start
```

## :question: Testing

Run:

```bash
npm test
```

## :writing_hand: Coding Styleguides

Сode conforms to the standards and guidelines provided in the [Airbnb Style Guide](https://github.com/airbnb/javascript).