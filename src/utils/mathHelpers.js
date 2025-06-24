import * as THREE from 'three';

/**
 * Convert degrees to radians
 */
export function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 */
export function radToDeg(radians) {
    return radians * (180 / Math.PI);
}

/**
 * Clamp a value between min and max
 */
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 */
export function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

/**
 * Check if a point is inside a bounding box
 */
export function isPointInBounds(point, bounds) {
    return point.x >= bounds.min.x && point.x <= bounds.max.x &&
           point.y >= bounds.min.y && point.y <= bounds.max.y &&
           point.z >= bounds.min.z && point.z <= bounds.max.z;
}

/**
 * Get distance between two 3D points
 */
export function getDistance(point1, point2) {
    return point1.distanceTo(point2);
}

/**
 * Get 2D distance (ignoring Y coordinate)
 */
export function getDistance2D(point1, point2) {
    const dx = point1.x - point2.x;
    const dz = point1.z - point2.z;
    return Math.sqrt(dx * dx + dz * dz);
}

/**
 * Normalize angle to 0-360 degrees
 */
export function normalizeAngle(angle) {
    while (angle < 0) angle += 360;
    while (angle >= 360) angle -= 360;
    return angle;
}

/**
 * Create a bounding box from an object
 */
export function createBoundingBox(object) {
    const box = new THREE.Box3();
    box.setFromObject(object);
    return box;
}

/**
 * Get random number between min and max
 */
export function random(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Get random integer between min and max (inclusive)
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Smooth step function
 */
export function smoothStep(edge0, edge1, x) {
    const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
}

/**
 * Convert world position to screen position
 */
export function worldToScreen(worldPosition, camera, renderer) {
    const vector = worldPosition.clone();
    vector.project(camera);
    
    const x = (vector.x + 1) / 2 * renderer.domElement.width;
    const y = (-vector.y + 1) / 2 * renderer.domElement.height;
    
    return new THREE.Vector2(x, y);
}

/**
 * Convert screen position to world position
 */
export function screenToWorld(screenPosition, camera, renderer) {
    const mouse = new THREE.Vector2();
    mouse.x = (screenPosition.x / renderer.domElement.width) * 2 - 1;
    mouse.y = -(screenPosition.y / renderer.domElement.height) * 2 + 1;
    
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    
    return raycaster.ray.direction;
}
import * as THREE from 'three';

/**
 * Mathematical helper functions for the museum
 */

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

export function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

export function radToDeg(radians) {
    return radians * (180 / Math.PI);
}

export function distance2D(pos1, pos2) {
    const dx = pos1.x - pos2.x;
    const dz = pos1.z - pos2.z;
    return Math.sqrt(dx * dx + dz * dz);
}

export function distance3D(pos1, pos2) {
    return pos1.distanceTo(pos2);
}

export function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

export function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function normalizeAngle(angle) {
    while (angle > Math.PI) angle -= 2 * Math.PI;
    while (angle < -Math.PI) angle += 2 * Math.PI;
    return angle;
}

export default {
    clamp,
    lerp,
    degToRad,
    radToDeg,
    distance2D,
    distance3D,
    randomBetween,
    easeInOutQuad,
    normalizeAngle
};