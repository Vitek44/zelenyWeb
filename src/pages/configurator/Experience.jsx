import {
  PresentationControls,
  Stage,
  OrbitControls,
  MeshReflectorMaterial,
} from "@react-three/drei"; // Import pro ovládání a stage
import { Suspense } from "react";
import Table from "./Cvrkec"; // Import z Table.jsx

const Experience = () => {
  return (
    <>
      <PresentationControls
        speed={0.75}
        global={true}
        zoom={1} // Vypnutí zoomu při otáčení
        polar={[0, Math.PI / 4]}
      >
        <Stage
          environment={null} // Můžeš zkusit "apartment" nebo "studio" pro jemnější světlo
          intensity={5} // Přirozenější intenzita
          contactShadow={false}
          adjustCamera={1.2}
        >
          <Suspense fallback={null}>
            <Table
              scale={[2.0, 2.0, 2.0]}
              rotation={[0, Math.PI / 4, 0]}
              position={[0, 0, 0]}
            >
              <meshStandardMaterial roughness={0.8} metalness={0.1} />
            </Table>
          </Suspense>
        </Stage>
      </PresentationControls>
      <OrbitControls
        enableZoom={true}
        minDistance={6}
        maxDistance={9}
        enablePan={false}
        enableRotate={false}
      />
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
