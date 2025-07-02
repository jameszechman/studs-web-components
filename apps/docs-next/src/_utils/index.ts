// Development Assistants
// This file contains utility functions that are used across the application.
export function getSiteURL() {
    return import.meta.env.MODE === 'development' ? 'http://localhost:4321' : window.location.origin;
}