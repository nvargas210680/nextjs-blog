// import { useEffect } from "react";
// import mapboxgl from "mapbox-gl";
// import { createClient } from "@supabase/supabase-js";

// const MapComponent = () => {
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const supabase = createClient(
//           "https://pkcvbfszysnbwehqjtos.supabase.co/",
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrY3ZiZnN6eXNuYndlaHFqdG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUzMzY3NDgsImV4cCI6MjAxMDkxMjc0OH0.X-vYRgCiy5uig3QgKW9KpixeIlzZJOtkjzTdUa2a7Ck"
//         );

//         const { data: locations, error } = await supabase.from("create_post").select("latitude, longitude");

//         console.log("Supabase Response:", { data: locations, error });
//         if (error) {
//           console.error("Error fetching data:", error);
//           return;
//         }

//         mapboxgl.accessToken = "pk.eyJ1IjoibnZhcmdhczIxMDY4MCIsImEiOiJjbHBtemRta2QwYmg2MmpvdjBob2ZtNXFhIn0.YVcTrkMEHEs1gdAO41Zc8A";

//         const coordinates = new mapboxgl.LngLat(-114.0719, 51.0447);
//         const map = new mapboxgl.Map({
//           container: "map",
//           style: "mapbox://styles/mapbox/streets-v12",
//           center: coordinates,
//           zoom: 11,
//         });

//         locations.forEach((location) => {
//           new mapboxgl.Marker().setLngLat([location.longitude, location.latitude]).setPopup(new mapboxgl.Popup()).addTo(map);
//         });

//         const geojson = {
//           type: "FeatureCollection",
//           features: locations.map((location) => ({
//             type: "Feature",
//             geometry: {
//               type: "Point",
//               coordinates: [location.longitude, location.latitude],
//             },
//           })),
//         };

//         map.on("load", () => {
//           map.addSource("markers", {
//             type: "geojson",
//             data: geojson,
//           });

//           map.addLayer({
//             id: "markers",
//             type: "circle",
//             source: "markers",
//             paint: {
//               "circle-radius": 10,
//               "circle-color": "#FF0000",
//             },
//           });
//         });

//         return () => {
//           map.remove();
//         };
//       } catch (error) {
//         console.error("Error in useEffect:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return <div id="map" style={{ height: "100vh" }} />;
// };

// export default MapComponent;

//////////////////////////////////////////////////////////////////////////

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { createClient } from "@supabase/supabase-js";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOM from "react-dom";

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient(
          "https://pkcvbfszysnbwehqjtos.supabase.co/",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrY3ZiZnN6eXNuYndlaHFqdG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUzMzY3NDgsImV4cCI6MjAxMDkxMjc0OH0.X-vYRgCiy5uig3QgKW9KpixeIlzZJOtkjzTdUa2a7Ck"
        );

        const { data: locations, error } = await supabase.from("create_post").select("latitude, longitude");

        console.log("Supabase Response:", { data: locations, error });
        if (error) {
          console.error("Error fetching data:", error);
          return;
        }

        const geojson = {
          type: "FeatureCollection",
          features: locations.map((location) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [location.longitude, location.latitude],
            },
          })),
        };

        mapboxgl.accessToken = "pk.eyJ1IjoibnZhcmdhczIxMDY4MCIsImEiOiJjbHBtemRta2QwYmg2MmpvdjBob2ZtNXFhIn0.YVcTrkMEHEs1gdAO41Zc8A";

        const coordinates = new mapboxgl.LngLat(-114.0719, 51.0447);
        const mapInstance = new mapboxgl.Map({
          container: mapRef.current,
          style: "mapbox://styles/nvargas210680/clpxpazwp00iq01q1d48f3q91",
          center: coordinates,
          zoom: 11,
        });

        mapRef.current = mapInstance;

        mapInstance.on("load", () => {
          mapInstance.addSource("markers", {
            type: "geojson",
            data: geojson,
          });

          mapInstance.loadImage("/icon/home-location-icon.png", (error, image) => {
            if (error) throw error;

            mapInstance.addImage("custom-marker", image);

            mapInstance.addLayer({
              id: "markers",
              type: "symbol",
              source: "markers",
              layout: {
                "icon-image": "custom-marker",
                "icon-size": 0.1,
                "icon-allow-overlap": true,
              },
            });

            mapInstance.on("click", "markers", (e) => {
              const coordinates = e.features[0].geometry.coordinates;
              const description = "Beautiful House for Sale";

              console.log(coordinates);

              new mapboxgl.Popup().setLngLat(coordinates).setHTML(`<img src="icon/house.jpg" style="width:50%;height:auto;">${description}`).addTo(mapInstance);
            });
          });
        });

        return () => {
          mapInstance.remove();
        };
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };

    fetchData();
  }, []);

  return <div id="map" style={{ height: "100vh" }} ref={mapRef} />;
};

export default MapComponent;
