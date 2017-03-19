using C2V.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace C2V.Domain.Repositories
{
    public interface ICitiesRepository
    {
        List<City> GetAllCities();

        City GetCityByName(string city);

        void EditCity(City city);

        void AddCity(City city);

        void DeleteCity(string cityName);

        int CountVisitedCities();
    }
}
