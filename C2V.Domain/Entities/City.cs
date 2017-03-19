using System;
using System.Collections.Generic;
using System.Text;

namespace C2V.Domain.Entities
{
    public class City
    {
        public string Name { get; set; }

        public string Country { get; set; }

        public List<string> Attractions { get; set; }

        public bool Visited { get; set; }
    }
}
