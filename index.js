/**
 * Takes a trianglular plane as a {@link Polygon} feature and a {@link Point} feature on the plane and returns the z-value
 * for a point on the plane.
 *
 * @module turf/planepoint
 * @param {Point} interpolatedPoint
 * @param {Array<Array<number>>} triangle
 * @return {number} the value at that point
 * @example
 * var point = turf.point(-75.3221, 39.529);
 * // triangle is a polygon with "a", "b",
 * // and "c" values representing
 * // the values of the coordinates in order.
 * var triangle = turf.polygon(
 *   [[[-75.1221,39.57],[-75.58,39.18],[-75.97,39.86]]],
 *   {"a": 11, "b": 122, "c": 44});
 * var zValue = turf.planepoint(point, triangle);
 * //=zValue
 */
module.exports = function(point, triangle, done){
  var x = point.geometry.coordinates[0],
      y = point.geometry.coordinates[1],
      x1 = triangle.geometry.coordinates[0][0][0],
      y1 = triangle.geometry.coordinates[0][0][1],
      z1 = triangle.properties.a,
      x2 = triangle.geometry.coordinates[0][1][0],
      y2 = triangle.geometry.coordinates[0][1][1],
      z2 = triangle.properties.b,
      x3 = triangle.geometry.coordinates[0][2][0],
      y3 = triangle.geometry.coordinates[0][2][1],
      z3 = triangle.properties.c;

  var z = (z3 * (x-x1) * (y-y2) + z1 * (x-x2) * (y-y3) + z2 * (x-x3) * (y-y1) -
      z2 * (x-x1) * (y-y3) - z3 * (x-x2) * (y-y1) - z1 * (x-x3) * (y-y2)) /
      ((x-x1) * (y-y2) + (x-x2) * (y-y3) +(x-x3) * (y-y1) -
       (x-x1) * (y-y3) - (x-x2) * (y-y1) - (x-x3) * (y-y2));

  return z;
};
