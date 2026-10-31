import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle, Vec3 } from "ogl";

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform float uNoiseStrength;
uniform float uMode;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

vec3 vibranceBoost(vec3 c, float amount) {
  float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
  float maxC = max(c.r, max(c.g, c.b));
  float minC = min(c.r, min(c.g, c.b));
  float sat = (maxC > 0.001) ? (maxC - minC) / maxC : 0.0;
  float boost = amount * (1.0 - sat);
  return mix(vec3(luma), c, 1.0 + boost);
}

void main() {
  vec2 uv = vUv;
  float time = uTime * 0.2;
  vec3 color = vec3(0.0);

  if (uMode < 0.5) {
    float noiseScale = 1.5;
    float warpStrength = 0.2;
    float moveScale = 0.1;
    float falloff = 0.1;

    float n = snoise(vec2(uv.x * noiseScale + time, uv.y * noiseScale - time));
    vec2 warpedUv = uv + vec2(n * warpStrength);

    vec2 p0 = vec2(0.5, 0.5);
    vec2 p1 = vec2(0.2, 0.2) + vec2(sin(time * 0.5) * moveScale, cos(time * 0.6) * moveScale);
    vec2 p2 = vec2(0.8, 0.2) + vec2(cos(time * 0.7) * moveScale, sin(time * 0.4) * moveScale);
    vec2 p3 = vec2(0.2, 0.8) + vec2(sin(time * 0.3) * moveScale, cos(time * 0.5) * moveScale);
    vec2 p4 = vec2(0.8, 0.8) + vec2(cos(time * 0.4) * moveScale, sin(time * 0.6) * moveScale);

    float w0 = 1.0 / (length(warpedUv - p0) * length(warpedUv - p0) + falloff);
    float w1 = 1.0 / (length(warpedUv - p1) * length(warpedUv - p1) + falloff);
    float w2 = 1.0 / (length(warpedUv - p2) * length(warpedUv - p2) + falloff);
    float w3 = 1.0 / (length(warpedUv - p3) * length(warpedUv - p3) + falloff);
    float w4 = 1.0 / (length(warpedUv - p4) * length(warpedUv - p4) + falloff);

    float total = w0 + w1 + w2 + w3 + w4;
    color = (uColor1 * w0 + uColor2 * w1 + uColor3 * w2 + uColor4 * w3 + uColor5 * w4) / total;
  } else {
    float fbm = snoise(vec2(uv.x * 1.2 + time * 0.1, uv.y * 0.5)) * 0.5
      + snoise(vec2(uv.x * 2.5 - time * 0.15, uv.y * 0.8 + time * 0.05)) * 0.25
      + snoise(vec2(uv.x * 5.0 + time * 0.08, uv.y * 1.5)) * 0.125;

    float dy = uv.y + fbm * 0.15;
    float band1 = smoothstep(0.0, 0.35, dy) * smoothstep(0.65, 0.25, dy);
    float band2 = smoothstep(0.15, 0.50, dy) * smoothstep(0.80, 0.40, dy);
    float band3 = smoothstep(0.30, 0.60, dy) * smoothstep(0.90, 0.55, dy);
    float band4 = smoothstep(0.45, 0.70, dy) * smoothstep(1.0, 0.65, dy);

    float shimmer = snoise(vec2(uv.x * 3.0 + time * 0.4, uv.y * 1.5 - time * 0.1)) * 0.5 + 0.5;
    shimmer = shimmer * 0.6 + 0.4;

    float moveScale = 0.2;
    float falloff = 0.3;
    vec2 wUv = uv + vec2(fbm * 0.1);
    vec2 p0 = vec2(0.5, 0.5);
    vec2 p1 = vec2(0.2, 0.3) + vec2(sin(time * 0.3) * moveScale, cos(time * 0.4) * moveScale);
    vec2 p2 = vec2(0.8, 0.3) + vec2(cos(time * 0.5) * moveScale, sin(time * 0.3) * moveScale);
    vec2 p3 = vec2(0.2, 0.7) + vec2(sin(time * 0.2) * moveScale, cos(time * 0.3) * moveScale);
    vec2 p4 = vec2(0.8, 0.7) + vec2(cos(time * 0.3) * moveScale, sin(time * 0.4) * moveScale);

    float bw0 = 1.0 / (length(wUv - p0) * length(wUv - p0) + falloff);
    float bw1 = 1.0 / (length(wUv - p1) * length(wUv - p1) + falloff);
    float bw2 = 1.0 / (length(wUv - p2) * length(wUv - p2) + falloff);
    float bw3 = 1.0 / (length(wUv - p3) * length(wUv - p3) + falloff);
    float bw4 = 1.0 / (length(wUv - p4) * length(wUv - p4) + falloff);
    float bTotal = bw0 + bw1 + bw2 + bw3 + bw4;
    vec3 baseGrad = (uColor1 * bw0 + uColor2 * bw1 + uColor3 * bw2 + uColor4 * bw3 + uColor5 * bw4) / bTotal;

    vec3 auroraGlow = vec3(0.0);
    auroraGlow += uColor2 * band1 * shimmer * 0.6;
    auroraGlow += uColor3 * band2 * shimmer * 0.5;
    auroraGlow += uColor4 * band3 * shimmer * 0.45;
    auroraGlow += uColor5 * band4 * shimmer * 0.4;

    float vFade = smoothstep(0.0, 0.25, uv.y) * smoothstep(1.0, 0.75, uv.y);
    color = baseGrad * 0.6 + auroraGlow * vFade + baseGrad * auroraGlow * 0.5;
  }

  color = vibranceBoost(color, 0.3);

  float ign = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * uNoiseStrength;
  color += (ign - 0.5) / 255.0;

  gl_FragColor = vec4(color, 1.0);
}
`;

const GRADIENT_PRESETS = {
  hero: {
    colors: [
      new Vec3(1.0, 1.0, 1.0),
      new Vec3(1.0, 1.0, 1.0),
      new Vec3(0.02, 0.58, 0.89),
      new Vec3(0.565, 0.937, 0.702),
      new Vec3(0.82, 0.98, 0.898),
    ],
    mode: 0,
    noise: 0.09,
  },
  footer: {
    colors: [
      new Vec3(0.008, 0.024, 0.09),
      new Vec3(0.059, 0.09, 0.165),
      new Vec3(0.333, 0.969, 0.408),
      new Vec3(0.318, 0.282, 0.925),
      new Vec3(0.133, 0.827, 0.933),
    ],
    mode: 1,
    noise: 0.11,
  },
};

type GradientCanvasProps = {
  className?: string;
  variant?: keyof typeof GRADIENT_PRESETS;
};

export function GradientCanvas({ className = "", variant = "hero" }: GradientCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const preset = GRADIENT_PRESETS[variant];

    const renderer = new Renderer({
      alpha: false,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    const gl = renderer.gl;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: preset.colors[0] },
        uColor2: { value: preset.colors[1] },
        uColor3: { value: preset.colors[2] },
        uColor4: { value: preset.colors[3] },
        uColor5: { value: preset.colors[4] },
        uNoiseStrength: { value: preset.noise },
        uMode: { value: preset.mode },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", resize);
    resize();

    let animationFrame = 0;
    let time = 0;
    const update = () => {
      animationFrame = requestAnimationFrame(update);
      time += 0.02;
      program.uniforms.uTime.value = time;
      renderer.render({ scene: mesh });
    };
    animationFrame = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [variant]);

  return <div ref={containerRef} className={`absolute inset-0 h-full w-full ${className}`} />;
}
