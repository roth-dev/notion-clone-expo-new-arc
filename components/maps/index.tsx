"use dom";

import "text-encoding-polyfill";
import { useEffect } from "react";
import Map from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { Text, View } from "react-native";

export default function MapBox(_: any) {
  useEffect(() => {
    let protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text className="text-red-500">This is native Text</Text>
      <div style={{ width: "100%", height: "100%" }}>
        <p className="text-red-400">This is webview text</p>
        <Map
          style={{ width: "100%", height: 900 }}
          mapStyle={{
            version: 8,
            sources: {
              sample: {
                type: "vector",
                url: "pmtiles://https://r2-public.protomaps.com/protomaps-sample-datasets/cb_2018_us_zcta510_500k.pmtiles",
              },
            },
            layers: [
              {
                id: "zcta",
                source: "sample",
                "source-layer": "zcta",
                type: "line",
                paint: {
                  "line-color": "#999",
                },
              },
            ],
          }}
          mapLib={maplibregl}
        />
      </div>
    </View>
  );
}
