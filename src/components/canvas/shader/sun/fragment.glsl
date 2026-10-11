uniform samplerCube uPerlin;

varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;

varying vec3 dir;
varying vec3 vNormal;

void main() {
  float layers = textureCube(uPerlin, vLayer0).r
    + textureCube(uPerlin, vLayer1).r
    + textureCube(uPerlin, vLayer2).r;
  float edge = 1. - clamp(dot(normalize(dir), normalize(vNormal)), 0., 1.);
  float brightness = layers * .33 * 4. + 1. + edge * 1.2;
  float heat = brightness * .26;
  vec3 color = vec3(heat, heat * heat, pow(heat, 4.)) * (.6 / .26);
  // 参考的曲线直接产生显示颜色，避免再做一次 sRGB 转换而漂白细节。
  gl_FragColor = vec4(clamp(color, 0., 1.), 1.);
}
