using Microsoft.AspNetCore.Mvc;
using RaptoAPI.Models;
using RaptoAPI.Services;

namespace RaptoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RotaController : ControllerBase
    {
        private readonly TspService _tspService;

        public RotaController(TspService tspService)
        {
            _tspService = tspService;
        }

        /// <summary>
        /// Otimiza a rota de entrega usando o algoritmo Vizinho Mais Próximo (TSP).
        /// Sempre parte e retorna à sede da Rapto em São Paulo.
        /// </summary>
        [HttpPost("otimizar")]
        public ActionResult<ResultadoRota> Otimizar([FromBody] List<Ponto> pontos)
        {
            if (pontos == null || pontos.Count == 0)
                return BadRequest("Informe ao menos um ponto de entrega.");

            if (pontos.Count > 20)
                return BadRequest("Máximo de 20 pontos de entrega por rota.");

            // Valida coordenadas
            foreach (var ponto in pontos)
            {
                if (ponto.Latitude == 0 && ponto.Longitude == 0)
                    return BadRequest($"Coordenadas inválidas no ponto '{ponto.Nome}'.");
            }

            var resultado = _tspService.Otimizar(pontos);
            return Ok(resultado);
        }

        /// <summary>
        /// Retorna a localização da sede da Rapto.
        /// </summary>
        [HttpGet("sede")]
        public ActionResult<Ponto> GetSede()
        {
            return Ok(new Ponto
            {
                Id = 0,
                Nome = "Sede Rapto - Porto Velho",
                Latitude = -8.7612,
                Longitude = -63.9004
            });
        }
    }
}
