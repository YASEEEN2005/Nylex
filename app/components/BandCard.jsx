"use client";

import * as THREE from "three";
import { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

// Extend Three.js catalog for React Three Fiber tags
extend({
  MeshLineGeometry,
  MeshLineMaterial,
});

const GLTF_PATH = "/assets/cards.glb";

// Preload the GLTF card model
useGLTF.preload(GLTF_PATH);

export default function BandCard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <Canvas
          gl={{
            alpha: true,
            antialias: true,
          }}
          dpr={[1, 2]}
          camera={{
            position: isMobile ? [0, 0, 15] : [0, 0, 13],
            fov: isMobile ? 32 : 25,
          }}
          style={{
            background: "transparent",
            width: "100%",
            height: "100%",
            pointerEvents: "auto",
            touchAction: "none",
          }}
        >
          <ambientLight intensity={1.5} />

          <Physics
            interpolate
            gravity={[0, -25, 0]}
            timeStep={1 / 60}
          >
            <Band isMobile={isMobile} />
          </Physics>

          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      </Suspense>
    </div>
  );
}

function Band({ isMobile, maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef(null);

  const fixed = useRef(null);
  const j1 = useRef(null);
  const j2 = useRef(null);
  const j3 = useRef(null);
  const card = useRef(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const gltf = useGLTF(GLTF_PATH);
  const nodes = gltf?.nodes || {};
  const materials = gltf?.materials || {};

  // Custom canvas textures loaded dynamically to insert Nylex details & "NY" logo
  const [strapTexture, setStrapTexture] = useState(null);
  const [cardFaceTexture, setCardFaceTexture] = useState(null);

  useEffect(() => {
    // Load custom logo image asynchronously first
    const logoImg = new Image();
    logoImg.src = "/N logo.png";

    logoImg.onload = () => {
      drawCanvas(logoImg);
    };

    logoImg.onerror = () => {
      console.warn("Logo image failed to load, fallback to text logo");
      drawCanvas(null);
    };

    function drawCanvas(img) {
      // 1. Generate Lanyard Strap Texture (repeating text)
      const strapCanvas = document.createElement("canvas");
      strapCanvas.width = 1024;
      strapCanvas.height = 64;
      const sCtx = strapCanvas.getContext("2d");

      sCtx.fillStyle = "#09090b"; // zinc-950
      sCtx.fillRect(0, 0, 1024, 64);

      sCtx.font = "bold 20px sans-serif";
      sCtx.textBaseline = "middle";

      for (let offset = 0; offset < 1024; offset += 340) {
        sCtx.fillStyle = "#8b5e3c"; // gold
        sCtx.fillText("✦  NYLEX STUDIO  ", offset, 32);
        sCtx.fillStyle = "#ffffff";
        sCtx.fillText("✦  CREATIVE AGENCY", offset + 170, 32);
      }

      const sTex = new THREE.CanvasTexture(strapCanvas);
      sTex.wrapS = THREE.RepeatWrapping;
      sTex.wrapT = THREE.RepeatWrapping;
      sTex.repeat.set(-4, 1);
      sTex.flipY = false; // Prevent upside down lanyard textures
      setStrapTexture(sTex);

      // 2. Generate Card Face Texture
      // Using 1280x1500 matching prince.png dimensions exactly
      const faceCanvas = document.createElement("canvas");
      faceCanvas.width = 1280;
      faceCanvas.height = 1500;
      const fCtx = faceCanvas.getContext("2d");

      // Dark base
      fCtx.fillStyle = "#09090b";
      fCtx.fillRect(0, 0, 1280, 1500);

      // Carbon-like background grid lines
      fCtx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      fCtx.lineWidth = 2;
      for (let i = 0; i < 1500; i += 40) {
        fCtx.beginPath();
        fCtx.moveTo(i, 0);
        fCtx.lineTo(i, 1500);
        fCtx.stroke();
        fCtx.beginPath();
        fCtx.moveTo(0, i);
        fCtx.lineTo(1500, i);
        fCtx.stroke();
      }

      // Draw Front side content centered at x = 320
      drawCardSide(fCtx, img, 320);

      // Draw Back side content centered at x = 960 (for clean card rotation visual)
      drawCardSide(fCtx, img, 960);

      const fTex = new THREE.CanvasTexture(faceCanvas);
      fTex.flipY = false; // CRITICAL: stops card texture from rendering upside down on the GLTF mesh
      setCardFaceTexture(fTex);
    }

    function drawCardSide(fCtx, img, cx) {
      const leftBound = cx - 320;

      // Gold Top Banner
      const grad = fCtx.createLinearGradient(leftBound, 0, leftBound, 240);
      grad.addColorStop(0, "#8b5e3c");
      grad.addColorStop(1, "#09090b");
      fCtx.fillStyle = grad;
      fCtx.fillRect(leftBound, 0, 640, 240);

      // Top Header Text
      fCtx.fillStyle = "#ffffff";
      fCtx.font = "bold 32px sans-serif";
      fCtx.textAlign = "center";
      fCtx.fillText("NYLEX DIGITAL STUDIO", cx, 120);

      // Visitor Tag
      fCtx.fillStyle = "rgba(255, 255, 255, 0.55)";
      fCtx.font = "bold 18px sans-serif";
      fCtx.fillText("VISITOR PASS", cx, 190);

      // Draw Logo Image (or monogram fallback)
      if (img) {
        // Gold Metallic outer circle
        fCtx.strokeStyle = "rgba(139, 94, 60, 0.4)";
        fCtx.lineWidth = 5;
        fCtx.beginPath();
        fCtx.arc(cx, 540, 100, 0, Math.PI * 2);
        fCtx.stroke();

        // Draw N logo image inside the circle
        const imgSize = 130;
        const logoX = cx - imgSize / 2;
        const logoY = 540 - imgSize / 2;
        fCtx.drawImage(img, logoX, logoY, imgSize, imgSize);
      } else {
        // Monogram fallback
        fCtx.strokeStyle = "rgba(139, 94, 60, 0.4)";
        fCtx.lineWidth = 5;
        fCtx.beginPath();
        fCtx.arc(cx, 540, 110, 0, Math.PI * 2);
        fCtx.stroke();

        fCtx.fillStyle = "#ffffff";
        fCtx.font = "black 100px Impact, sans-serif";
        fCtx.fillText("NY", cx, 610);
      }

      // Draw "NYLEX" name bold
      fCtx.fillStyle = "#ffffff";
      fCtx.font = "bold 40px sans-serif";
      fCtx.textAlign = "center";
      fCtx.fillText("NYLEX", cx, 800);

      // Creative partner details
      fCtx.fillStyle = "#ffffff";
      fCtx.font = "bold 24px sans-serif";
      fCtx.textAlign = "center";
      fCtx.fillText("CREATIVE PARTNER", cx, 960);

      fCtx.fillStyle = "rgba(255, 255, 255, 0.45)";
      fCtx.font = "18px monospace";
      fCtx.textAlign = "center";
      fCtx.fillText("ID: #NY-2026", cx, 1040);

      // Barcode lines
      fCtx.fillStyle = "#ffffff";
      const barcode = [14, 6, 20, 8, 24, 6, 16, 22, 6, 14, 18, 6, 26, 14];
      let startX = cx - 131; // center it horizontally
      barcode.forEach((w) => {
        fCtx.fillRect(startX, 1180, w, 50);
        startX += w + 4;
      });
    }
  }, []);

  const { width, height } = useThree((state) => state.size);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const [dragged, drag] = useState(null);
  const [hovered, hover] = useState(false);

  const canDrag = true;

  // Memoize joint coordinates to ensure consistent references between renders
  const ropeJointArgs1 = useMemo(() => [[0, 0, 0], [0, 0, 0], 1], []);
  const ropeJointArgs2 = useMemo(() => [[0, 0, 0], [0, 0, 0], 1], []);
  const ropeJointArgs3 = useMemo(() => [[0, 0, 0], [0, 0, 0], 1], []);
  const sphericalJointArgs = useMemo(() => [[0, 0, 0], [0, 1.45, 0]], []);

  useRopeJoint(fixed, j1, ropeJointArgs1);
  useRopeJoint(j1, j2, ropeJointArgs2);
  useRopeJoint(j2, j3, ropeJointArgs3);
  useSphericalJoint(j3, card, sphericalJointArgs);

  useEffect(() => {
    if (hovered && canDrag) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged !== null && card.current && canDrag) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());

      const newX = vec.x - dragged.x;
      let newY = vec.y - dragged.y;
      const newZ = 0;

      if (isMobile) {
        vec.multiplyScalar(0.92);
      }

      const limit = isMobile ? -0.05 : -0.2;
      if (state.pointer.y < limit) {
        newY = card.current.translation().y;
      }

      card.current.setNextKinematicTranslation({
        x: newX,
        y: newY,
        z: newZ,
      });
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        }

        const d = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );

        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + d * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      if (band.current?.geometry) {
        band.current.geometry.setPoints(curve.getPoints(32));
      }

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());

      card.current.setAngvel({
        x: ang.x,
        y: ang.y - rot.y * 0.25,
        z: ang.z,
      });
    }
  });

  curve.curveType = "chordal";

  // Coordinates specified in world coordinates to prevent React Three Rapier parent double-offset bug
  const baseX = isMobile ? -0.5 : -1.0;
  const baseY = isMobile ? 3.5 : 4.0;

  return (
    <>
      <group position={[0, 0, 0]}>
        <RigidBody ref={fixed} position={[baseX, baseY, 0]} {...segmentProps} type="fixed" />

        <RigidBody position={[baseX + 0.5, baseY, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[baseX + 1.0, baseY, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[baseX + 1.5, baseY, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[baseX + 2.0, baseY, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          <group
            scale={isMobile ? 1.7 : 2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => canDrag && hover(true)}
            onPointerOut={() => canDrag && hover(false)}
            onPointerUp={(e) => {
              if (!canDrag) return;
              e.stopPropagation();
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              if (!canDrag) return;
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            {nodes?.card?.geometry && (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  {...materials.base}
                  map={cardFaceTexture || materials.base?.map}
                  roughness={0.35}
                  metalness={0.1}
                  clearcoat={1}
                  clearcoatRoughness={0.15}
                />
              </mesh>
            )}

            {nodes?.clip?.geometry && (
              <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            )}

            {nodes?.clamp?.geometry && (
              <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
            )}
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          transparent
          opacity={0.9}
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={strapTexture}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
