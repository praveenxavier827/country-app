export const fetchCountries = async () => {
    const response = await fetch('https://restcountries.com/v2/all?fields=name,region,flag');
    return response.json();
  };
  