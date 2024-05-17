import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountryList({ cities, isLoading }) {
  const countries = cities.reduce((acc, curr) => {
    console.log(acc);
    if (acc.filter((country) => country.country === curr.country).length > 0) {
      return acc;
    }
    return [...acc, { country: curr.country, emoji: curr.emoji }];
  }, []);

  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />;
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
