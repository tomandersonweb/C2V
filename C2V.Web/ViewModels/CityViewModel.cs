using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Omu.ValueInjecter;
using C2V.Domain.Entities;

namespace C2V.Web.ViewModels
{
    public class CityViewModel
    {
        public CityViewModel(City city)
        {
            if (city != null)
                this.InjectFrom(city);
        }

        [Required]
        [MinLength(2)]
        [MaxLength(128)]
        public string Name { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(128)]
        public string Country { get; set; }

        public List<string> Attractions { get; set; }

        public bool Visited { get; set; }
    }
}
