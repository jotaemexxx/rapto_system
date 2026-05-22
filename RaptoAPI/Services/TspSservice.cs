using RaptoAPI.Models;

namespace RaptoAPI.Services
{
    public class TspService
    {
        // Ponto fixo: sede da Rapto em Porto Velho - RO
        private readonly Ponto _sede = new Ponto
        {
            Id = 0,
            Nome = "Sede Rapto - Porto Velho",
            Latitude = -8.7612,
            Longitude = -63.9004
        };

        public ResultadoRota Otimizar(List<Ponto> pontos)
        {
            if (pontos == null || pontos.Count == 0)
                throw new ArgumentException("Nenhum ponto de entrega informado.");

            // Monta lista completa: sede + pontos de entrega
            var todos = new List<Ponto> { _sede };
            todos.AddRange(pontos);

            var visitados = new List<Ponto>();
            var naoVisitados = new List<Ponto>(pontos);
            double distanciaTotal = 0;

            // Começa na sede
            var atual = _sede;
            visitados.Add(atual);

            // Algoritmo Vizinho Mais Próximo
            while (naoVisitados.Count > 0)
            {
                Ponto maisProximo = null;
                double menorDistancia = double.MaxValue;

                foreach (var ponto in naoVisitados)
                {
                    double dist = CalcularDistancia(atual, ponto);
                    if (dist < menorDistancia)
                    {
                        menorDistancia = dist;
                        maisProximo = ponto;
                    }
                }

                visitados.Add(maisProximo);
                distanciaTotal += menorDistancia;
                naoVisitados.Remove(maisProximo);
                atual = maisProximo;
            }

            // Volta para a sede no final
            distanciaTotal += CalcularDistancia(atual, _sede);
            visitados.Add(_sede);

            return new ResultadoRota
            {
                Rota = visitados,
                DistanciaTotalKm = Math.Round(distanciaTotal, 2)
            };
        }

        // Fórmula de Haversine — distância real entre dois pontos no globo
        private double CalcularDistancia(Ponto a, Ponto b)
        {
            const double R = 6371; // raio da Terra em km
            double dLat = ToRad(b.Latitude - a.Latitude);
            double dLon = ToRad(b.Longitude - a.Longitude);

            double hav = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                         Math.Cos(ToRad(a.Latitude)) * Math.Cos(ToRad(b.Latitude)) *
                         Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

            double c = 2 * Math.Atan2(Math.Sqrt(hav), Math.Sqrt(1 - hav));
            return R * c;
        }

        private double ToRad(double graus) => graus * Math.PI / 180;
    }
}