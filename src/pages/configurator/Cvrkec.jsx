import React from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import { useCustomization } from "./context/Customization";

// Table komponenta pro zobrazení modelu

const Table = (props) => {
  const { nodes, materials } = useGLTF("/models/cvrkec.gltf"); // Cesta k modelu
  const { shape, edge, legs, material, legColor, delka, sirka, vyska, tloustka } = useCustomization();

  const wood1TextureProps = useTexture({
    map: "../../textures/Wood/Wood_011_Base_Color.jpg",
    normalMap: "../../textures/Wood/Wood_011_Normal.jpg",
  });

  const wood2TextureProps = useTexture({
    map: "../../textures/Wood/Wood_013_COLOR.jpg",
    normalMap: "../../textures/Wood/Wood_013_NORM.jpg",
  });
  const wood3TextureProps = useTexture({
    map: "../../textures/Wood/jasan.webp",
    normalMap: "../../textures/Wood/Wood_013_NORM.jpg",
  });
  const wood4TextureProps = useTexture({
    map: "../../textures/Wood/am_orech.jpg",
    normalMap: "../../textures/Wood/Wood_011_Normal.jpg",
  });
  const wood5TextureProps = useTexture({
    map: "../../textures/Wood/kastan.webp",
    normalMap: "../../textures/Wood/Wood_011_Normal.jpg",
  });
  const wood6TextureProps = useTexture({
    map: "../../textures/Wood/oliva.jpg",
    normalMap: "../../textures/Wood/Wood_011_Normal.jpg",
  });
  const wood7TextureProps = useTexture({
    map: "../../textures/Wood/orech.jpg",
    normalMap: "../../textures/Wood/Wood_013_NORM.jpg",
  });
  const leg2TextureProps = useTexture({
    map: "../../textures/Wood/black.png",
    normalMap: "../../textures/Wood/Wood_011_Normal.jpg",
  });

  const leg3TextureProps = useTexture({
    map: "../../textures/Wood/white.png",
    normalMap: "../../textures/Wood/Wood_013_NORM.jpg",
  });

  const leg4TextureProps = useTexture({
    map: "../../textures/Wood/ocel.png",
    normalMap: "../../textures/Wood/Wood_011_Normal.jpg",
  });
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Ctverec.geometry} position={[0, 0, 0]} scale={[delka / 100, tloustka / 1000, sirka / 100]} visible={shape === 1}>
        <meshStandardMaterial {...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps)} />
      </mesh>
      <mesh geometry={nodes.Kruh.geometry} position={[0, 0, 0]} scale={[sirka / 100, tloustka / 1000, sirka / 100]} visible={shape === 2}>
        <meshStandardMaterial {...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps)} />
      </mesh>
      <mesh geometry={nodes.Natural.geometry} position={[0, 0, 0]} scale={[delka / 90, tloustka / 1000, sirka / 90]} visible={shape === 3}>
        <meshStandardMaterial {...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps)} />
      </mesh>
      <mesh geometry={nodes.hexagon.geometry} scale={[sirka / 100, tloustka / 20, sirka / 100]} visible={shape === 4} rotation={[0, 11, 0]}>
        <meshStandardMaterial {...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps)} />
      </mesh>
      <mesh geometry={nodes["1Noha14"].geometry} position={[delka / 200 + delka / 200 - 0.1, -vyska / 100, -(sirka / 200 + sirka / 200 - 0.1)]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 1 || shape === 3) && legs === 1}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["1Noha44"].geometry} position={[delka / 200 + delka / 200 - 0.1, -vyska / 100, sirka / 200 + sirka / 200 - 0.1]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 1 || shape === 3) && legs === 1}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["1Noha34"].geometry} position={[-(delka / 200 + delka / 200) + 0.1, -vyska / 100, -(sirka / 200 + sirka / 200 - 0.1)]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 1 || shape === 3) && legs === 1}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["1Noha24"].geometry} position={[-(delka / 200 + delka / 200) + 0.1, -vyska / 100, sirka / 200 + sirka / 200 - 0.1]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 1 || shape === 3) && legs === 1}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["6Noha"].geometry} position={[delka / 200 + delka / 200 - 0.1, -vyska / 100, -(sirka / 200 + sirka / 200 - 0.1)]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 1 || shape === 3) && legs === 5}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["6Noha"].geometry} position={[delka / 200 + delka / 200 - 0.1, -vyska / 100, sirka / 200 + sirka / 200 - 0.1]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 1 || shape === 3) && legs === 5}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["6Noha"].geometry} position={[-(delka / 200 + delka / 200) + 0.1, -vyska / 100, -(sirka / 200 + sirka / 200 - 0.1)]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 1 || shape === 3) && legs === 5}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["6Noha"].geometry} position={[-(delka / 200 + delka / 200) + 0.1, -vyska / 100, sirka / 200 + sirka / 200 - 0.1]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 1 || shape === 3) && legs === 5}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["2Noha14"].geometry} position={[sirka / 200 + sirka / 200 - sirka / 200, -vyska / 100, -(sirka / 200 + sirka / 200 - sirka / 200)]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 2 || shape === 4) && legs === 1}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["2Noha24"].geometry} position={[sirka / 200 + sirka / 200 - sirka / 200, -vyska / 100, sirka / 200 + sirka / 200 - sirka / 200]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 2 || shape === 4) && legs === 1}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["2Noha34"].geometry} position={[-(sirka / 200 + sirka / 200) + sirka / 200, -vyska / 100, sirka / 200 + sirka / 200 - sirka / 200]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 2 || shape === 4) && legs === 1}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["2Noha44"].geometry} position={[-(sirka / 200 + sirka / 200) + sirka / 200, -vyska / 100, -(sirka / 200 + sirka / 200 - sirka / 200)]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 2 || shape === 4) && legs === 1}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["6Noha"].geometry} position={[sirka / 200 + sirka / 200 - sirka / 200, -vyska / 100, -(sirka / 200 + sirka / 200 - sirka / 200)]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 2 || shape === 4) && legs === 5}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["6Noha"].geometry} position={[sirka / 200 + sirka / 200 - sirka / 200, -vyska / 100, sirka / 200 + sirka / 200 - sirka / 200]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 2 || shape === 4) && legs === 5}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["6Noha"].geometry} position={[-(sirka / 200 + sirka / 200) + sirka / 200, -vyska / 100, sirka / 200 + sirka / 200 - sirka / 200]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 2 || shape === 4) && legs === 5}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["6Noha"].geometry} position={[-(sirka / 200 + sirka / 200) + sirka / 200, -vyska / 100, -(sirka / 200 + sirka / 200 - sirka / 200)]} scale={[0.05, vyska / 100, 0.05]} visible={(shape === 2 || shape === 4) && legs === 5}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["4Noha1"].geometry} material={nodes["4Noha1"].material} position={[0, -vyska / 100, sirka / 170 + sirka / 150 - sirka / 235]} rotation={[0, Math.PI / 2, 0]} scale={[0.065, -vyska / 101, -delka / 140]} visible={(shape === 1 || shape === 3) && legs === 4}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["4Noha1"].geometry} material={nodes["4Noha1"].material} position={[0, -vyska / 100, -(sirka / 170 + sirka / 150) + sirka / 235]} rotation={[0, Math.PI / 2, 0]} scale={[0.065, -vyska / 101, -delka / 140]} visible={(shape === 1 || shape === 3) && legs === 4}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      {/*}KULATY{*/}
      <mesh geometry={nodes["4Noha1"].geometry} material={nodes["4Noha1"].material} position={[0, -vyska / 100, sirka / 175 + sirka / 158 - sirka / 200]} rotation={[0, Math.PI / 2, 0]} scale={[0.065, -vyska / 101, -sirka / 250]} visible={(shape === 2 || shape === 4) && legs === 4}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["4Noha1"].geometry} material={nodes["4Noha1"].material} position={[0, -vyska / 100, -(sirka / 175 + sirka / 158) + sirka / 200]} rotation={[0, Math.PI / 2, 0]} scale={[0.065, -vyska / 101, -sirka / 250]} visible={(shape === 2 || shape === 4) && legs === 4}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      {/*}KULATY{*/}
      {/*}HRANATY{*/}
      <mesh geometry={nodes["5oha1001"].geometry} material={nodes["5oha1001"].material} position={[0, -vyska / 100, sirka / 190 + sirka / 150 - sirka / 205]} rotation={[Math.PI, -Math.PI / 2, 0]} scale={[0.065, -vyska / 101, -sirka / 220]} visible={(shape === 2 || shape === 4) && legs === 3}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["5oha1001"].geometry} material={nodes["5oha1001"].material} position={[0, -vyska / 100, -(sirka / 190 + sirka / 150) + sirka / 205]} rotation={[Math.PI, -Math.PI / 2, 0]} scale={[0.065, -vyska / 101, -sirka / 220]} visible={(shape === 2 || shape === 4) && legs === 3}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      {/*}HRANATY{*/}
      <mesh geometry={nodes["5oha1001"].geometry} material={nodes["5oha1001"].material} position={[0, -vyska / 100, sirka / 170 + sirka / 150 - sirka / 235]} rotation={[Math.PI, -Math.PI / 2, 0]} scale={[0.065, -vyska / 101, -delka / 140]} visible={(shape === 1 || shape === 3) && legs === 3}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["5oha1001"].geometry} material={nodes["5oha1001"].material} position={[0, -vyska / 100, -(sirka / 170 + sirka / 150) + sirka / 235]} rotation={[Math.PI, -Math.PI / 2, 0]} scale={[0.065, -vyska / 101, -delka / 140]} visible={(shape === 1 || shape === 3) && legs === 3}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      {/*}HRANATY{*/}
      <mesh geometry={nodes["3Noha1"].geometry} position={[0, -vyska / 100, sirka / 170 + sirka / 150 - sirka / 235]} material={nodes["3Noha1"].material} scale={[delka / 105, vyska / 101, 0.06]} visible={(shape === 1 || shape === 3) && legs === 2}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["3Noha1"].geometry} position={[0, -vyska / 100, -(sirka / 170 + sirka / 150) + sirka / 235]} material={nodes["3Noha1"].material} scale={[delka / 105, vyska / 101, 0.06]} visible={(shape === 1 || shape === 3) && legs === 2}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      {/*}HRANATY{*/}
      {/*}KULATY{*/}
      <mesh geometry={nodes["3Noha1"].geometry} position={[0, -vyska / 100, sirka / 200 + sirka / 160 - sirka / 200]} material={nodes["3Noha1"].material} scale={[sirka / 180, vyska / 101, 0.06]} visible={(shape === 2 || shape === 4) && legs === 2}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["3Noha1"].geometry} position={[0, -vyska / 100, -(sirka / 200 + sirka / 160) + sirka / 200]} material={nodes["3Noha1"].material} scale={[sirka / 180, vyska / 101, 0.06]} visible={(shape === 2 || shape === 4) && legs === 2}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      {/*}HRANATY{*/}
      <mesh geometry={nodes["10Noha"].geometry} position={[0, -vyska / 124, -(sirka / 170 + sirka / 150) + sirka / 235]} material={nodes["3Noha1"].material} scale={[delka / 105, vyska / 101, 0.06]} visible={(shape === 1 || shape === 3) && legs === 6}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>

      <mesh geometry={nodes["10Noha"].geometry} position={[0, -vyska / 124, sirka / 170 + sirka / 150 - sirka / 235]} material={nodes["3Noha1"].material} scale={[delka / 105, vyska / 101, 0.06]} visible={(shape === 1 || shape === 3) && legs === 6}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      {/*}HRANATY{*/}
      {/*}KULATY{*/}
      <mesh geometry={nodes["10Noha"].geometry} position={[0, -vyska / 124, sirka / 200 + sirka / 160 - sirka / 200]} material={nodes["3Noha1"].material} scale={[sirka / 180, vyska / 101, 0.06]} visible={(shape === 2 || shape === 4) && legs === 6}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["10Noha"].geometry} position={[0, -vyska / 124, -(sirka / 200 + sirka / 160) + sirka / 200]} material={nodes["3Noha1"].material} scale={[sirka / 180, vyska / 101, 0.06]} visible={(shape === 2 || shape === 4) && legs === 6}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      {/*}HRANATÝ{*/}
      <mesh geometry={nodes["11Noha"].geometry} position={[delka / 200 + delka / 200 - 0.1, -vyska / 116, -(sirka / 270 + sirka / 200 - 0.1)]} scale={[0.05, vyska / 100, sirka / 600]} visible={(shape === 1 || shape === 3) && legs === 7}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["11Noha"].geometry} position={[delka / 200 + delka / 200 - 0.1, -vyska / 116, sirka / 270 + sirka / 200 - 0.1]} scale={[0.05, vyska / 100, -sirka / 600]} visible={(shape === 1 || shape === 3) && legs === 7}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["11Noha"].geometry} position={[-(delka / 200 + delka / 200) + 0.1, -vyska / 116, -(sirka / 270 + sirka / 200 - 0.1)]} scale={[0.05, vyska / 100, sirka / 600]} visible={(shape === 1 || shape === 3) && legs === 7}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["11Noha"].geometry} position={[-(delka / 200 + delka / 200) + 0.1, -vyska / 116, sirka / 270 + sirka / 200 - 0.1]} scale={[0.05, vyska / 100, -sirka / 600]} visible={(shape === 1 || shape === 3) && legs === 7}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      {/*}HRANATÝ{*/}
      {/*}KULATY{*/}
      <mesh geometry={nodes["11Noha"].geometry} position={[sirka / 200 + sirka / 200 - sirka / 200, -vyska / 116, -(sirka / 200 + sirka / 200 - sirka / 200)]} scale={[0.05, vyska / 100, -sirka / 600]} rotation={[0, Math.PI / 1.5, 0]} visible={(shape === 2 || shape === 4) && legs === 7}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["11Noha"].geometry} position={[sirka / 200 + sirka / 200 - sirka / 200, -vyska / 116, sirka / 200 + sirka / 200 - sirka / 200]} scale={[0.05, vyska / 100, -sirka / 600]} rotation={[0, Math.PI / 4, 0]} visible={(shape === 2 || shape === 4) && legs === 7}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["11Noha"].geometry} position={[-(sirka / 200 + sirka / 200) + sirka / 200, -vyska / 116, sirka / 200 + sirka / 200 - sirka / 200]} scale={[0.05, vyska / 100, sirka / 600]} rotation={[0, Math.PI / 1.5, 0]} visible={(shape === 2 || shape === 4) && legs === 7}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      <mesh geometry={nodes["11Noha"].geometry} position={[-(sirka / 200 + sirka / 200) + sirka / 200, -vyska / 116, -(sirka / 200 + sirka / 200 - sirka / 200)]} scale={[0.05, vyska / 100, sirka / 600]} rotation={[0, Math.PI / 4, 0]} visible={(shape === 2 || shape === 4) && legs === 7}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      {/*}hranatej bráško{*/}
      <mesh geometry={nodes["15Noha1"].geometry} position={[0, (-vyska / 200) * 2, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[(vyska / 146) * 2, delka / 100, sirka / 1200]} visible={(shape === 1 || shape === 3) && legs === 8}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      {/*}hranatej bráško{*/}
      <mesh geometry={nodes["15Noha1"].geometry} position={[0, (-vyska / 200) * 2, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[(vyska / 146) * 2, sirka / 180, sirka / 2000]} visible={(shape === 2 || shape === 4) && legs === 8}>
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      {/*}KULATY{*/}
      {/*}HRANATÝ{*/}
      <mesh geometry={nodes["20Noha"].geometry} position={[0, -vyska / 43.2, 0]} material={nodes["20Noha"].material} scale={[(delka / 1440) * 2, vyska / 1200, (sirka / 440) * 2]} visible={(shape === 1 || shape === 3) && legs === 9}>
        {" "}
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
      {/*}KULATÝ{*/}
      <mesh geometry={nodes["20Noha"].geometry} position={[0, -vyska / 42, 0]} material={nodes["20Noha"].material} scale={[(delka / 1440) * 2, vyska / 1200, (sirka / 440) * 2]} visible={(shape === 2 || shape === 4) && legs === 9}>
        {" "}
        <meshStandardMaterial
          {...(legColor === "leg1"
            ? {
                ...(material === "wood1" ? wood1TextureProps : material === "wood2" ? wood2TextureProps : material === "wood3" ? wood3TextureProps : material === "wood4" ? wood4TextureProps : material === "wood5" ? wood5TextureProps : material === "wood6" ? wood6TextureProps : material === "wood7" ? wood7TextureProps : defaultTextureProps),
              }
            : legColor === "leg2"
            ? leg2TextureProps
            : legColor === "leg3"
            ? leg3TextureProps
            : legColor === "leg4"
            ? leg4TextureProps
            : null)}
        />
      </mesh>
    </group>
  );
};

useGLTF.preload("/models/cvrkec.gltf");
export default Table;
