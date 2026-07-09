'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef, type RefObject } from 'react';
import * as THREE from 'three';

interface CameraRigProps {
  /** 0→1, cập nhật từ ScrollTrigger bên ngoài (không setState mỗi frame) */
  scrollProgress: RefObject<number>;
  /** tắt phản ứng theo chuột (mobile) */
  mouseEnabled?: boolean;
}

const BASE_POS = new THREE.Vector3(0, 3.2, 14);
const LOOK_AT = new THREE.Vector3(0, 2.5, 0);

/** Camera lerp nhẹ theo chuột + bay lên khi scroll ra khỏi hero. */
export default function CameraRig({ scrollProgress, mouseEnabled = true }: CameraRigProps) {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    const p = scrollProgress.current ?? 0;
    const mx = mouseEnabled ? pointer.x * 0.6 : 0;
    const my = mouseEnabled ? pointer.y * 0.3 : 0;

    target.current.set(
      BASE_POS.x + mx,
      BASE_POS.y + my + p * 5, // bay lên khi scroll
      BASE_POS.z - p * 3 // tiến nhẹ vào khung cảnh
    );
    camera.position.lerp(target.current, 0.05);
    camera.lookAt(LOOK_AT);
  });

  return null;
}
