using System.ComponentModel.DataAnnotations;

namespace Comercializadora.Models
{
    public class Auto
    {
        public int? Id { get; set; }
        public string? Marca { get; set; }
        public string? Modelo { get; set; }
        public int? Anio { get; set; }
        public string? Descripcion { get; set; }
        public double Precio { get; set; }
        public string? Imagen { get; set;}
        public string? Categoria { get; set;}
    }
}
