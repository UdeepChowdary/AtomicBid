import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ─────────────────────────────────────────────
   GLSL: Round glowing particles
───────────────────────────────────────────── */
const PARTICLE_VERT = /* glsl */ `
  attribute float aSize;
  attribute vec3  aColor;
  attribute float aSpeed;
  attribute float aPhase;

  uniform float uTime;

  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    vec3 pos = position;
    /* gentle drift using unique phase per particle */
    pos.x += sin(uTime * aSpeed * 0.6 + aPhase)       * 0.4;
    pos.y += cos(uTime * aSpeed * 0.5 + aPhase * 1.3) * 0.35;
    pos.z += sin(uTime * aSpeed * 0.4 + aPhase * 0.7) * 0.25;

    vec4 mvPos  = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (350.0 / -mvPos.z);
    gl_Position  = projectionMatrix * mvPos;

    /* fade particles in the distance */
    vAlpha = smoothstep(-60.0, 0.0, mvPos.z);
  }
`;

const PARTICLE_FRAG = /* glsl */ `
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vec2  coord = gl_PointCoord - vec2(0.5);
    float d     = length(coord);
    if (d > 0.5) discard;

    /* outer glow ring + bright core */
    float core  = smoothstep(0.18, 0.0, d);
    float glow  = smoothstep(0.5,  0.0, d);
    float alpha = mix(glow * 0.35, 1.0, core * 0.9);

    gl_FragColor = vec4(vColor, alpha * vAlpha * 0.8);
  }
`;

/* ─────────────────────────────────────────────
   GLSL: Fluid wave mesh (aurora backdrop)
───────────────────────────────────────────── */
const WAVE_VERT = /* glsl */ `
  uniform float uTime;

  varying vec2  vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    /* multi-frequency wave → organic fluid look */
    float e  = sin(pos.x * 0.55 + uTime * 0.38) * cos(pos.y * 0.45 + uTime * 0.28) * 2.2;
          e += cos(pos.x * 0.28 + uTime * 0.22) * sin(pos.y * 0.70 + uTime * 0.44) * 1.4;
          e += sin(pos.x * 0.80 + uTime * 0.55) * sin(pos.y * 0.30 + uTime * 0.18) * 0.8;

    pos.z    += e;
    vElevation = e;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const WAVE_FRAG = /* glsl */ `
  uniform float uTime;

  varying vec2  vUv;
  varying float vElevation;

  void main() {
    /* three-way color aurora blend */
    vec3 cViolet = vec3(0.46, 0.14, 0.92);
    vec3 cIndigo = vec3(0.22, 0.28, 0.90);
    vec3 cGold   = vec3(0.96, 0.62, 0.04);
    vec3 cCyan   = vec3(0.02, 0.70, 0.85);

    float t1 = vUv.x + sin(uTime * 0.25 + vUv.y * 2.5) * 0.12;
    float t2 = vUv.y + cos(uTime * 0.18 + vUv.x * 1.8) * 0.10;

    vec3 color = mix(cViolet, cIndigo, t1);
    color = mix(color, cCyan,   t2 * 0.5);
    color = mix(color, cGold,   (1.0 - t1) * t2 * 0.3);

    /* opacity tied to elevation so only crests glow */
    float alpha = (vElevation + 4.0) / 8.0;
    alpha = clamp(alpha, 0.0, 1.0) * 0.055;

    gl_FragColor = vec4(color, alpha);
  }
`;

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const ThreeBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        /* ── Renderer ── */
        const W = mount.clientWidth;
        const H = mount.clientHeight;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        /* ── Scene / Camera ── */
        const scene  = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 300);
        camera.position.z = 28;

        /* ── Wave Mesh ── */
        const waveGeo = new THREE.PlaneGeometry(90, 70, 80, 60);
        const waveMat = new THREE.ShaderMaterial({
            vertexShader:   WAVE_VERT,
            fragmentShader: WAVE_FRAG,
            uniforms: { uTime: { value: 0 } },
            transparent: true,
            side:        THREE.DoubleSide,
            depthWrite:  false,
        });
        const waveMesh = new THREE.Mesh(waveGeo, waveMat);
        waveMesh.position.z = -18;
        scene.add(waveMesh);

        /* ── Particles ── */
        const COUNT = 700;
        const positions = new Float32Array(COUNT * 3);
        const aColors   = new Float32Array(COUNT * 3);
        const aSizes    = new Float32Array(COUNT);
        const aSpeeds   = new Float32Array(COUNT);
        const aPhases   = new Float32Array(COUNT);

        /* refined palette — fewer, richer colors */
        const PALETTE = [
            [0.46, 0.18, 0.92], // deep violet
            [0.62, 0.28, 0.98], // light violet
            [0.20, 0.35, 0.95], // indigo-blue
            [0.96, 0.72, 0.10], // warm gold
            [0.02, 0.72, 0.88], // cyan
        ];

        for (let i = 0; i < COUNT; i++) {
            /* cluster particles closer to center for depth */
            const spread = i < COUNT * 0.6 ? 1.0 : 1.8;
            positions[i * 3]     = (Math.random() - 0.5) * 90 * spread;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 70 * spread;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50 * spread;

            const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
            aColors[i * 3]     = c[0];
            aColors[i * 3 + 1] = c[1];
            aColors[i * 3 + 2] = c[2];

            /* smaller range → more cohesive look */
            aSizes[i]  = Math.random() * 1.8 + 0.6;
            aSpeeds[i] = Math.random() * 0.7 + 0.2;
            aPhases[i] = Math.random() * Math.PI * 2;
        }

        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        pGeo.setAttribute('aColor',   new THREE.BufferAttribute(aColors,   3));
        pGeo.setAttribute('aSize',    new THREE.BufferAttribute(aSizes,    1));
        pGeo.setAttribute('aSpeed',   new THREE.BufferAttribute(aSpeeds,   1));
        pGeo.setAttribute('aPhase',   new THREE.BufferAttribute(aPhases,   1));

        const pMat = new THREE.ShaderMaterial({
            vertexShader:   PARTICLE_VERT,
            fragmentShader: PARTICLE_FRAG,
            uniforms:       { uTime: { value: 0 } },
            transparent:    true,
            blending:       THREE.AdditiveBlending,
            depthWrite:     false,
        });

        const particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

        /* ── Mouse parallax ── */
        let mX = 0, mY = 0;
        const onMouse = (e) => {
            mX = (e.clientX / window.innerWidth  - 0.5) * 2;
            mY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouse);

        /* ── Resize ── */
        const onResize = () => {
            const nW = mount.clientWidth;
            const nH = mount.clientHeight;
            camera.aspect = nW / nH;
            camera.updateProjectionMatrix();
            renderer.setSize(nW, nH);
        };
        window.addEventListener('resize', onResize);

        /* ── Animation ── */
        let rafId;
        let t = 0;

        const animate = () => {
            rafId = requestAnimationFrame(animate);
            t += 0.007;

            /* update shader uniforms */
            pMat.uniforms.uTime.value   = t;
            waveMat.uniforms.uTime.value = t;

            /* very slow passive rotation */
            particles.rotation.y = t * 0.018;
            particles.rotation.x = Math.sin(t * 0.008) * 0.05;

            /* smooth camera parallax */
            camera.position.x += (mX * 2.5 - camera.position.x) * 0.035;
            camera.position.y += (-mY * 1.8 - camera.position.y) * 0.035;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', onMouse);
            window.removeEventListener('resize', onResize);
            mount.removeChild(renderer.domElement);
            renderer.dispose();
            pGeo.dispose();
            pMat.dispose();
            waveGeo.dispose();
            waveMat.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        />
    );
};

export default ThreeBackground;
