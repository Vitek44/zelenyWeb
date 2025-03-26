import { PresentationControls, Stage, OrbitControls } from "@react-three/drei"; // Import pro ovládání a stage
import { Suspense } from "react";
import Tables from "./Table"; // Import z Table.jsx

const Experience = () => {
  return (
    <>
      <Stage environment="city" intensity={1.5} adjustcamera={2}>
        <Tables scale={[2.0, 2.0, 2.0]} rotation={[0, Math.PI / 4, 0]} position={[0, -1, 0]} />
      </Stage>
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} minDistance={5} maxDistance={7.5} />
    </>
  );
};
export default Experience;

{
  /*
  npx gltfjsx@6.5.3 public/models/table.gltf
✅ OrbitControls – pro ovládání kamery
✅ Stage – automatické nasvícení scény
✅ Environment – HDRI pro realističtější vzhled
✅ useGLTF & useTexture – načítání modelů a textur
✅ Html – pro popisky možností konfigurace
✅ Bounds – lepší automatické přizpůsobení kamery
✅ Reflector – pokud chceš lesklé povrchy 
*/
}
