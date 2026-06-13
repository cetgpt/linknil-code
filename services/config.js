// services/config.js

const CONFIG = Object.freeze({

    // Engine
    ENGINE_NAME: "LinkNil Engine",
    ENGINE_VERSION: "2.0.0-dev",

    // Timing
    DEFAULT_LOOP_DELAY: 6000,
    MAX_TIMEOUT: 15000,
    SAFETY_GAP: 300,

    // Retry
    MAX_RETRY: 2,

    // Polling
    POLL_FAST: 200,
    POLL_NORMAL: 500,
    POLL_SLOW: 800,

    // Logger
    MAX_LOG_ITEMS: 500,

    // Statistics
    SPEED_SAMPLE_SIZE: 20

});