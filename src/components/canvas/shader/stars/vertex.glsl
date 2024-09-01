attribute vec3 color;
varying vec2 vUv;
varying vec3 vColor;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
  gl_PointSize = 10.;
  gl_PointSize = gl_PointSize * (1. / -viewPosition.z);
  vUv = uv;
  vColor = color;

}