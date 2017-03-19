using C2V.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System.Linq;
using C2V.Domain.Entities;

namespace C2V.InMemoryPersistence.Repositories
{
    public class CitiesRepository : ICitiesRepository
    {

        private MemoryCacheEntryOptions cacheOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(6000));
        private IMemoryCache _cache;
        private string _key = "cities";
        private string _defaultCities = @"[
                  {
                                'Name': 'Manchester',
                    'Country': 'UK',
                    'Attractions': ['football', 'bars']
                },
                  {
                    'Name': 'Liverpool',
                    'Country': 'UK',
                    'Attractions': ['football', 'bars', 'music']
                },  
                  {
                    'Name': 'York',
                    'Country': 'UK',
                    'Attractions': ['city walls', 'cathedral']
                  },
                  {
                    'Name': 'Las Vegas',
                    'Country': 'USA',
                    'Attractions': ['casinos','Grand Canyon','shows']
                  },
                  {
                    'Name': 'Beijing',
                    'Country': 'China',
                    'Attractions': ['Great Wall of China', 'Forbidden City']
                  }
                ]";

        private List<City> _cities;

        public CitiesRepository(IMemoryCache memoryCache)
        {
            _cache = memoryCache;

            if (!_cache.TryGetValue(_key, out _cities))
            {
                var defaultCities = JsonConvert.DeserializeObject<List<City>>(_defaultCities);
                var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(6000));
                _cache.Set("cities", defaultCities, cacheEntryOptions);

                _cities = defaultCities;
            }
        }
        public List<City> GetAllCities()
        {
            return _cities;
        }

        public City GetCityByName(string name)
        {
            var city = _cities.Where(x => x.Name?.ToLower() == name.ToLower()).SingleOrDefault();
            return city;
        }

        public void AddCity(City city)
        {
            _cities.Add(city);
            _cache.Set("cities", _cities, cacheOptions);
        }

        public void EditCity(City city)
        {
            var cityToUpdate = _cities.Where(x => x.Name?.ToLower() == city.Name.ToLower()).SingleOrDefault();

            if (cityToUpdate != null)
            {
                cityToUpdate.Name = city.Name;
                cityToUpdate.Attractions = city.Attractions;
                cityToUpdate.Country = city.Country;
                cityToUpdate.Visited = city.Visited;
            }
            _cache.Set("cities", _cities, cacheOptions);
        }

        public void DeleteCity(string cityName)
        {
            var cityToRemove = _cities.Where(x => x.Name?.ToLower() == cityName.ToLower()).SingleOrDefault();

            if (cityToRemove != null)
                _cities.RemoveAt(_cities.IndexOf(cityToRemove));

            _cache.Set("cities", _cities, cacheOptions);
        }

        public int CountVisitedCities()
        {
            var count = _cities.Where(x => x.Visited).Count();
            return count;
        }


    }
}
