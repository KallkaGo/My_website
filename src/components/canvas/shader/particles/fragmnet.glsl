uniform sampler2D uDiffuseTexture;
varying vec3 vColor;
varying vec2 vUv;

void main() {
  float dis = distance(gl_PointCoord, vec2(0.5));
  float alpha = 1. - smoothstep(0.2, 0.5, dis);
  vec3 col = texture2D(uDiffuseTexture, vUv).rgb;
  gl_FragColor = vec4(col , alpha);
  #include <tonemapping_fragment>
	#include <colorspace_fragment>
}