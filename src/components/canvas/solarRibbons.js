import * as THREE from 'three'

// 固定种子让热更新、刷新和截图保留同一组日冕分布。
export const createSolarRibbons = (kind, count, segments) => {
  let seed = kind === 'loops' ? 7341 : 9287
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
  const direction = () => {
    const z = random() * 2 - 1
    const angle = random() * Math.PI * 2
    const radius = Math.sqrt(1 - z * z)
    return new THREE.Vector3(radius * Math.cos(angle), radius * Math.sin(angle), z)
  }
  const vertices = count * segments * 2
  const positions = new Float32Array(vertices * 3)
  const starts = new Float32Array(vertices * 3)
  const ends = new Float32Array(vertices * 3)
  const seeds = new Float32Array(vertices * 4)
  const indices = new Uint16Array(count * (segments - 1) * 6)
  let root = direction()
  let tip = direction()
  let phase = random()
  let speed = random()
  let index = 0

  for (let strand = 0; strand < count; strand++) {
    if (strand === 0 || random() < (kind === 'loops' ? .025 : .1)) {
      root = direction()
      tip = root.clone().addScaledVector(direction(), .4).normalize()
      phase = random()
      speed = random()
    }
    const start = root.clone().addScaledVector(direction(), kind === 'loops' ? .02 : .025).normalize()
    const end = tip.clone().addScaledVector(direction(), .075).normalize()
    const strandSeed = [phase, speed, random(), random()]
    for (let step = 0; step < segments; step++) {
      const base = (strand * segments + step) * 2
      for (let side = 0; side < 2; side++) {
        const vertex = base + side
        positions.set([(step + .5) / segments, 0, side * 2 - 1], vertex * 3)
        start.toArray(starts, vertex * 3)
        end.toArray(ends, vertex * 3)
        seeds.set(strandSeed, vertex * 4)
      }
      if (step < segments - 1) {
        indices.set([base, base + 1, base + 2, base + 2, base + 1, base + 3], index)
        index += 6
      }
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aStart', new THREE.BufferAttribute(starts, 3))
  geometry.setAttribute('aEnd', new THREE.BufferAttribute(ends, 3))
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 4))
  geometry.setIndex(new THREE.BufferAttribute(indices, 1))
  return geometry
}
