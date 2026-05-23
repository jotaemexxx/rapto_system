import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapaRotas.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const iconeSede = new L.DivIcon({
  html: `<div class="marker-sede">S</div>`,
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const iconeEntrega = (n) => new L.DivIcon({
  html: `<div class="marker-entrega">${n}</div>`,
  className: "",
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

const SEDE = { lat: -8.7612, lng: -63.9004 };

async function buscarRotaRuas(pontos) {
  try {
    const coords = pontos.map((p) => `${p.longitude},${p.latitude}`).join(";");
    const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.code === "Ok" && data.routes.length > 0) {
      return data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
    }
  } catch (e) { console.error("OSRM erro:", e); }
  return null;
}

function AjustarMapa({ pontos }) {
  const map = useMap();
  useEffect(() => {
    if (pontos?.length > 0) {
      const bounds = L.latLngBounds([[SEDE.lat, SEDE.lng], ...pontos.map((p) => [p.latitude, p.longitude])]);
      map.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [pontos, map]);
  return null;
}

export default function MapaRotas({ pontos, resultado }) {
  const [linhaRuas, setLinhaRuas] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!resultado?.rota?.length) { setLinhaRuas([]); return; }
    const buscar = async () => {
      setCarregando(true);
      const pts = resultado.rota.map((p) => ({ latitude: p.latitude, longitude: p.longitude }));
      const linha = await buscarRotaRuas(pts);
      if (linha) setLinhaRuas(linha);
      setCarregando(false);
    };
    buscar();
  }, [resultado]);

  return (
    <div className="mapa-rotas-container">
      {carregando && <div className="mapa-rotas-loading">Calculando rota pelas ruas...</div>}
      <MapContainer center={[SEDE.lat, SEDE.lng]} zoom={13} className="mapa-rotas-leaflet">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; CARTO'
        />
        <AjustarMapa pontos={pontos} />
        <Marker position={[SEDE.lat, SEDE.lng]} icon={iconeSede}>
          <Popup>Sede Rapto — Porto Velho</Popup>
        </Marker>
        {pontos.map((p, i) => (
          <Marker key={p.id} position={[p.latitude, p.longitude]} icon={iconeEntrega(i + 1)}>
            <Popup><strong>{p.nome}</strong></Popup>
          </Marker>
        ))}
        {linhaRuas.length > 1 && (
          <Polyline positions={linhaRuas} pathOptions={{ color: "#0057FF", weight: 4, opacity: 0.9 }} />
        )}
        {linhaRuas.length === 0 && resultado?.rota?.length > 1 && !carregando && (
          <Polyline positions={resultado.rota.map((p) => [p.latitude, p.longitude])} pathOptions={{ color: "#0057FF", weight: 3, opacity: 0.6, dashArray: "8 4" }} />
        )}
      </MapContainer>
    </div>
  );
}
