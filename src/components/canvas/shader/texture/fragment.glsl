#include "/node_modules/lygia/generative/snoise.glsl"
varying vec2 vUv;
varying vec3 vPosition;

float solarNoise(vec4 p) {
  float sum = 0.;
  float amp = 1.;
  float scale = 1.;
  for(int i = 0; i < 6; i++) {
    sum += snoise(p * scale) * amp;
    amp *= .8;
    scale *= 2.;
    p.w += 100.;
  }
  return sum;
}

void main() {
  vec3 direction = normalize(vPosition) + 12.45;
  float detail = solarNoise(vec4(direction * 6., 0.)) * .25 + .5;
  float regions = max(snoise(vec4(direction * 2., 0.)), 0.);
  detail *= mix(1., regions, .72);
  // 参考的噪声图只生成一次；随后转动三个采样层，不逐帧改写纹理。
  gl_FragColor = vec4(vec3(clamp(detail, 0., 1.)), 1.);
}
