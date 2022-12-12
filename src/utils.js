import center from "@turf/center";
import { points } from "@turf/helpers";

export function getCenterOfGeo(coordinates) {
  const features = points(coordinates);
  const _center = center(features);
  return _center;
}

export const getPosition = (data) => {
  const coordinates = data?.geometries?.map((el) => {
    return el.coordinates;
  });
  //if we have more thank 1 coordinate return cener point
  const center = getCenterOfGeo(coordinates).geometry.coordinates;
  return center;
};