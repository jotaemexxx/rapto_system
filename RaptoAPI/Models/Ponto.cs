namespace RaptoAPI.Models
{
    public class Ponto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }

    public class ResultadoRota
    {
        public List<Ponto> Rota { get; set; } = new();
        public double DistanciaTotalKm { get; set; }
    }
}