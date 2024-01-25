import React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Line
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";


const MapChart = ({ waypoints, currentTime, onMarkerClick }) => {
    // ... Fonctions lastWaypointReached et getMarkerColor comme précédemment
    const lastWaypointReached = waypoints
        .filter((waypoint) => parseInt(waypoint.timestamp) <= currentTime)
        .slice(-1)[0];

    // Déterminez la couleur du marqueur en fonction du temps de la vidéo
    const getMarkerColor = (waypoint) => {
        if (lastWaypointReached && waypoint.label === lastWaypointReached.label) {
            return "red"; // Le dernier point atteint
        } else if (parseInt(waypoint.timestamp) < currentTime) {
            return "green"; // Points passés
        }
        return "blue"; // Points futurs
    };

    // Récupérez tous les waypoints atteints jusqu'au currentTime
    const waypointsReached = waypoints.filter(
        (waypoint) => parseInt(waypoint.timestamp) <= currentTime
    );

    return (
        <ComposableMap projection="geoAlbersUsa">
            <Geographies geography={geoUrl}>
                {({ geographies }) => (
                    <>
                        {geographies.map(geo => (
                            <Geography
                                key={geo.rsmKey}
                                stroke="#FFF"
                                geography={geo}
                                fill="#DDD"
                            />
                        ))}

                        {/* Tracer les lignes entre les waypoints atteints */}
                        {waypointsReached.map((waypoint, index) => {
                            if (index < waypointsReached.length - 1) {
                                const nextWaypoint = waypointsReached[index + 1];
                                return (
                                    <Line
                                        key={`line-${index}`}
                                        from={[waypoint.lng, waypoint.lat]}
                                        to={[nextWaypoint.lng, nextWaypoint.lat]}
                                        stroke="#FF5533"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                    />
                                );
                            }
                            return null;
                        })}

                        {/* Marqueurs pour les waypoints */}
                        {waypoints.map((waypoint, index) => (
                            <Marker
                                key={index}
                                coordinates={[waypoint.lng, waypoint.lat]}
                                onClick={() => onMarkerClick(waypoint.timestamp)}
                            >
                                <circle
                                    r={5}
                                    fill={getMarkerColor(waypoint)}
                                    stroke="#fff"
                                    strokeWidth={2}
                                />
                                <text
                                    textAnchor="middle"
                                    y={-10}
                                    style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                                >
                                    {waypoint.label}
                                </text>
                            </Marker>
                        ))}
                    </>
                )}
            </Geographies>
        </ComposableMap>
    );
};

export default MapChart;
