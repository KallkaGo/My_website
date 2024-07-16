uniform vec2 uResolution;
uniform sampler2D uPictureTexture;
uniform sampler2D uDisplacementTexture;
varying vec3 vColor;
varying vec2 vUv;

attribute float aAngle;
attribute float aIntensity;

void main() {
  vec3 newPosition = position;
  float displacementIntensity = texture(uDisplacementTexture, uv).r;
  displacementIntensity = smoothstep(0.1, .3, displacementIntensity);
  vec3 displacement = vec3(cos(aAngle) * 0.2, sin(aAngle) * 0.2, 1.0);
  displacement = normalize(displacement);
  displacement *= displacementIntensity;
  displacement *= 3.;
  displacement *= aIntensity;
  newPosition += displacement;

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  float pictureIntensity = texture2D(uPictureTexture, uv).r;
  vColor = vec3(pow(pictureIntensity, 2.));
  gl_Position = projectedPosition;
  gl_PointSize = 0.1 * uResolution.y * aIntensity;
  gl_PointSize *= (1.0 / -viewPosition.z);
  vUv = uv;
}