using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Omu.ValueInjecter;
using C2V.Domain.Repositories;
using C2V.Web.ViewModels;
using C2V.Domain.Entities;

namespace C2V.Web.Controllers
{
    [Route("api/[controller]")]
    public class CitiesController : Controller
    {
        ICitiesRepository _citiesRepository;

        public CitiesController(ICitiesRepository citiesRepository)
        {
            _citiesRepository = citiesRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_citiesRepository.GetAllCities().Select(x => new CityViewModel(x)));
        }

        [HttpGet("visited")]
        public IActionResult CountVisitedCities()
        {
            var count = _citiesRepository.CountVisitedCities();
            return Ok(count);
        }

        [HttpGet("{cityName}")]
        public IActionResult Get(string cityName)
        {
            var city = _citiesRepository.GetCityByName(cityName);

            if (city == null)
                return NotFound();

            return Ok(new CityViewModel(city));
        }

        [HttpPost]
        public IActionResult Post([FromBody]CityViewModel cityViewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            if (_citiesRepository.GetCityByName(cityViewModel.Name) != null)
                return BadRequest();

            var city = new City();

            city.InjectFrom(cityViewModel);

            _citiesRepository.AddCity(city);

            return Ok();
        }

        [HttpPut("{cityName}")]
        public IActionResult Put(string cityName, [FromBody]CityViewModel cityViewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var city = new City();
            city.InjectFrom(cityViewModel);

            _citiesRepository.EditCity(city);

            return Ok();
        }

        [HttpDelete("{cityName}")]
        public IActionResult Delete(string cityName)
        {
            _citiesRepository.DeleteCity(cityName);

            return Ok();
        }
    }
}
