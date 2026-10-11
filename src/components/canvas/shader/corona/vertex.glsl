attribute vec3 aStart;
attribute vec3 aEnd;
attribute vec4 aSeed;
uniform float uTime;
uniform float uKind;
uniform float uWidth;
uniform float uOpacity;
varying float vAcross;
varying float vOpacity;
varying vec3 vColor;

const mat4 FLOW = mat4(
  0., .8, .6, -.4, -.8, .36, -.48, -.5,
  -.6, -.48, .64, .2, .4, .3, .2, .4
);

vec3 flowNoise(vec4 point) {
  vec4 field = vec4(0.);
  float amplitude = 1.;
  float frequency = 1.;
  for (int octave = 0; octave < 4; octave++) {
    point = FLOW * point;
    vec4 wave = sin(point.ywxz * frequency) * amplitude;
    point += wave;
    field += wave;
    amplitude *= .707;
    frequency /= .707;
  }
  return field.xyz;
}

vec3 path(float along, float growth) {
  vec3 result = vec3(0.);
  if (uKind < .5) {
    float span = distance(aStart, aEnd);
    float arch = sin(along * 3.14159265) * span * .5 * growth;
    vec3 center = mix(aStart, aEnd, along);
    center += normalize(aStart + aEnd) * arch;
    result = center + flowNoise(vec4(center * 4., uTime)) * arch * .2;
  } else {
    float extent = along * .2 * (aSeed.z + .2);
    vec3 center = aStart * (1. + extent);
    result = center + flowNoise(vec4(center * 8., uTime)) * extent * .2;
  }
  return result;
}

void main() {
  float growth = fract(uTime * .15 * aSeed.y + aSeed.x);
  vec3 point = path(position.x, growth);
  vec3 direction = normalize(path(position.x + .01, growth) - point);
  vec3 world = (modelMatrix * vec4(point, 1.)).xyz;
  vec3 tangent = normalize(mat3(modelMatrix) * direction);
  vec3 facing = normalize(world - cameraPosition);
  vec3 across = normalize(cross(facing, tangent));
  float width = uWidth * position.z;
  width *= uKind < .5 ? 1. + growth : 1. - position.x;
  world += across * width * length(modelMatrix[0].xyz);
  vAcross = position.z;
  if (uKind < .5) {
    vOpacity = smoothstep(1., 1.05, length(point)) * (1. - growth) * uOpacity;
    vColor = .6 + .6 * cos(6.3 * aSeed.w * .16 + vec3(0., 23., 21.));
  } else {
    vOpacity = uOpacity * (.5 + aSeed.w);
    float hue = aSeed.w * .2 + .2;
    vColor = 1. - smoothstep(0., .25, abs(hue + vec3(-.375, -.5, -.625)));
  }
  gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.);
}
