# DS1307
Kaluma library for DS1307 RTC module

## Install
```bash
npm install https://github.com/rossdoker/ds1307
```

## Wiring
| Pi Pico | DS1307 |
| ------ | ------ |
| VBUS | VCC |
| GND | GND |
| SCL | SCL |
| SDA | SDA |

## Usage
```js
const { I2C } = require('i2c');
const DS1307 = require('ds1307');

const i2c = new I2C(1, { mode: I2C.MASTER });
const ds1307 = new DS1307(i2c);
const date = new Date('2022-09-04T17:01:48.026Z');
ds1307.setDate(date);

setInterval(() => {
  console.log(ds1307.getDate().toISOString());
}, 1000)
```

## API
### Class
A class for DS1307 RTC module communicating with I2C interface.

#### new DS1307(bus, address)
Create an instance of bh1750 sensor.
- **`bus`** `<I2C>` An instance of `I2C` to communicate.
- **`address`** `<number>` I2C slave address. (7bit). Default: `0x23`.

#### bh1750.setDate(date)
Sets date to DS1307 module.
- **`date`** `<Date>` JavaScript Date object.

#### bh1750.getDate()
Returns current date.
- **`Returns`** `<Date>` JavaScript Date object.