import fse from 'fs-extra'
import type { GansuCity, GansuDetailCity } from './api/city';

(async function iife() {
  const cities: GansuDetailCity[] = await fse.readJSON('assets/cities.json')
  const oldCities: GansuCity[] = await fse.readJSON('assets/old-cities.json')

  const cityCodeMap = new Map<string, GansuDetailCity>()
  for (const city of cities)
    cityCodeMap.set(city.CityCode, city)

  oldCities.forEach((oldCity) => {
    const city = cityCodeMap.get(oldCity.CityCode)
    if (city && oldCity.CityName !== city.CityName) {
      // console.log(
      //   `update city[${oldCity.CityCode}] from ${oldCity.CityName} to ${city.CityName}`
      // );
      oldCity.CityName = city.CityName
    }
  })

  await fse.writeJSON('assets/merged-cities.json', oldCities, { spaces: 2 })
  await fse.writeFile(
    'assets/merged-cities.csv',
    oldCities.reduce(
      (acc, city) => `${acc}${city.CityCode}\t${city.CityName}\n`,
      '',
    ),
  )
})()
