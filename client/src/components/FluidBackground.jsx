/**
 * FluidBackground.jsx
 * CSS-powered fluid blobs + grain texture overlay.
 * These live BELOW the Three.js canvas (zIndex: 1)
 * and give the "liquid gradient" premium look.
 */
const FluidBackground = () => (
    <>
        {/* ── Large morphing blobs ── */}
        <div className="fluid-layer" aria-hidden="true">
            <div className="fluid-blob blob-violet" />
            <div className="fluid-blob blob-gold"   />
            <div className="fluid-blob blob-cyan"   />
            <div className="fluid-blob blob-indigo" />
        </div>

        {/* ── Film grain overlay ── */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* ── Dot grid ── */}
        <div className="dot-grid-overlay" aria-hidden="true" />
    </>
);

export default FluidBackground;
