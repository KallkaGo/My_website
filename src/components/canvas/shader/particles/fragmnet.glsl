uniform sampler2D uDiffuseTexture;
varying vec3 vColor;
varying vec2 vUv;

void main() {
  float dis = distance(gl_PointCoord, vec2(0.5));
  if(dis >= 0.5)
    discard;
  vec3 col = texture2D(uDiffuseTexture, vUv).rgb;
  gl_FragColor = vec4(col, 1.);
  #include <tonemapping_fragment>
	#include <colorspace_fragment>
}