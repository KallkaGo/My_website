import {
  Clock,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  SRGBColorSpace,
  MathUtils,
  Vector2,
  Color,
  InstancedMesh,
  PlaneGeometry,
  MeshBasicMaterial,
  AdditiveBlending,
  Object3D,
  Vector3,
} from "three"

// 管理画布尺寸、相机、渲染循环及资源释放。
class ThreeScene {
  #config
  canvas
  camera
  cameraMinAspect
  cameraMaxAspect
  cameraFov
  maxPixelRatio
  minPixelRatio
  scene
  renderer
  #postprocessing
  size = {
    width: 0,
    height: 0,
    wWidth: 0,
    wHeight: 0,
    ratio: 0,
    pixelRatio: 0,
  }
  render = this.#renderScene
  onBeforeRender = () => {}
  onAfterRender = () => {}
  onAfterResize = () => {}
  #isIntersecting = false
  #isAnimating = false
  isDisposed = false
  #intersectionObserver
  #resizeObserver
  #resizeTimeout
  #resizeHandler = this.#scheduleResize.bind(this)
  #visibilityHandler = this.#handleVisibilityChange.bind(this)
  #clock = new Clock()
  #time = { elapsed: 0, delta: 0 }
  #animationFrameId

  constructor(config) {
    this.#config = { ...config }
    this.#createCamera()
    this.#createScene()
    this.#createRenderer()
    this.resize()
    this.#addListeners()
  }

  #createCamera() {
    this.camera = new PerspectiveCamera()
    this.cameraFov = this.camera.fov
  }

  #createScene() {
    this.scene = new Scene()
  }

  #createRenderer() {
    if (this.#config.canvas) {
      this.canvas = this.#config.canvas
    } else if (this.#config.id) {
      this.canvas = document.getElementById(this.#config.id)
    } else {
      console.error("Three: Missing canvas or id parameter")
    }
    this.canvas.style.display = "block"

    const rendererOptions = {
      canvas: this.canvas,
      powerPreference: "high-performance",
      ...(this.#config.rendererOptions ?? {}),
    }
    this.renderer = new WebGLRenderer(rendererOptions)
    this.renderer.outputColorSpace = SRGBColorSpace
  }

  #addListeners() {
    if (!(this.#config.size instanceof Object)) {
      window.addEventListener("resize", this.#resizeHandler)
      if (this.#config.size === "parent") {
        this.#resizeObserver = new ResizeObserver(this.#resizeHandler)
        this.#resizeObserver.observe(this.canvas.parentNode)
      }
    }

    this.#intersectionObserver = new IntersectionObserver(
      this.#handleIntersection.bind(this),
      { root: null, rootMargin: "0px", threshold: 0 },
    )
    this.#intersectionObserver.observe(this.canvas)
    document.addEventListener("visibilitychange", this.#visibilityHandler)
  }

  #removeListeners() {
    window.removeEventListener("resize", this.#resizeHandler)
    this.#resizeObserver?.disconnect()
    this.#intersectionObserver?.disconnect()
    document.removeEventListener("visibilitychange", this.#visibilityHandler)
  }

  #handleIntersection(entries) {
    if (this.isDisposed) return
    this.#isIntersecting = entries[0].isIntersecting
    if (this.#isIntersecting) {
      this.#startAnimation()
    } else {
      this.#stopAnimation()
    }
  }

  #handleVisibilityChange() {
    if (this.isDisposed) return
    if (this.#isIntersecting) {
      if (document.hidden) {
        this.#stopAnimation()
      } else {
        this.#startAnimation()
      }
    }
  }

  #scheduleResize() {
    if (this.isDisposed) return
    if (this.#resizeTimeout) clearTimeout(this.#resizeTimeout)
    this.#resizeTimeout = setTimeout(this.resize.bind(this), 100)
  }

  resize() {
    if (this.isDisposed) return
    let width, height
    if (this.#config.size instanceof Object) {
      width = this.#config.size.width
      height = this.#config.size.height
    } else if (this.#config.size === "parent" && this.canvas.parentNode) {
      const bounds = this.canvas.parentNode.getBoundingClientRect()
      width = Number(bounds.width.toFixed(2))
      height = Number(bounds.height.toFixed(2))
    } else {
      width = window.innerWidth
      height = window.innerHeight
    }

    this.size.width = width
    this.size.height = height
    this.size.ratio = width / height
    this.#resizeCamera()
    this.#resizeRenderer()
    this.onAfterResize(this.size)
  }

  #resizeCamera() {
    this.camera.aspect = this.size.width / this.size.height
    if (this.camera.isPerspectiveCamera && this.cameraFov) {
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
        this.#adjustCameraFov(this.cameraMinAspect)
      } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
        this.#adjustCameraFov(this.cameraMaxAspect)
      } else {
        this.camera.fov = this.cameraFov
      }
    }
    this.camera.updateProjectionMatrix()
    this.updateWorldSize()
  }

  #adjustCameraFov(referenceAspect) {
    const halfFovTangent =
      Math.tan(MathUtils.degToRad(this.cameraFov / 2)) /
      (this.camera.aspect / referenceAspect)
    this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(halfFovTangent))
  }

  updateWorldSize() {
    if (this.camera.isPerspectiveCamera) {
      const fovRadians = (this.camera.fov * Math.PI) / 180
      this.size.wHeight =
        2 * Math.tan(fovRadians / 2) * this.camera.position.length()
      this.size.wWidth = this.size.wHeight * this.camera.aspect
    } else if (this.camera.isOrthographicCamera) {
      this.size.wHeight = this.camera.top - this.camera.bottom
      this.size.wWidth = this.camera.right - this.camera.left
    }
  }

  #resizeRenderer() {
    this.renderer.setSize(this.size.width, this.size.height)
    this.#postprocessing?.setSize(this.size.width, this.size.height)

    let pixelRatio = window.devicePixelRatio
    if (this.maxPixelRatio && pixelRatio > this.maxPixelRatio) {
      pixelRatio = this.maxPixelRatio
    } else if (this.minPixelRatio && pixelRatio < this.minPixelRatio) {
      pixelRatio = this.minPixelRatio
    }
    this.renderer.setPixelRatio(pixelRatio)
    this.size.pixelRatio = pixelRatio
  }

  get postprocessing() {
    return this.#postprocessing
  }

  set postprocessing(postprocessing) {
    this.#postprocessing = postprocessing
    this.render = postprocessing.render
  }

  #startAnimation() {
    if (this.#isAnimating || this.isDisposed) return
    const animate = () => {
      if (this.isDisposed) return
      this.#animationFrameId = requestAnimationFrame(animate)
      this.#time.delta = this.#clock.getDelta()
      this.#time.elapsed += this.#time.delta
      this.onBeforeRender(this.#time)
      this.render()
      this.onAfterRender(this.#time)
    }
    this.#isAnimating = true
    this.#clock.start()
    animate()
  }

  #stopAnimation() {
    if (this.#isAnimating) {
      cancelAnimationFrame(this.#animationFrameId)
      this.#isAnimating = false
      this.#clock.stop()
    }
  }

  #renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    if (this.isDisposed) return
    this.isDisposed = true
    clearTimeout(this.#resizeTimeout)
    this.#removeListeners()
    this.#stopAnimation()
    this.scene.traverse((object) => {
      if (object.isMesh && typeof object.material === "object") {
        Object.keys(object.material).forEach((key) => {
          const resource = object.material[key]
          if (
            resource !== null &&
            typeof resource === "object" &&
            typeof resource.dispose === "function"
          ) {
            resource.dispose()
          }
        })
        object.material.dispose()
        object.geometry.dispose()
      }
    })
    this.scene.clear()
    this.renderer.dispose()
  }
}

// 所有画布共用一组指针事件监听器，最后一个订阅释放时移除监听器。
const pointerTrackers = new Map()
const pointerPosition = new Vector2()
let pointerListenersAttached = false

function createPointerTracker(options) {
  const tracker = {
    position: new Vector2(),
    // 画布内的归一化坐标：左上角为 (-1, 1)，右下角为 (1, -1)。
    nPosition: new Vector2(),
    hover: false,
    onEnter() {},
    onMove() {},
    onClick() {},
    onLeave() {},
    ...options,
  }

  if (!pointerTrackers.has(options.domElement)) {
    pointerTrackers.set(options.domElement, tracker)
    if (!pointerListenersAttached) {
      document.body.addEventListener("pointermove", handlePointerMove)
      document.body.addEventListener("pointerleave", handlePointerLeave)
      document.body.addEventListener("click", handlePointerClick)
      pointerListenersAttached = true
    }
  }

  tracker.dispose = () => {
    pointerTrackers.delete(options.domElement)
    if (pointerTrackers.size === 0) {
      document.body.removeEventListener("pointermove", handlePointerMove)
      document.body.removeEventListener("pointerleave", handlePointerLeave)
      document.body.removeEventListener("click", handlePointerClick)
      pointerListenersAttached = false
    }
  }
  return tracker
}

function handlePointerMove(event) {
  pointerPosition.x = event.clientX
  pointerPosition.y = event.clientY
  for (const [element, tracker] of pointerTrackers) {
    const bounds = element.getBoundingClientRect()
    if (isPointerInside(bounds)) {
      updatePointerPosition(tracker, bounds)
      if (!tracker.hover) {
        tracker.hover = true
        tracker.onEnter(tracker)
      }
      tracker.onMove(tracker)
    } else if (tracker.hover) {
      tracker.hover = false
      tracker.onLeave(tracker)
    }
  }
}

function handlePointerClick(event) {
  pointerPosition.x = event.clientX
  pointerPosition.y = event.clientY
  for (const [element, tracker] of pointerTrackers) {
    const bounds = element.getBoundingClientRect()
    updatePointerPosition(tracker, bounds)
    if (isPointerInside(bounds)) tracker.onClick(tracker)
  }
}

function handlePointerLeave() {
  for (const tracker of pointerTrackers.values()) {
    if (tracker.hover) {
      tracker.hover = false
      tracker.onLeave(tracker)
    }
  }
}

function updatePointerPosition(tracker, bounds) {
  const { position, nPosition } = tracker
  position.x = pointerPosition.x - bounds.left
  position.y = pointerPosition.y - bounds.top
  nPosition.x = (position.x / bounds.width) * 2 - 1
  nPosition.y = (-position.y / bounds.height) * 2 + 1
}

function isPointerInside(bounds) {
  const { x, y } = pointerPosition
  const { left, top, width, height } = bounds
  return x >= left && x <= left + width && y >= top && y <= top + height
}

function createColorGradient(initialColors) {
  let colorStops, parsedColors
  setColors(initialColors)
  return { setColors, getColorAt }

  function setColors(colors) {
    colorStops = colors
    parsedColors = []
    colorStops.forEach((color) => {
      parsedColors.push(new Color(color))
    })
  }

  function getColorAt(progress, target = new Color()) {
    const scaledProgress =
      Math.max(0, Math.min(1, progress)) * (colorStops.length - 1)
    const startIndex = Math.floor(scaledProgress)
    const startColor = parsedColors[startIndex]
    if (startIndex >= colorStops.length - 1) return startColor.clone()

    const blend = scaledProgress - startIndex
    const endColor = parsedColors[startIndex + 1]
    target.r = startColor.r + blend * (endColor.r - startColor.r)
    target.g = startColor.g + blend * (endColor.g - startColor.g)
    target.b = startColor.b + blend * (endColor.b - startColor.b)
    return target
  }
}

// 三维周期单纯形噪声，返回噪声值和梯度。
const BOKEH_VERTEX_PREFIX = `
vec4 permute(vec4 x) {
  vec4 xm = mod(x, 289.0);
  return mod(((xm * 34.0) + 10.0) * xm, 289.0);
}

float psrdnoise(vec3 x, vec3 period, float alpha, out vec3 gradient) {
#ifndef PERLINGRID
  const mat3 M = mat3(0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0);
  const mat3 Mi = mat3(-0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5);
#endif
  vec3 uvw;
#ifndef PERLINGRID
  uvw = M * x;
#else
  uvw = x + dot(x, vec3(1.0 / 3.0));
#endif
  vec3 i0 = floor(uvw);
  vec3 f0 = fract(uvw);
  vec3 g_ = step(f0.xyx, f0.yzz);
  vec3 l_ = 1.0 - g_;
  vec3 g = vec3(l_.z, g_.xy);
  vec3 l = vec3(l_.xy, g_.z);
  vec3 o1 = min(g, l);
  vec3 o2 = max(g, l);
  vec3 i1 = i0 + o1;
  vec3 i2 = i0 + o2;
  vec3 i3 = i0 + vec3(1.0);
  vec3 v0, v1, v2, v3;
#ifndef PERLINGRID
  v0 = Mi * i0;
  v1 = Mi * i1;
  v2 = Mi * i2;
  v3 = Mi * i3;
#else
  v0 = i0 - dot(i0, vec3(1.0 / 6.0));
  v1 = i1 - dot(i1, vec3(1.0 / 6.0));
  v2 = i2 - dot(i2, vec3(1.0 / 6.0));
  v3 = i3 - dot(i3, vec3(1.0 / 6.0));
#endif
  vec3 x0 = x - v0;
  vec3 x1 = x - v1;
  vec3 x2 = x - v2;
  vec3 x3 = x - v3;
  if (any(greaterThan(period, vec3(0.0)))) {
    vec4 vx = vec4(v0.x, v1.x, v2.x, v3.x);
    vec4 vy = vec4(v0.y, v1.y, v2.y, v3.y);
    vec4 vz = vec4(v0.z, v1.z, v2.z, v3.z);
    if (period.x > 0.0) vx = mod(vx, period.x);
    if (period.y > 0.0) vy = mod(vy, period.y);
    if (period.z > 0.0) vz = mod(vz, period.z);
#ifndef PERLINGRID
    i0 = M * vec3(vx.x, vy.x, vz.x);
    i1 = M * vec3(vx.y, vy.y, vz.y);
    i2 = M * vec3(vx.z, vy.z, vz.z);
    i3 = M * vec3(vx.w, vy.w, vz.w);
#else
    v0 = vec3(vx.x, vy.x, vz.x);
    v1 = vec3(vx.y, vy.y, vz.y);
    v2 = vec3(vx.z, vy.z, vz.z);
    v3 = vec3(vx.w, vy.w, vz.w);
    i0 = v0 + dot(v0, vec3(1.0 / 3.0));
    i1 = v1 + dot(v1, vec3(1.0 / 3.0));
    i2 = v2 + dot(v2, vec3(1.0 / 3.0));
    i3 = v3 + dot(v3, vec3(1.0 / 3.0));
#endif
    i0 = floor(i0 + 0.5);
    i1 = floor(i1 + 0.5);
    i2 = floor(i2 + 0.5);
    i3 = floor(i3 + 0.5);
  }
  vec4 hash = permute(
    permute(
      permute(vec4(i0.z, i1.z, i2.z, i3.z)) + vec4(i0.y, i1.y, i2.y, i3.y)
    ) + vec4(i0.x, i1.x, i2.x, i3.x)
  );
  vec4 theta = hash * 3.883222077;
  vec4 sz = hash * -0.006920415 + 0.996539792;
  vec4 psi = hash * 0.108705628;
  vec4 Ct = cos(theta);
  vec4 St = sin(theta);
  vec4 sz_prime = sqrt(1.0 - sz * sz);
  vec4 gx, gy, gz;
#ifdef FASTROTATION
  vec4 qx = St;
  vec4 qy = -Ct;
  vec4 qz = vec4(0.0);
  vec4 px = sz * qy;
  vec4 py = -sz * qx;
  vec4 pz = sz_prime;
  psi += alpha;
  vec4 Sa = sin(psi);
  vec4 Ca = cos(psi);
  gx = Ca * px + Sa * qx;
  gy = Ca * py + Sa * qy;
  gz = Ca * pz + Sa * qz;
#else
  if (alpha != 0.0) {
    vec4 Sp = sin(psi);
    vec4 Cp = cos(psi);
    vec4 px = Ct * sz_prime;
    vec4 py = St * sz_prime;
    vec4 pz = sz;
    vec4 Ctp = St * Sp - Ct * Cp;
    vec4 qx = mix(Ctp * St, Sp, sz);
    vec4 qy = mix(-Ctp * Ct, Cp, sz);
    vec4 qz = -(py * Cp + px * Sp);
    vec4 Sa = vec4(sin(alpha));
    vec4 Ca = vec4(cos(alpha));
    gx = Ca * px + Sa * qx;
    gy = Ca * py + Sa * qy;
    gz = Ca * pz + Sa * qz;
  } else {
    gx = Ct * sz_prime;
    gy = St * sz_prime;
    gz = sz;
  }
#endif
  vec3 g0 = vec3(gx.x, gy.x, gz.x);
  vec3 g1 = vec3(gx.y, gy.y, gz.y);
  vec3 g2 = vec3(gx.z, gy.z, gz.z);
  vec3 g3 = vec3(gx.w, gy.w, gz.w);
  vec4 w = 0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3));
  w = max(w, 0.0);
  vec4 w2 = w * w;
  vec4 w3 = w2 * w;
  vec4 gdotx = vec4(dot(g0, x0), dot(g1, x1), dot(g2, x2), dot(g3, x3));
  float n = dot(w3, gdotx);
  vec4 dw = -6.0 * w2 * gdotx;
  vec3 dn0 = w3.x * g0 + dw.x * x0;
  vec3 dn1 = w3.y * g1 + dw.y * x1;
  vec3 dn2 = w3.z * g2 + dw.z * x2;
  vec3 dn3 = w3.w * g3 + dw.w * x3;
  gradient = 39.5 * (dn0 + dn1 + dn2 + dn3);
  return 39.5 * n;
}

uniform vec2 uRatio;
uniform float uFocalLength;
uniform float uFocusDistance;
uniform float uMinScale;
uniform float uMaxScale;
uniform float uTime;
uniform float uNoiseCoordScale;
uniform float uNoiseDisplacementScale;
varying float vBokeh;
`

const BOKEH_PROJECT_VERTEX = `
vec4 mvPosition = vec4(0.0, 0.0, 0.0, 1.0);
mvPosition = instanceMatrix * mvPosition;
vec3 grad;
psrdnoise(mvPosition.xyz * uNoiseCoordScale, vec3(0), uTime * 0.5, grad);
grad *= uNoiseCoordScale;
mvPosition.xyz += grad * uNoiseDisplacementScale;
float d = length(mvPosition.xyz - cameraPosition);
vBokeh = smoothstep(0.0, uFocalLength, abs(d - uFocusDistance));
float scale = uMinScale + uMaxScale * vBokeh;
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;
gl_Position.xy += transformed.xy * uRatio * scale * instanceMatrix[0][0];
`

const BOKEH_FRAGMENT_PREFIX = `
uniform float uBlurLevel;
varying float vBokeh;
`

// 在纵向模糊图集中对相邻两级纹理采样并插值。
const BOKEH_MAP_FRAGMENT = `
#ifdef USE_MAP
vec2 uv = vMapUv;
uv.y /= 8.0;
float blurLevel = uBlurLevel * vBokeh;
float uvY = floor(blurLevel);
float uvYFract = fract(blurLevel);
uv.y += 0.125 * uvY;
vec4 tex1 = texture2D(map, uv);
uv.y += 0.125;
vec4 tex2 = texture2D(map, uv);
vec4 sampledDiffuseColor = mix(tex1, tex2, uvYFract);
diffuseColor *= sampledDiffuseColor;
#else
diffuseColor.a = 0.0;
#endif
`

const { randFloatSpread } = MathUtils
const DEFAULT_PARTICLE_CONFIG = { count: 1024, size: 0.5, colors: [0] }

class BokehParticles extends InstancedMesh {
  constructor(options) {
    const config = { ...DEFAULT_PARTICLE_CONFIG, ...options }
    const geometry = new PlaneGeometry(config.size, config.size)
    const material = new MeshBasicMaterial({
      blending: AdditiveBlending,
      opacity: 0.5,
      depthWrite: false,
    })
    const uniforms = {
      uRatio: { value: new Vector2(1, 1) },
      uBlurLevel: { value: 4 },
      uFocalLength: { value: 1 },
      uFocusDistance: { value: 1 },
      uMinScale: { value: 0.1 },
      uMaxScale: { value: 1.4 },
      uTime: { value: 0 },
      uTimeScale: { value: 1 },
      uNoiseCoordScale: { value: 3 },
      uNoiseDisplacementScale: { value: 0.005 },
    }

    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms)
      shader.vertexShader = BOKEH_VERTEX_PREFIX + shader.vertexShader
      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        BOKEH_PROJECT_VERTEX,
      )
      shader.fragmentShader = BOKEH_FRAGMENT_PREFIX + shader.fragmentShader
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <map_fragment>",
        BOKEH_MAP_FRAGMENT,
      )
    }

    super(geometry, material, config.count)
    this.config = config
    this.uniforms = uniforms
    // 保留原有属性名；复用临时对象生成每个实例的变换矩阵。
    this.dummyO = new Object3D()
    this.#initializeInstances()
  }

  #initializeInstances() {
    for (let index = 0; index < this.count; index++) {
      this.dummyO.position.set(
        randFloatSpread(2),
        randFloatSpread(2),
        randFloatSpread(1.7),
      )
      this.dummyO.scale.set(1, 1, 1).multiplyScalar(MathUtils.randFloat(0.5, 1))
      this.dummyO.updateMatrix()
      this.setMatrixAt(index, this.dummyO.matrix)
    }
    this.#updateColors()
  }

  #updateColors() {
    const gradient = createColorGradient(this.config.colors)
    for (let index = 0; index < this.count; index++) {
      this.setColorAt(index, gradient.getColorAt(Math.random()))
    }
    this.instanceColor.needsUpdate = true
  }

  setColors(colors) {
    this.config.colors = colors
    this.#updateColors()
  }

  update(time) {
    this.uniforms.uTime.value += time.delta * this.uniforms.uTimeScale.value
  }

  setSize(width, height) {
    if (width > height) {
      this.uniforms.uRatio.value.set(1, width / height)
    } else {
      this.uniforms.uRatio.value.set(height / width, 1)
    }
  }
}

// 第二个参数在原代码中未使用，保留参数位置以兼容原接口。
function Bokeh1Background(canvas, options) {
  const three = new ThreeScene({ canvas, size: "parent" })
  three.cameraMaxAspect = 1.7
  three.camera.position.z = 1
  three.updateWorldSize()

  const particles = new BokehParticles()
  particles.setSize(three.size.width, three.size.height)
  three.scene.add(particles)

  const targetPosition = new Vector3()
  const pointer = createPointerTracker({ domElement: canvas })
  pointer.onMove = () => {
    targetPosition.x = 0.1 * -pointer.nPosition.x
    targetPosition.y = 0.1 * -pointer.nPosition.y
  }
  three.onBeforeRender = (time) => {
    particles.position.lerp(targetPosition, 0.05)
    particles.update(time)
  }
  three.onAfterResize = (size) => {
    particles.setSize(size.width, size.height)
  }

  return {
    three,
    particles,
    bindMap: function (texture) {
      texture.flipY = false
      particles.material.map = texture
      particles.material.needsUpdate = true
    },
    setBackgroundColor(color) {
      three.scene.background = new Color(color)
    },
    setColors: particles.setColors.bind(particles),
    dispose() {
      three.dispose()
      pointer.dispose()
    },
  }
}

export { Bokeh1Background }
