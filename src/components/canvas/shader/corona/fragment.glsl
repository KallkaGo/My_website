uniform float uAlpha;
varying float vAcross;
varying float vOpacity;
varying vec3 vColor;

void main() {
  float feather = 1. - smoothstep(0., 1., abs(vAcross));
  float strength = feather * feather * vOpacity;
  gl_FragColor = vec4(vColor * strength, strength * uAlpha);
}
