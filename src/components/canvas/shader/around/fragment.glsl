varying vec2 vUv;

void main() {
  float radius = length((vUv - .5) * 2.6);
  float radial = (radius - 1.) / .3;
  if (radial < 0. || radial > 1.) discard;
  float alpha = pow(1. - radial, 2.);
  float heat = (1. + alpha * .5) * .46;
  vec3 color = vec3(heat, heat * heat, pow(heat, 4.)) * (1.06 / .46);
  gl_FragColor = vec4(color * alpha, alpha);
}
