import cities from 'cnaps/assets/cities.json'

export const provinces = [{ value: 'all', label: '全部' }].concat(
  Array.from(new Set(cities.map(city => city.ProvinceCode)))
    .map((code) => {
      const city = cities.find(c => c.ProvinceCode === code)
      return {
        value: code,
        label: city.ProvinceName,
      }
    })
    .sort((a, b) => a.value.localeCompare(b.value)),
)

export const citiesMap = provinces.reduce((acc, province) => {
  if (province.value === 'all') {
    acc[province.value] = [{ value: 'all', label: '全部' }]
    return acc
  }
  acc[province.value] = [{ value: 'all', label: '全部' }].concat(cities
    .filter(city => city.ProvinceCode === province.value)
    .map(city => ({
      value: city.CityCode,
      label: city.CityName,
    }))
    .sort((a, b) => a.value.localeCompare(b.value)))
  return acc
}, {})
