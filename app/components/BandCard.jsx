"use client";

import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
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
    setStrapTexture(sTex);

    // 2. Generate Card Face Texture
    const faceCanvas = document.createElement("canvas");
    faceCanvas.width = 512;
    faceCanvas.height = 512;
    const fCtx = faceCanvas.getContext("2d");

    // Dark base
    fCtx.fillStyle = "#09090b";
    fCtx.fillRect(0, 0, 512, 512);

    // Carbon-like lines
    fCtx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    fCtx.lineWidth = 1.5;
    for (let i = 0; i < 512; i += 20) {
      fCtx.beginPath();
      fCtx.moveTo(i, 0);
      fCtx.lineTo(i, 512);
      fCtx.stroke();
      fCtx.beginPath();
      fCtx.moveTo(0, i);
      fCtx.lineTo(512, i);
      fCtx.stroke();
    }

    // Gold Top Banner
    const grad = fCtx.createLinearGradient(0, 0, 0, 90);
    grad.addColorStop(0, "#8b5e3c");
    grad.addColorStop(1, "#09090b");
    fCtx.fillStyle = grad;
    fCtx.fillRect(0, 0, 512, 90);

    // Top Header Text
    fCtx.fillStyle = "#ffffff";
    fCtx.font = "bold 22px sans-serif";
    fCtx.textAlign = "center";
    fCtx.fillText("NYLEX DIGITAL STUDIO", 256, 50);

    // Visitor Tag
    fCtx.fillStyle = "rgba(255, 255, 255, 0.5)";
    fCtx.font = "bold 14px sans-serif";
    fCtx.fillText("VISITOR PASS", 256, 125);

    // Large NY Logo Ring
    fCtx.strokeStyle = "rgba(139, 94, 60, 0.4)";
    fCtx.lineWidth = 4;
    fCtx.beginPath();
    fCtx.arc(256, 240, 75, 0, Math.PI * 2);
    fCtx.stroke();

    // Large NY Logo text
    fCtx.fillStyle = "#ffffff";
    fCtx.font = "black 90px sans-serif";
    fCtx.fillText("NY", 256, 270);

    // Details text
    fCtx.fillStyle = "#ffffff";
    fCtx.font = "bold 18px sans-serif";
    fCtx.fillText("CREATIVE PARTNER", 256, 365);

    fCtx.fillStyle = "rgba(255, 255, 255, 0.4)";
    fCtx.font = "14px monospace";
    fCtx.fillText("ID: #NY-2026", 256, 400);

    // Barcode lines
    fCtx.fillStyle = "#ffffff";
    const barcode = [12, 6, 18, 8, 22, 6, 14, 20, 6, 12, 16, 6, 24, 12];
    let startX = 140;
    barcode.forEach((w) => {
      fCtx.fillRect(startX, 435, w, 32);
      startX += w + 4;
    });

    const fTex = new THREE.CanvasTexture(faceCanvas);
    setCardFaceTexture(fTex);
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

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

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

  return (
    <>
      <group position={isMobile ? [1.2, 3, 0] : [3, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
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
